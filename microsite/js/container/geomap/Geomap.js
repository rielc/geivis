export let __hotReload = true

import {StateDb} from '../../StateDb';

export class Geomap extends StateDb {

  constructor(state, db, div){
    super(state,db);
   
    this.outerWidth = 1060;
    this.outerHeight = 800;
    this.margin = {top: 20, right: 20, bottom: 20, left: 20};

    this.projection = d3v3.geo.mercator()
      .center([15, 49])
      .scale(3500)
      .translate([outerWidth / 2, outerHeight / 2])
      
    this.path = d3v3.geo.path().projection(this.projection);
    
    div.selectAll("*").remove() // temp fix

    this.svg = d3v3.select(div.node()).append("svg");
    this.g = this.svg.append("g");

    this.scale = d3v3.scale.linear().range([1,20]);
   
    return this;
  }

  init(){
    this.width = this.outerWidth - this.margin.left - this.margin.right,
    this.height = this.outerHeight - this.margin.top - this.margin.bottom;

    this.svg
      .attr("width", this.outerWidth)
      .attr("height", this.outerHeight)

    this.g
      .attr(
        "transform", 
        "translate(" + this.margin.left + "," + this.margin.top + ")"
      );

    return this;
  }


  stateChange(next, last){
    if(!next.visible.GeomapSection) return;
    // console.log(next)
    
    if(next.brushStart !== last.brushStart
      || next.brushEnd !== last.brushEnd
      || next.active !== last.active
      || next.activeItem !== last.activeItem
      || next.hover !== last.hover
      || next.loaded !== last.loaded
      || next.visible.GeomapSection !== last.visible.GeomapSection
    ){
      this.render();
    }
  }

  render(){
    // console.log("RENDER");

    let places = this.db["places"].top(100);
    let max = d3v3.max(places, d=>d.value);

    this.scale.domain([0.1, max]).clamp(true);

    // console.log(d3v3.max(places, d=>d.value))

    places
    .forEach(d => {
      const geo = this.db.geocode.find(g => g.name === d.key);
      d.lat = geo ? geo.lat : 0;
      d.lon = geo ? geo.lon : 0;
    })

    let s = this.g.selectAll("g").data(places, d => d.key);

    let e = s.enter()
      .append("g")
      
      e.append("circle")
      e.append("text")
        .attr("dx", d=>(this.scale(d.value)+2)+"px")
        .attr("dy", d=>(this.scale(d.value)+2)+"px")
        .text(d => d.key)

    s
      .attr("transform", d=> {
        const p = this.projection([d.lon,d.lat]);
        return `translate(${p[0]},${p[1]})`;
      })
    
    s.select("text")
      .attr("dx", d=>(this.scale(d.value)+2)+"px")
      .attr("dy", d=>(this.scale(d.value)+2)+"px")
      .style("opacity", d=>((d.value/max)*3))

    s.select("circle")
      .attr("fill", d=> "#3C7C9B")
      .attr("r", d => this.scale(d.value))
      // .style("opacity", d=>((d.value/max)*4))


    s.exit().remove();
  }

}