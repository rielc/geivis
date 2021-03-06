export class StreamGraph {

  constructor(state, db){
    this.key = "subject";
    this.state = state;
    this.db = db;

    this.state.listen(this.stateChange.bind(this));


    this.outerWidth = window.innerWidth;
    this.outerHeight = 120;
    this.margin = {top: 20, right: 30, bottom: 30, left: 40};
    
    this.x = d3.time.scale();
    this.y = d3.scale.linear();
    this.color = d3.scale.linear()
      .range(["#0AA4E4","#BEE6F9"])
      .range(["#BEE6F9","#BEE6F9"])
      // .range(["#036D99","#E0F5FF"])
      .interpolate(d3.interpolateHcl);

    this.xAxis = d3.svg.axis()
      .orient("bottom")
      .ticks(d3.time.years, 20)

    this.yAxis = d3.svg.axis()
      .ticks(5, "1f")
      .orient("left");
        
    this.stack = d3.layout.stack()
      .offset("zero")
      .y(d => d.length)
      .values(d => d.histo)
      // .offset("expand")
      .offset("silhouette")
      //.order("inside-out")
      //.order("reverse");

    this.area = d3.svg.area()
      .x(d=> this.x(d.x) )
      .y0(d=> this.y(d.y0) )
      .y1(d=> this.y(d.y0 + d.y) );

    this.svg = d3.select(".stream").append("svg");
    this.g = this.svg.append("g");
    this.gXaxis = this.g.append("g").attr("class", "x axis");
    this.gYaxis = this.g.append("g").attr("class", "y axis")
    this.gGraph = this.g.append("g").attr("class", "graph");
    this.gBrush = this.g.append("g").attr("class", "brush");

    this.nest = d3.nest();
    this.data = [];

    this.brush = d3.svg.brush()
      .x(this.x)
      .on("brush", this.brushmove.bind(this));

    // this.width = function(_) {
    //   if (!arguments.length) return width;
    //   width = _;
    //   return this;
    // };

    // this.height = function(_) {
    //   if (!arguments.length) return height;
    //   height = _;
    //   return this;
    // };

    return this;
  }

  brushmove() {
    let s = this.brush.empty() ? this.db.extent : this.brush.extent();

    this.state.push({ brushStart: s[0], brushEnd: s[1] });
    // console.log(s);
  }

  init(){
    this.width = this.outerWidth - this.margin.left - this.margin.right,
    this.height = this.outerHeight - this.margin.top - this.margin.bottom;

    this.x.range([0, this.width]);
    this.y.range([this.height, 0]).clamp(true);

    this.xAxis.scale(this.x);
    this.yAxis.scale(this.y);

    this.svg
      .attr("width", this.outerWidth)
      .attr("height", this.outerHeight)

    this.g
      .attr(
        "transform", 
        "translate(" + this.margin.left + "," + this.margin.top + ")"
      );

    this.gBrush.call(this.brush);

    // this.gBrush.selectAll(".resize").append("path")
    //     .attr("transform", "translate(0," +  this.height / 2 + ")")
    //     .attr("d", arc);

    this.gBrush.selectAll("rect")
        .attr("height", this.height);

    return this;
  }

  load(_data){
    // console.log(_data[0], this.key);

    let k = this.state.state.active.substring(0,this.state.state.active.length-1);
    this.data = d3.nest()
      .key(d => d[k] || null)
      .entries(_data);

    this.data.forEach((d,i)=>{
      d.histo = d3.layout.histogram()
        .value(d=> d.date)
        .bins(this.x.ticks(d3.time.year, 1))(d.values);
    })

    this.stack(this.data);

    const max = d3.max(this.data, d=>d3.max(d.histo, d=>(d.y + d.y0)));
      
    this.y.domain([0.1, max]).nice()
    this.color.domain([0, this.data.length])

    return this;
  }

  stateChange(next, last){
    // console.log(next);
    if(next.hover !== last.hover){
      this.render();
    }
    if(next.active !== last.active){
      this.load(this.db.data).render();
    }
    // console.log(next.brushStart, last.brushStart);
  }

  render(){
    let s = this.gGraph.selectAll("path")
      .data(this.data)
    
    s.enter().append("path");
    s.exit().remove();
        
    s
      .attr("d", d => this.area(d.histo))
      .classed("active", d => this.state.state.hover == d.key)
      // .style("fill", (d, i)=> this.color(i));

    this.gXaxis
      .attr("transform", "translate(0," + this.height + ")")
      .call(this.xAxis)
      .selectAll("text")
      .attr("transform", function(d) {
           return "translate(" + this.getBBox().height*-2 + "," + this.getBBox().height + ")rotate(-45)";
       });

    this.gYaxis
      .call(this.yAxis)

  }

}

export class StateMachine {

  constructor(){
    this.state = {
      brushStart:null,
      brushEnd:null,
      active:"subjects"
    }
    this.history = [];
    this.history.push(Object.assign({}, this.state));
    this.size = 10;
    this.listener = [];
  }

  push(state){
    if(this.history.length >= this.size){
      this.history.pop();
    }
    this.lastState = this.history[0];
    const newState = Object.assign(this.state, state);
    this.history.unshift(newState);
    this.state = Object.assign({}, newState);
    this.broadcast();
  }

