export let __hotReload = true

import {StateDb} from '../../StateDb';

export class Bookshelf extends StateDb {

  constructor(state, db, div){
    super(state, db);

    this.container = div.append("div").attr("class", "bookshelf");
    
    return this;
  }

 

  stateChange(next, last){
    if(!next.visible.BookshelfSection) return;

    if(next.brushStart !== last.brushStart
      || next.brushEnd !== last.brushEnd
      || next.active !== last.active
      || next.activeItem !== last.activeItem
      || next.hover !== last.hover
      || next.loaded !== last.loaded
    ){
      this.render();
    }
    // console.log(next.brushStart, last.brushStart);
  }

  render(){
    //console.log( this.state.state);
    const data = this.db.date.top(150);

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