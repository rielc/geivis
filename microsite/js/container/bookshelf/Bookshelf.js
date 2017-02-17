export let __hotReload = true

import {StateDb} from '../../StateDb';

export class Bookshelf extends StateDb {

  constructor(state, db, div){
    super(state, db);
    
    // this.openClass = 'open fadeInRightBig'
    // this.closeClass = 'closed fadeOutRightBig'

    // this.div = div.classed('animated ' + this.openClass, true)
    this.div = div.classed('open', false)
      .on("mouseenter", ()=>{ this.state.push({ bookshelf: true }) } )
      .on("mouseleave", ()=>{ this.state.push({ bookshelf: false }) } );
    this.container = this.div.append("div").classed('bookshelf', true);
    // this.opener = this.div.append("div").classed('opener', true).on("mouseenter", this.open.bind(this) );
    // this.closeButton = this.div.append("a").classed("closeButton", true).text('Close')
    // this.closeButton.on("click", this.close.bind(this) )

    return this;
  }

 

  stateChange(next, last){
    if(next.loaded !== last.loaded){
      //this.state.push({ bookshelf: true });
    }
    if(next.bookshelf !== last.bookshelf){
      if(next.bookshelf){
        this.open()
      } else {
        this.close();
      }
    }
  }

  open () {
    this.div.classed("open", true);
    this.render();
  }
  close() {
    this.div.classed("open", false);
  }

  render() {
    // const data = customData==undefined ? this.db.date.top(150).filter(d => d.title != "") : customData;
    const data = this.db.bookshelf();
    let s = this.container.selectAll(".book").data(data, d=>d.id);

    s.enter()
      .append("a")
      .attr("class", "book")
      .attr("href", d=>d.url)
      .attr("target", "_blank")
      .html(d=>`${d.title.replace('@', '') || d.titleAlt} <i>${d.publisher} ${d.year}</i> `)

    s
      .attr("href", d=>d.url)
      .html(d=>`${d.title} <i>${d.publisher} ${d.year}</i> `)
    s.exit().remove();
    return this;
  }

}