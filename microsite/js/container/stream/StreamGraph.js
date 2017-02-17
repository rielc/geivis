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
    this.margin = {top: 10, right: 13, bottom: 10, left: 13};
    
    this.x = d3.scaleTime();
    this.y = d3.scaleLinear();

    this.xAxis = d3.axisBottom()
      // .orient("bottom")
      // .ticks(d3.timeYear.every(20))

    this.yAxis = d3.axisLeft()
      .ticks(5, "1f")
    
    this.area = d3.area()
      .x(d=> this.x(d.data.key) )
      .y0(d=> this.y(d[0]) )
      .y1(d=> this.y(d[1]) )
      // .curve(d3.curveCardinal)
      //.curve(d3.curveStepAfter)

    
    this.div = div;
    this.svg = this.div.append("svg");
    this.g = this.svg.append("g");
    this.gBrush = this.g.append("g").attr("class", "brush");
    this.gXaxis = this.g.append("g").attr("class", "x axis");
    this.gYaxis = this.g.append("g").attr("class", "y axis");
    this.gGraph = this.g.append("g").attr("class", "graph");

    this.gBrushLegend = this.g.append("g").attr("class", "brushLegend");
    this.gBrushLegend.append("text")
      .attr("class", "from")
      .attr("text-anchor", "middle")
      .attr("x", 0)
      .attr("y", 3)
      .text("")

    this.gBrushLegend.append("text")
      .attr("class", "to")
      .attr("text-anchor", "middle")
      .attr("x", 0)
      .attr("y", 3)
      .text("")

    this.div.append("div")
      .attr("class", "totals")
      .html('<span id="active">-</span> of <span id="total">-</span> books selected')
      .on("click", ()=>{
        this.gBrush.call(this.brush.move, null)
      })

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
    this.gBrush.call(this.brush).on("click", ()=>{
        this.gBrush.call(this.brush.move, null)
      })
    this.gBrush.selectAll("rect").attr("height", this.height);

    this.gBrushLegend.select(".from")
      .attr("transform", "translate("+ this.x(this.state.state.brushStart) +","+this.height/2+")")
    this.gBrushLegend.select(".to")
      .attr("transform", "translate("+ this.x(this.state.state.brushEnd) +","+this.height/2+")")

    // this.gBrush.selectAll(".resize rect")
    //   .style("visibility", "inherit")

    return this;
  }

  brushmove() {
    if(!d3.event.selection){
      this.gBrushLegend.style("opacity", 0);
      this.gXaxis.selectAll("text").style("opacity", 1);
      return;
    }
    if(d3.event.sourceEvent.type == "brush") return;

    let domain0 = d3.event.selection.map(this.x.invert);
    let domain1 = domain0.map(d3.timeYear.round);

    // If empty when rounded, use floor & ceil instead.
    if (domain1[0] >= domain1[1]) {
      domain1[0] = d3.timeYear.floor(domain0[0]);
      domain1[1] = d3.timeYear.ceil(domain0[1]);
    }

    this.gBrushLegend.style("opacity", 1).select(".from")
      .attr("transform", "translate("+ this.x(domain1[0]) +","+this.height/2+")")
      .text(domain1[0].getFullYear())
      .attr("y", d=> domain1[1]-domain1[0]<=186159996000 ? "-5":"3" )
      

    this.gBrushLegend.select(".to")
      .attr("transform", "translate("+ this.x(domain1[1]) +","+this.height/2+")")
      .text(domain1[1].getFullYear())
      .attr("y", d=> domain1[1]-domain1[0]<=186159996000 ? "11":"3" )

    this.gXaxis.selectAll("text").style("opacity", d=> {
      let a = (+d+146159996000 >= +domain1[0] && +d-146159996000 <= +domain1[1]);
      return a ? 0:1;
    })

    this.gBrush.call(this.brush.move, domain1.map(this.x))
    this.state.push({ brushStart: domain1[0], brushEnd: domain1[1], event: "brushmove" });

    this.gGraph.classed("brushing", true);
  }

  brushend() {
    // let s = d3.event.selection ? d3.event.selection.map(d=> this.x.invert(d)) : this.db.extent;
    
    if(!d3.event.selection){
     this.state.push({ brushStart: this.db.extent[0], brushEnd: d3.timeYear.ceil(this.db.extent[1]), event: "brushend" });
    } else {
      let domain0 = d3.event.selection.map(this.x.invert);
      let domain1 = domain0.map(d3.timeYear.round);

      // If empty when rounded, use floor & ceil instead.
      if (domain1[0] >= domain1[1]) {
        domain1[0] = d3.timeYear.floor(domain0[0]);
        domain1[1] = d3.timeYear.ceil(domain0[1]);
      }
      this.state.push({ brushStart: domain1[0], brushEnd: domain1[1], event: "brushend" });
    }
    this.gGraph.classed("brushing", false);
  }

  load(){
    // console.log(_data[0], this.key);

    this.data = this.db.stackedHistogram()
    // console.log(this.data);

    const max = d3.max(this.data, d=>d3.max(d, d=>(d[1]))); // do it better
    this.y.domain([0.1, max]).nice();

    this.x.domain(this.db.extent);
    // add the upper domain which is < 20 years to the axis
    const ticks = this.x.ticks(d3.timeYear.every(20)).concat(this.x.domain()[1]);
    this.xAxis.tickValues(ticks);

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
      this.load().render();
      this.gBrush.call(this.brush.move, null)
    }

    if(next.hover !== last.hover){
      this.render();
    }
    if(next.active !== last.active){
      // let data = this.db.date.top(Infinity);
      this.load().render();
    }
    if(next.activeItem !== last.activeItem){
      console.log("load2")
      this.load().render(true);
    }
    if(next.filters !== last.filters){
      console.log("load2")
      this.load().render(true);
    }

    if(this.big && (next.brushStart !== last.brushStart)){
      //this.load().render();
    }

    if(next.brushStart !== last.brushStart || next.brushEnd !== last.brushEnd){
      //this.load().render();
      d3.select("#total").text(this.db.crossfilter.size());
      d3.select("#active").text(this.db.all.value());
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

  render(transition){

    //console.log("render stream")

    let s = this.gGraph.selectAll("path")
      .data(this.data, (d) => { return d.key; })
    
    s.enter()
      .append("path")
      .on("mouseenter", (d,i,e)=>{
        if(!this.big) return;

        const p = d3.select(e[i]).node().getBoundingClientRect();
        const p2 = d3.select(".container").node().getBoundingClientRect();
        const time = d.reduce((h,c)=>h[1]>c[1]? h:c, {}).data.key;
        const tooltip = { name: d.key, pos: [p.left-p2.left+this.x(time), p.top-p2.top] };

        if(d.key == "other"){
          this.state.push({ tooltip });
        } else {
          this.state.push({ hover: d.key, tooltip });
        }

        
      })
      .on("mouseleave", d=>{
        if(!this.big) return;
        this.state.push({ hover: null, tooltip: null });
      })
      .on("click", d=>{
        if(d.key == "other" || !this.big) return;

        // console.log(this.state.state.active);
        let key = this.state.state.active;
        let active = this.state.state.filters[key] && this.state.state.filters[key] === d.key;
        // this is a good example why actions where invented:
        let filters = {...this.state.state.filters, [key]: active ? null:d.key };
        this.state.push({ event: "click", active: key, filters });

        // let active = this.state.state.activeItem === d.key;
        // this.state.push({ activeItem: active ? null : d.key, event: "brushend" });
      })
      .attr("d", this.area)
      .style("opacity", 0)
      // .transition(transition)
      // .duration(notransition ? 0 : 800)
      .style("opacity", d=> (d.key=="other" && this.big) ? 0.3 : 1)

    s.exit().remove();
    
    // nasty quickhack
    if(transition){
      s
        .classed("active", d => this.big && this.state.state.hover == d.key)
        .transition()
        // .duration(notransition ? 0 : 800)
        .attr("d", this.area)
        .style("opacity", d=> (d.key=="other" && this.big) ? 0.3 : 1)
    } else {
      s
        .classed("active", d => this.big && this.state.state.hover == d.key)
        // .transition()
        // .duration(notransition ? 0 : 800)
        .attr("d", this.area)
       .style("opacity", d=> (d.key=="other" && this.big) ? 0.3 : 1)
    } 
   

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

    if(transition){
      this.gYaxis
        .transition()
        .call(this.yAxis)
    } else {
      this.gYaxis
        .call(this.yAxis)
    }

    this.gYaxis
      // .style("opacity", 1-(this.outerHeightInitial-this.outerHeight-100)/100)
      .style("opacity", 0)
    //   // .attr("transform", "translate(-10,0)")
    //   .selectAll("text")
    //   .attr("transform", "rotate(-90)")
    //   .attr("x", "0")
    //   .attr("dy", "-10")
    //   .attr("text-anchor", "middle")

    //   .attr("dx", 30)

  }

}