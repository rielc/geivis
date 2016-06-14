export let __hotReload = true
import {StateDb} from '../../StateDb';

export class BarList extends StateDb {

  constructor(state, db, div){
    super(state,db);

    this.div = div.append("div").classed("entity", true);
    this.div.append("div").classed("title", true).text(this.key);
    this.items = this.div.append("div").classed("items", true);
    this.data = [];
    this.key = "subjects";
    

    this.div.on("click", ()=> {
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
    if(!next.visible.StreamSection) return;
    // console.log(next,last);
    if(next.brushStart !== last.brushStart
      || next.brushEnd !== last.brushEnd
      || next.active !== last.active
      || next.activeItem !== last.activeItem
      || next.hover !== last.hover
    ){
      this.render();
    }

  }

  render(){

    const size = this.db[this.key].size();
    this.div.select(".title").text(this.key);
    this.div.classed("active", this.state.state.active === this.key);
    // this.container.classed("hover", this.state.state.hover === this.key);
    // console.time("filter");
   // console.log(this.key);
    const group = this.db[this.key].top(20);
    const max = d3.max(group, d => d.value);
    // console.timeEnd("filter");

    // console.log(group);

    let s = this.items.selectAll(".item").data(group, d=>d.key);
    let e = s.enter()
      .append("div")
      .classed("item", true)
      .on("mouseenter", (d)=>{
        this.state.push({ event: "enter", active: this.key, hover: d.key });
      })
      .on("mouseleave", ()=>{
        this.state.push({ event: "leave", active: this.key, hover: null });
      })
      .on("click", (d)=>{
        let activeItem = this.state.state.activeItem === d.key;
        this.state.push({ event: "click", active: this.key, activeItem: activeItem ? null : d.key });
        // this.state.push({ filter: { [this.key] : d.key }});
      })

    e.append("div").classed("left", true).append("div")
      .classed("bar", true).text(d => `${ d.value }` )
      .style("width", d=> `${ (d.value / max)*100 }%`)

    e.append("div").classed("right", true)
      .text(d => `${ d.key }` )

    if(this.state.state.event != "brushmove"){
      // console.log(s.data())
      this.items.selectAll(".item").sort((a,b) => b.value - a.value)
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