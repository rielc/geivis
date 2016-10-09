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
      || next.filters !== last.filters
      || next.hover !== last.hover
      || next.loaded !== last.loaded
    ){
      this.render();
    }

  }

  render(){

    const size = this.db[this.key].size();
    this.div.select(".title").text(this.key);
    this.div.classed("active", this.state.state.active === this.key);
    this.div.classed("hover", this.state.state.hover === this.key);
    this.div
      .on("mouseenter", (d)=>{
        this.state.push({ event: "enter", active: this.key });
      })
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
      .on("mouseenter", (d,i,e)=>{
        let tooltip = null;
        if(d.value/max < 0.15){
          const p = d3.select(e[i]).select(".bar").node().getBoundingClientRect();
          const p2 = d3.select(".container").node().getBoundingClientRect();
          tooltip =  { name: d.value, pos: [p.left-p2.left, p.top-p2.top] };
        }
        this.state.push({ event: "enter", active: this.key, hover: d.key });
      })
      .on("mouseleave", ()=>{
        this.state.push({ event: "leave", active: this.key, hover: null });
      })
      .on("click", (d)=>{
        let active = this.state.state.filters[this.key] && this.state.state.filters[this.key] === d.key;
        // this is a good example why actions where invented:
        let filters = {...this.state.state.filters, [this.key]: active ? null:d.key };
        this.state.push({ event: "click", active: this.key, filters });

        // this.state.push({ event: "click", active: this.key, activeItem: activeItem ? null : d.key });
        // this.state.push({ event: "click", active: this.key, filter: [d.key] });
        // this.state.push({ filter: { [this.key] : d.key }});
      })

    e.append("div").classed("left", true).append("div")
      .classed("bar", true)
      // .classed("hidden", d=> d.value/max < 0.2 )
      .text(d => d.value/max < 0.15 ? `` : `${ d.value }` )
      .style("width", d=> `${ (d.value / max)*100 }%`)
      .on("mouseenter", (d)=>{
        this.state.push({ event: "enter", active: this.key, hover: d.key });
      })

    e.append("div").classed("right", true)
      .text(d => `${ d.key }` )

    if(this.state.state.event == "brushend" || this.state.state.event == "click"){
      // console.log(s.data())
      this.items.selectAll(".item").sort((a,b) => b.value - a.value)
    }

    s.classed("hover", d=> !this.state.state.filters[this.key] && this.state.state.hover === d.key)
    s.classed("active", d=> this.state.state.filters[this.key] && this.state.state.filters[this.key]===d.key)
    
    s.select(".bar")
      .text(d => d.value/max < 0.15 ? `` : `${ d.value }` )
      // .transition()
      .style("width", d=> `${ (d.value / max)*100 }%`);

    s.select(".right")
      .text(d => `${ d.key }` )
      
    s.exit().remove();
    // this.container.text(data.length);
    
    return this;
  }

}