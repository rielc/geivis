export let __hotReload = true;

import {Section} from '../../Section';
import {NestedTreemap} from './NestedTreemap'

export class TreemapSection extends Section {

  constructor(state, db){
    super(state,db);

    this.margin = {'top':100,'right':0,'bottom':100,'left':0};
    
    this.treemap = new NestedTreemap( {'margin':this.margin} );
    this.treemap.layout = "SliceDice";

    this.treemap
      .setLevelA("Schulfach")
      .setLevelB("Ort")
      .addNesting("Schulfach", (d) => ((d.subject==undefined) ? "Schulfach unbekannt" : d.subject))
      .addNesting("Schultyp", (d) => ((d.schooltype==undefined) ? "Schultyp unbekannt" : d.schooltype))
      .addNesting("Schullevel", (d) => ((d.schoollevel==undefined) ? "Schullevel unbekannt" : d.schoollevel))
      .addNesting("Ort", (d) => ((d.publisher_city==undefined) ? "Ort unbekannt" : d.publisher_city))
      .addNesting("Verlag", (d) => ((d.publisher==undefined) ? "Verlag unbekannt" : d.publisher ))
      .appendTo(this.div);
  }


  stateChange(next, last) {

    if (next.loaded != last.loaded) this.treemap.updateData(this.db.date.top(Infinity)).render();
    if (!next.visible.TreemapSection) return;

    if (next.brushStart !== last.brushStart || next.brushEnd !== last.brushEnd) {
      let data = this.db.date.top(Infinity);
      if (data.length>0) {
        this.treemap.updateData(data);
        this.treemap.render();
        console.log("render done");
      }
    }
  }


  render(){

  }




}