export let __hotReload = true
export class BarList {

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
    // console.log(next.filter);
  }

  render(){
    //console.log( this.state.state);
    const size = this.db[this.key].size();
    this.container.select(".title").text(this.key);
    this.container.classed("active", this.state.state.active === this.key);
    // this.container.classed("hover", this.state.state.hover === this.key);
    // console.time("filter");
   // console.log(this.key);
    const group = this.db[this.key].top(20);
    const max = d3.max(group, d => d.value);
    // console.timeEnd("filter");

    let s = this.items.selectAll(".item").data(group, d=>d.key);
    let e = s.enter()
      .append("div")
      .classed("item", true)
      .on("mouseenter", (d)=>{
        this.state.push({ active: this.key, hover: d.key });
      })
      .on("mouseleave", ()=>{
        this.state.push({ active: this.key, hover: null });
      })
      .on("click", (d)=>{
        let activeItem = this.state.state.activeItem === d.key;
        this.state.push({ active: this.key, activeItem: activeItem ? null : d.key });
        this.state.push({ filter: { [this.key] : d.key }});
      })

    e.append("div").classed("left", true).append("div").classed("bar", true)
    e.append("div").classed("right", true)

    if(this.state.state.keyframe){
      s.sort((a,b) => b.value - a.value)
    }

    s.classed("hover", d=> this.state.state.hover === d.key)
    s.classed("active", d=> this.state.state.activeItem === d.key)
    
    s.select(".bar")
      .text(d => `${ d.value }` )
      // .transition()
      .style("width", d=> `${ (d.value / max)*100 }%`);

    s.select(".right")
      .text(d => `${ d.key }` )
      
    s.exit().remove();
    // this.container.text(data.length);
    
    return this;
  }

}