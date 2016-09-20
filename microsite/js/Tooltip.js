export function __hotReload(){
   return true;
}


export class Tooltip {

  constructor(state){
    this.name = this.constructor.name;
    this.state = state;
    this.state.subscribe(this);

    this.containerParent = d3.select(".container");
    this.containerParent.select(".ctooltip").remove();
    this.container = this.containerParent
      .append("div").attr("class", "ctooltip")
    this.text = this.container.append("div").attr("class", "arrow_box")
  }


  stateChange(next, last){
    // console.log(this.name, last.tooltip, next.tooltip);
    
    if(next.tooltip !== last.tooltip){
      //console.log("tooltip", next.tooltip)

      if(next.tooltip !== null){
        const pos = d3.mouse(this.containerParent.node());
        this.container
          .style("transform", `translate(${pos[0]}px,${pos[1]}px)`)
          .style("visibility", "visible")
        this.text.text(next.tooltip.name)
  
      } else {
        this.container.style("visibility", "hidden")
      }
      
    }

  }


}