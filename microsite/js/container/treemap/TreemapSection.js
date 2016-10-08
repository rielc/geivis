export let __hotReload = true;

import {Section} from '../../Section';
import {NestedTreemap} from './NestedTreemap'

export class TreemapSection extends Section {

  constructor(state, db){
    super(state,db);

    this.title.append("span").classed("verb", true).text("Comparing");
    this.title.append("span").classed("dropdown-b", true);
    this.title.append("span").classed("in", true).text("in");
    this.title.append("span").classed("dropdown-a", true);
    this.title.append("span").classed("years", true);

    let oh = 0;
    oh+=parseInt(this.title.style("padding-top"));
    oh+=parseInt(this.title.style("padding-bottom"));
    oh+=parseInt(this.title.style("height"));
    this.margin = {'top':oh,'right':0,'bottom':0,'left':0};
    
    this.treemap = new NestedTreemap( {'margin':this.margin} );
    this.treemap.layout = "SliceDice";

    this.treemap.setState(state)

    this.treemap
      .setLevelA("Subject")
      .setLevelB("Place")
      .addNesting("Subject", (d) => ((d.subject==undefined) ? "Subject unknown" : d.subject))
      .addNesting("Schooltype", (d) => ((d.schooltype==undefined) ? "Schooltype unknown" : d.schooltype))
      .addNesting("Schoollevel", (d) => ((d.schoollevel==undefined) ? "Schoollevel unknown" : d.schoollevel))
      .addNesting("Place", (d) => ((d.publisher_city==undefined) ? "Place unknown" : d.publisher_city))
      .addNesting("Publisher", (d) => ((d.publisher==undefined) ? "Publisher unbekannt" : d.publisher ))
      .appendTo(this.div);

    this.treemap.createDropdowns(this.title.select(".dropdown-a"), this.title.select(".dropdown-b"));
  }


  stateChange(next, last) {

    // init
    if (next.loaded != last.loaded) {
      this.treemap.updateData(this.db.date.top(Infinity))
      this.treemap.render("brushend");
    }
    
    if (!next.visible.TreemapSection) return;

    if (  next.brushStart !== last.brushStart
          || next.brushEnd !== last.brushEnd
          || next.visible.TreemapSection !== last.visible.TreemapSection ) {
        this.render(next, last);
    }

  }


    render(next, last){

    // this simple hack enables brushstart,brushmove and brushend events
    let event = (last.event != next.event && next.event == "brushmove") ? "brushstart" : next.event;
    let l = this.db.date.top(Infinity).length;
    let data = this.db.date.top(Infinity);
    if (data.length>0) {
      this.treemap.updateData(data);
      this.treemap.render(event);
    }
  }



}