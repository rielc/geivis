export let __hotReload = true

export class StreamGraph {

  constructor(state, db){
    this.key = "subject";
    this.state = state;
    this.db = db;

    this.state.listen(this.stateChange.bind(this));

    this.outerWidth = 1060;
    this.outerHeight = 300;
    this.outerHeightInitial = this.outerHeight;
    this.margin = {top: 20, right: 30, bottom: 30, left: 40};
    
    this.x = d3.scaleTime();
    this.y = d3.scaleLinear();

    this.xAxis = d3.axisBottom()
      // .orient("bottom")
      // .ticks(d3.time.years, 20)

    this.yAxis = d3.axisLeft()
      .ticks(5, "1f")
    
    this.area = d3.area()
      .x(d=> this.x(d.data.key) )
      .y0(d=> this.y(d[0]) )
      .y1(d=> this.y(d[1]) );

    d3.select(".stream").selectAll("*").remove() // temp fix

    this.svg = d3.select(".stream").append("svg");
    this.g = this.svg.append("g");
    this.gXaxis = this.g.append("g").attr("class", "x axis");
    this.gYaxis = this.g.append("g").attr("class", "y axis");
    this.gBrush = this.g.append("g").attr("class", "brush");
    this.gGraph = this.g.append("g").attr("class", "graph");

    this.nest = d3.nest();
    this.data = [];


    this.brush = d3.brushX()
      .on("start brush", this.brushmove.bind(this))
      .on("end", this.brushend.bind(this));

    window.addEventListener('scroll', (e) => {
      const diff = this.outerHeightInitial - window.scrollY;
      const height = this.outerHeightInitial + diff;
      // console.log(diff, height)
      if(diff < 0 && height > 100){
        this.outerHeight = height;
        this.init().render(true);
      }
      d3.select(".stream").classed("dropshadow", diff < this.outerHeightInitial);      
    })

    return this;
  }

  brushmove() {
    let s = d3.event.selection.map(d=> this.x.invert(d));
    this.state.push({ brushStart: s[0], brushEnd: s[1], keyframe: false });
  }

  brushend() {
    let s = d3.event.selection ? d3.event.selection.map(d=> this.x.invert(d)) : this.db.extent;
    console.log(s)
    this.state.push({ brushStart: s[0], brushEnd: s[1], keyframe: true });
  }

  init(){
    this.width = this.outerWidth - this.margin.left - this.margin.right,
    this.height = this.outerHeight - this.margin.top - this.margin.bottom;

    this.x.rangeRound([0, this.width]);
    this.y.range([this.height, 0]).clamp(true);

    this.xAxis.scale(this.x).tickSize(-this.height);
    this.yAxis.scale(this.y);

    this.svg
      .attr("width", this.outerWidth)
      .attr("height", this.outerHeight)

    this.g
      .attr(
        "transform", 
        "translate(" + this.margin.left + "," + this.margin.top + ")"
      );
    this.brush.extent([[0, 0], [this.width, this.height]])
    this.gBrush.call(this.brush);
    this.gBrush.selectAll("rect").attr("height", this.height);

    // this.gBrush.selectAll(".resize rect")
    //   .style("visibility", "inherit")

    return this;
  }

  load(){
    // console.log(_data[0], this.key);

    this.data = this.db.stackedHistogram()
    console.log(this.data);

    const max = d3.max(this.data, d=>d3.max(d, d=>(d[1]))); // do it better
    this.y.domain([0.1, max]).nice()


    // if(this.data.length > 20){
    //   const cutoff = 100;
    //   let filtered = this.data.filter(d => d.values.length > cutoff);
    //   let other = { key: "other", values: []};

    //   this.data.forEach((d,i)=>{
    //     if(d.values.length <= cutoff){
    //       d.values.forEach(d=> other.values.push(d));
    //     }
    //   })
    //   filtered.push(other);
    //   console.log(filtered, other);

    //   this.data = filtered;
    // }
   

    return this;
  }

  stateChange(next, last){
    // console.log(next);
    if(next.hover !== last.hover){
      this.render();
    }
    if(next.active !== last.active){
      // let data = this.db.date.top(Infinity);
      this.load().render();
    }
    if(next.activeItem !== last.activeItem){
      if(!next.activeItem) {
        // this.stack.offset("silhouette");
        this.load().render();
      } else {
        let k = this.state.state.active.substring(0,this.state.state.active.length-1);
        let data = this.db.data.filter(d => d[k] === next.activeItem);
        this.stack.offset("zero");
        this.load(data).render();
      }
    }
    // console.log(next.brushStart, last.brushStart);
  }

  render(notransition){

    let s = this.gGraph.selectAll("path")
      .data(this.data, (d) => d.key)
    
    s.enter()
      .append("path")
      .on("mouseenter", d=>{
        this.state.push({ hover: d.key });
      })
      .on("mouseleave", d=>{
        this.state.push({ hover: null });
      })
      .on("click", d=>{
        let active = this.state.state.activeItem === d.key;
        this.state.push({ activeItem: active ? null : d.key });
      })
      .attr("d", this.area)
      // .style("opacity", 0)

    s.exit().remove();
        
    s
      // .classed("active", d => this.state.state.hover == d.key)
      // .transition()
      // .duration(notransition ? 0 : 800)
      .attr("d", this.area)
      .style("opacity", 1)

    this.gXaxis
      .attr("transform", "translate(0," + this.height + ")")
      .call(this.xAxis)

    this.gXaxis
      .selectAll("text")
      .attr("dy", "1em")

    // this.gXaxis
    //   .selectAll("text")
    //   .attr("transform", function(d) {
    //        return "translate(" + this.getBBox().height*-2 + "," + this.getBBox().height + ")rotate(-45)";
    //    });

    this.gYaxis
      // .transition()
      // .duration(notransition ? 0 : 800)
      .call(this.yAxis)

  }

}