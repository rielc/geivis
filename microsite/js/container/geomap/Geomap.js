export let __hotReload = true

import {StateDb} from '../../StateDb';
// import topojson from 'topojson';

export class Geomap extends StateDb {

  constructor(state, db, div){
    super(state,db);
    
    this.div = div;
    this.outerWidth = 1200;
    this.outerHeight = window.innerHeight-100;
    this.margin = {top: 20, right: 20, bottom: 20, left: 20};

    this.projection = d3.geoMercator();
      
    this.path = d3.geoPath().projection(this.projection);
    
    div.selectAll("*").remove() // temp fix

    this.svg = d3.select(div.node()).append("svg");
    this.g = this.svg.append("g");
    this.land = this.g.append("path").attr("class","land");
    this.rivers = this.g.append("path").attr("class","river");

    this.scale = d3v3.scale.linear().range([1,20]);
    this.opacity = d3.scaleLog().range([0.2,1])
    this.fontscale = d3v3.scale.linear().range([10,15]);

    return this;
  }

  init(){
    this.width = this.outerWidth - this.margin.left - this.margin.right,
    this.height = this.outerHeight - this.margin.top - this.margin.bottom;

    this.projection
      .center([15, 49])
      .scale(3500)
      .translate([outerWidth / 2, outerHeight / 2])

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
    if(next.loaded !== last.loaded){
      // console.log(this.db.store);
      this.rivers.datum(topojson.mesh(this.db.store.rivers)).attr("d", this.path);
      this.land.datum(this.db.store.land).attr("d", this.path);
    }

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
    //console.log(this.db.store)

    
    // this.rivers.datum(this.db.store.otherriver).attr("d", this.path);

    let places = this.db["places"].top(100);
    let max = d3v3.max(places, d=>d.value);

    this.opacity.domain([0.1,max]);
    this.scale.domain([0.1, max]).clamp(true);
    this.fontscale.domain(d3v3.extent(places, d=>d.value)).clamp(true);

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
      .on("mouseenter", (d,i,l)=> {
        d3.select(l[i])
          .style("opacity", 1)
          .select("text")
          .text(d2 => `${d.key} (${d.value})`)
      })
      .on("mouseleave", (d,i,l)=> {
        d3.select(l[i])
          .style("opacity", d=>this.opacity(d.value))
          .select("text")
          .text(d2 => `${d.key}`)
      })
      
      e.append("circle")
        .attr("fill", d=> "#3C7C9B")
        .attr("r", d => this.scale(d.value))
        .style("opacity", d=>d.value ? 1: 0)

      e.append("text")
        .attr("dx", d=>(this.scale(d.value)+2)+"px")
        .attr("dy", d=>(this.scale(d.value)+2)+"px")
        .text(d => d.key)
        .style("font-size", d=>(this.fontscale(d.value)+"px"))
      
      e.merge(s)
        .attr("transform", d=> {
          const p = this.projection([d.lon,d.lat]);
          return `translate(${p[0]},${p[1]})`;
        })
        .style("opacity", d=>this.opacity(d.value))
        .style("display", d=> d.value ? "": "none")


    
    s.select("text")
      .attr("dx", d=>(this.scale(d.value)+2)+"px")
      .attr("dy", d=>(this.scale(d.value)+2)+"px")
      .style("font-size", d=>(this.fontscale(d.value)+"px"))

    s.select("circle")
      .attr("fill", d=> "#3C7C9B")
      .attr("r", d => this.scale(d.value))

    // slow...
    // e.merge(s).select("text")
    //   .attr("dx", d=>(this.scale(d.value)+2)+"px")
    //   .attr("dy", d=>(this.scale(d.value)+2)+"px")
    //   .style("opacity", d=>((d.value/max)*4))
    //   .style("font-size", d=>(this.fontscale(d.value)+"px"))

    // e.merge(s).select("circle")
    //   .attr("fill", d=> "#3C7C9B")
    //   .attr("r", d => this.scale(d.value))
    //   .style("opacity", d=>d.value ? 1: 0)


    s.exit().remove();
  }

}