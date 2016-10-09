export let __hotReload = true

import {StateDb} from '../../StateDb';

export class Bookshelf extends StateDb {

  constructor(state, db, div){
    super(state, db);
    
    this.openClass = 'open fadeInRightBig'
    this.closeClass = 'closed fadeOutRightBig'

    this.div = div.classed('animated ' + this.openClass, true)
    this.container = this.div.append("div").classed('bookshelf', true);
    this.closeButton = this.div.append("a").classed("closeButton", true).text('Close')
    this.closeButton.on("click", this.close.bind(this) )
    return this;
  }

 

  stateChange(next, last){
    if (next.bookshelf!=undefined) {
      console.log(last, next)
      this.render(next.bookshelf.data)
      this.open()
      // console.log(next.bookshelf.data)
    } else {
      this.close()
    }
  }

  open () { this.div.classed(this.openClass, true).classed(this.closeClass, false) }
  close() { this.div.classed(this.closeClass, true).classed(this.openClass, false) }

  render(customData) {
    const data = customData==undefined ? this.db.date.top(150).filter(d => d.title != "") : customData;
    let s = this.container.selectAll(".book").data(data, d=>d.id);
   
    s.enter()
      .append("div")
      .attr("class", "book")
      .text(d=>d.title)
    s.text(d=>d.title)
    s.exit().remove();
    return this;
  }

}