export let __hotReload = true

import {StateDb} from '../../StateDb';
import {defer} from 'lodash'

export class StreamGraph extends StateDb {

  constructor(state, db, div){
    super(state,db);

    this.key = "subject";
    this.big = true;
    

    this.outerWidth = 1200;
    this.outerHeight = window.innerHeight-500;
    this.outerHeightInitial = this.outerHeight;
    this.outerHeightSmall = 100;
    this.margin = {top: 20, right: 20, bottom: 10, left: 20};
    
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
      .y1(d=> this.y(d[1]) )
      // .curve(d3.curveCardinal)
      // .curve(d3.curveStepAfter)

    
    this.div = div;
    this.svg = this.div.append("svg");
    this.g = this.svg.append("g");
    this.gBrush = this.g.append("g").attr("class", "brush");
    this.gXaxis = this.g.append("g").attr("class", "x axis");
    this.gYaxis = this.g.append("g").attr("class", "y axis");
    this.gGraph = this.g.append("g").attr("class", "graph");

    // this.offset = this.div.node().offsetTop;

    this.nest = d3.nest();
    this.data = [];


    this.brush = d3.brushX()
      .on("start brush", this.brushmove.bind(this))
      .on("end", this.brushend.bind(this));

    // window.addEventListener('scroll', (e) => {
    //   const diff = this.outerHeightInitial - window.scrollY;
    //   const height = this.outerHeightInitial + diff;
    //   // console.log(diff, height)
    //   if(diff < 0 && height > 100){
    //     this.outerHeight = height;
    //     this.init().render(true);
    //   }
    //   this.div.classed("dropshadow", diff < this.outerHeightInitial);  

      // console.log(d3.select(".stream").node().getBoundingClientRect())    
    //})

    return this;
  }

  brushmove() {
    if(d3.event.sourceEvent.type == "brush") return;

    let domain0 = d3.event.selection.map(this.x.invert);
    let domain1 = domain0.map(d3.timeYear.round);

    // If empty when rounded, use floor & ceil instead.
    if (domain1[0] >= domain1[1]) {
      domain1[0] = d3.timeYear.floor(domain0[0]);
      domain1[1] = d3.timeYear.ceil(domain0[1]);
    }

    this.gBrush.call(this.brush.move, domain1.map(this.x))
    this.state.push({ brushStart: domain1[0], brushEnd: domain1[1], event: "brushmove" });
  }

  brushend() {
    let s = d3.event.selection ? d3.event.selection.map(d=> this.x.invert(d)) : this.db.extent;
    this.state.push({ brushStart: s[0], brushEnd: s[1], event: "brushend" });
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
    // console.log(this.data);

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
    // console.log("stream", last.loaded, next.loaded);
    
    if(next.loaded == !last.loaded){
      this.x.domain(this.db.extent);
      this.load().render();
    }

    if(next.hover !== last.hover){
      this.render();
    }
    if(next.active !== last.active || next.activeItem !== last.activeItem){
      // let data = this.db.date.top(Infinity);
      //console.log("load2")
      this.load().render();
    }

    if(next.scrollY !== last.scrollY){
      // console.log(next.scrollY);
      // this needs to be cleaned up

      const diff = this.outerHeightInitial - this.margin.top - this.margin.bottom - next.scrollY;
      const height = this.outerHeightInitial + diff;
      // console.log(diff, height)
      if(diff < 0 && height > this.outerHeightSmall){
        this.outerHeight = height;
        this.big = false;
        this.init().render(true);
      } else {
        if(diff < 0 && this.outerHeight != this.outerHeightSmall){
          console.log("small");
          this.outerHeight = this.outerHeightSmall;
          this.init().render(true);
        }
        if(diff > 0 && this.outerHeight != this.outerHeightInitial){
          this.big = true;
          this.outerHeight = this.outerHeightInitial;
          this.init().render(true);
        }
        // console.log(this.outerHeight, diff,  this.outerHeightInitial)
      }
      this.div.classed("dropshadow", diff < this.outerHeightInitial - this.margin.top - this.margin.bottom);  

    }
    // if(next.activeItem !== last.activeItem){
    //   if(!next.activeItem) {
    //     // this.stack.offset("silhouette");
    //     this.load().render();
    //   } else {
    //     this.load().render();
    //     // let k = this.state.state.active.substring(0,this.state.state.active.length-1);
    //     // let data = this.db.data.filter(d => d[k] === next.activeItem);
    //     // this.stack.offset("zero");
    //     // this.load(data).render();
    //   }
    // }
    // if(next.brushStart.getYear() != last.brushStart.getYear()){

    // }
    // console.log(next.brushStart, last.brushStart);
  }

  render(notransition){

    //console.log("render stream")

    let s = this.gGraph.selectAll("path")
      .data(this.data, (d) => { return d.key; })
    
    s.enter()
      .append("path")
      .on("mouseenter", d=>{
        if(d.key == "other" || !this.big) return;
        this.state.push({ hover: d.key });
      })
      .on("mouseleave", d=>{
        if(d.key == "other" || !this.big) return;
        this.state.push({ hover: null });
      })
      .on("click", d=>{
        if(d.key == "other" || !this.big) return;
        let active = this.state.state.activeItem === d.key;
        this.state.push({ activeItem: active ? null : d.key });
      })
      .attr("d", this.area)
      .style("opacity", 0)
      // .transition()
      // .duration(notransition ? 0 : 800)
      .style("opacity", d=> d.key=="other" ? 0.3 : 1)

    s.exit().remove();
        
    s
      .classed("active", d => this.state.state.hover == d.key)
      // .transition()
      // .duration(notransition ? 0 : 800)
      .attr("d", this.area)
      .style("opacity", d=> d.key=="other" ? 0.3 : 1)

    this.gXaxis
      .attr("transform", "translate(0," + this.height + ")")
      .call(this.xAxis)

    this.gXaxis
      .selectAll("text")
      .attr("dy", -this.height/2)

    // this.gXaxis
    //   .selectAll("text")
    //   .attr("transform", function(d) {
    //        return "translate(" + this.getBBox().height*-2 + "," + this.getBBox().height + ")rotate(-45)";
    //    });

    this.gYaxis
      //.transition()
      // .duration(notransition ? 0 : 800)
      //.call(this.yAxis)

  }

}