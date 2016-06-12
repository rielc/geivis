export let __hotReload = true
export class Bookshelf {

  constructor(state, db){

    this.container = d3.select(".bookshelf");
    this.state = state;
    this.db = db;

    this.state.listen(this.stateChange.bind(this));

    return this;
  }

 

  stateChange(next, last){
    // if(next.brushStart !== last.brushStart){
    //   this.render();
    // }
    this.render();
    // console.log(next.brushStart, last.brushStart);
  }

  render(){
    //console.log( this.state.state);
    const data = this.db.date.top(50);

    // console.log(data);

    let s = this.container.selectAll(".book").data(data);

    s.enter()
      .append("div")
      .attr("class", "book")
      .text(d=>d.title)

    s.text(d=>d.title)

    s.exit().remove();
    
    return this;
  }

}