export let __hotReload = true;

import {Section} from '../../Section';
import {NestedTreemap} from './NestedTreemap'

export class TreemapSection extends Section {

  constructor(state, db){
    super(state,db);

    let oh = 0;
    oh+=parseInt(this.title.style("padding-top"));
    oh+=parseInt(this.title.style("padding-bottom"));
    oh+=parseInt(this.title.style("height"));
    this.margin = {'top':oh,'right':0,'bottom':0,'left':0};
    
    this.treemap = new NestedTreemap( {'margin':this.margin} );
    this.treemap.layout = "SliceDice";

    this.treemap
      .setLevelA("Subject")
      .setLevelB("Place")
      .addNesting("Subject", (d) => ((d.subject==undefined) ? "Subject unknown" : d.subject))
      .addNesting("Schooltype", (d) => ((d.schooltype==undefined) ? "Schooltype unknown" : d.schooltype))
      .addNesting("Schoollevel", (d) => ((d.schoollevel==undefined) ? "Schoollevel unknown" : d.schoollevel))
      .addNesting("Place", (d) => ((d.publisher_city==undefined) ? "Place unknown" : d.publisher_city))
      .addNesting("Publisher", (d) => ((d.publisher==undefined) ? "Publisher unbekannt" : d.publisher ))
      .appendTo(this.div);

    this.title.html(`Comparing ${this.treemap.levelB}s in ${this.treemap.levelA}s`);
  }


  stateChange(next, last) {


    if (next.loaded != last.loaded) this.treemap.updateData(this.db.date.top(Infinity)).render();
    if (!next.visible.TreemapSection) return;

    if (next.brushStart !== last.brushStart || next.brushEnd !== last.brushEnd) {
      
      this.title.html(`Comparing ${this.treemap.levelB}s in ${this.treemap.levelA}s from ${next.brushStart.getFullYear()} to ${next.brushEnd.getFullYear()}`);

      let data = this.db.date.top(Infinity);
      if (data.length>0) {
        this.treemap.updateData(data);
        this.treemap.render();
      }
    }
  }


  render(){

  }




}