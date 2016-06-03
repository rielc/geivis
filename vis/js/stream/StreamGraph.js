class StreamGraph {

  constructor(state, db){
    this.key = "subject";
    this.state = state;
    this.db = db;

    this.state.listen(this.stateChange.bind(this));


    this.outerWidth = 1060;
    this.outerHeight = 300;
    this.outerHeightInitial = this.outerHeight;
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
      // .offset("silhouette")
      // .order(data => {
      //   console.log(data, d3.range(data.length))
      //   return d3.range(data.length);
      // })
      //.order("inside-out")
      //.order("reverse");

    this.area = d3.svg.area()
      .x(d=> this.x(d.x) )
      .y0(d=> this.y(d.y0) )
      .y1(d=> this.y(d.y0 + d.y) );

    this.svg = d3.select(".stream").append("svg");
    this.g = this.svg.append("g");
    this.gXaxis = this.g.append("g").attr("class", "x axis");
    this.gYaxis = this.g.append("g").attr("class", "y axis");
    this.gBrush = this.g.append("g").attr("class", "brush");
    this.gGraph = this.g.append("g").attr("class", "graph");

    this.nest = d3.nest();
    this.data = [];

    this.brush = d3.svg.brush()
      .x(this.x)
      .on("brush", this.brushmove.bind(this))
      .on("brushend", this.brushend.bind(this));

    window.addEventListener('scroll', (e) => {
      const diff = this.outerHeightInitial - window.scrollY;
      if(diff > 100){
        this.outerHeight = diff;
        this.init().render(true);
      }
      d3.select(".stream").classed("dropshadow", diff < 100);      

    })

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
    state.push({ brushStart: s[0], brushEnd: s[1], keyframe: false });
    // console.log(s);
  }

  brushend() {
    let s = this.brush.empty() ? this.db.extent : this.brush.extent();
    state.push({ brushStart: s[0], brushEnd: s[1], keyframe: true });
    // console.log(s);
  }

  init(){
    this.width = this.outerWidth - this.margin.left - this.margin.right,
    this.height = this.outerHeight - this.margin.top - this.margin.bottom;

    this.x.range([0, this.width]);
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

    this.gBrush.call(this.brush);
    this.gBrush.selectAll(".resize rect")
      .style("visibility", "inherit")
      // .style("fill", "#EEE")

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

    this.data.sort((a,b) => (b.values.length-a.values.length));

    if(this.data.length > 20){
      const cutoff = 100;
      let filtered = this.data.filter(d => d.values.length > cutoff);
      let other = { key: "other", values: []};

      this.data.forEach((d,i)=>{
        if(d.values.length <= cutoff){
          d.values.forEach(d=> other.values.push(d));
        }
      })
      filtered.push(other);
      console.log(filtered, other);

      this.data = filtered;
    }
   

    this.data.forEach((d,i)=>{
      d.histo = d3.layout.histogram()
        .value(d=> d.date)
        .bins(this.x.ticks(d3.time.year, 1))(d.values);
    })

    this.data.sort((a,b) => (b.values.length-a.values.length));

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
      // let data = this.db.date.top(Infinity);
      this.load(this.db.data).render();
    }
    if(next.activeItem !== last.activeItem){
      if(!next.activeItem) {
        // this.stack.offset("silhouette");
        this.load(this.db.data).render();
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
      .style("opacity", 0)

    s.exit().remove();
        
    s
      .classed("active", d => this.state.state.hover == d.key)
      .transition()
      .duration(notransition ? 0 : 800)
      .attr("d", d => this.area(d.histo))
      .style("opacity", 1)
      // .style("fill", (d, i)=> this.color(i));

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
      .transition()
      .duration(notransition ? 0 : 800)
      .call(this.yAxis)

  }

}