  listen(func){
    this.listener.push(func);
  }

  broadcast(){
    this.listener.forEach(func => func(this.state, this.lastState));
  }
}

export class Test {

  constructor(state, db){
    this.container = d3.select(".entities").append("div").classed("entity", true);
    this.container.append("div").classed("title", true).text(this.key);
    this.items = this.container.append("div").classed("items", true);
    this.data = [];
    this.key = "subjects";
    this.state = state;
    this.db = db;

    this.state.listen(this.stateChange.bind(this));

    this.container.on("click", ()=> {
      this.state.push({ active: this.key });
    })

    return this;
  }

  Key(_){
    if (!arguments.length) return this.key;
    this.key = _;
    return this;
  }

  stateChange(next, last){
    // if(next.brushStart !== last.brushStart){
    //   this.render();
    // }
    this.render();
    // console.log(next.brushStart, last.brushStart);
  }

  render(){
    //console.log( this.state.state);
    this.container.select(".title").text(this.key);
    this.container.classed("active", this.state.state.active === this.key);
    // this.container.classed("hover", this.state.state.hover === this.key);
    // console.time("filter");
   // console.log(this.key);
    const group = this.db[this.key].top(10);
    // console.timeEnd("filter");

    let s = this.items.selectAll(".item").data(group, d=>d.key);
    s.enter()
      .append("div")
      .classed("item", true)
      .on("mouseenter", (d)=>{
        this.state.push({ hover: d.key });
      })
      .on("mouseleave", ()=>{
        this.state.push({ hover: null });
      })

    s
      .text(d => `${ d.key } ${ d.value }` )
      .classed("hover", d=> this.state.state.hover === d.key)

    s.exit().remove();
    // this.container.text(data.length);
    
    return this;
  }

}

export class DataBase {

  constructor(_state){
    this.data = [];
    this.formater = d3.time.format("%Y");
    this.extent = [0,0];
    this.crossfilter = {};
    this.state = _state;
    this.state.listen(this.stateChange.bind(this));

  }

  load(_data){
    this.data = _data.filter(d=>d.year && d.year <= 1920 && d.year >= 1720);

    this.data.forEach(d => {
      d.date = this.formater.parse(d.year);
      d.year = parseInt(d.year);
      d.publisher = d.publisher;
    })
    this.extent = d3.extent(this.data, d => d.date);

    this.crossfilter = crossfilter(this.data);
    this.all = this.crossfilter.groupAll();

    this.year = this.crossfilter.dimension(d => d.year);
    this.years = this.year.group();
    this.date = this.crossfilter.dimension(d => d.date);
    this.dates = this.date.group(d3.time.year);

    this.subject = this.crossfilter.dimension(d => d.subject || null);
    this.subjects = this.subject.group();
    
    this.schoollevel = this.crossfilter.dimension(d => d.schoollevel || null);
    this.schoollevels = this.schoollevel.group();

    this.lang = this.crossfilter.dimension(d => d.lang || null);
    this.langs = this.lang.group();
    
    this.publisher = this.crossfilter.dimension(d => d.publisher || null);
    this.publishers = this.publisher.group();

    return this;
  }

  stateChange(next, curr){
    if(next.brushStart !== curr.brushStart){
      if(next.brushStart*1 === next.brushEnd*1){
        this.date.filterAll();
      } else {
        this.date.filterRange([next.brushStart, next.brushEnd]);
      }

      d3.select("#total").text(this.crossfilter.size());
      d3.select("#active").text(this.all.value());
    }

    // console.time("simple");
    // const startYear = this.state.brushStart.getFullYear();
    // const endYear = this.state.brushEnd.getFullYear();
    // const data = this.data.filter(d => d.year >= startYear && d.year <= endYear );
    // const nest = d3.nest().key(d => d.classification[this.key]).entries(data);
    // //console.log(nest);
    // console.timeEnd("simple");

    // console.time("crossfilter");
    // db.date.filterRange([this.state.brushStart, this.state.brushEnd]);
    // // console.log(group);
    // console.timeEnd("crossfilter");
  }
}

export class VisTypesList {

  constructor(){
    this.types = ["subject", "schoollevel", "keyword", "schooltype"];
    this.container = d3.select(".typeList");

    return this;
  }

  render(){
    let s = this.container.selectAll(".item").data(this.types);
    s.enter()
      .append("div")
      .classed("item", true)
      .on("click", this.clickHandler)

    s.text(d=> d);

    return this;
  }

  clickHandler(d){
    console.log(d);

    stream.key = d;
    stream.load(db.data).render();
  }

}

export class VisDebugList {

  constructor(){
    this.types = ["silhouette", "wiggle", "expand", "zero"];
    this.container = d3.select(".debug");

    return this;
  }

  render(){
    let s = this.container.selectAll(".item").data(this.types);
    s.enter()
      .append("div")
      .classed("item", true)
      .on("click", this.clickHandler)

    s.text(d=> d);

    return this;
  }

  clickHandler(d){
    console.log(d);

    stream.stack.offset(d);
    stream.load(db.data).render();
  }

}