export let __hotReload = true;

import {Section} from '../../Section';
import {NestedTreemap} from './NestedTreemap'

export class TreemapSection extends Section {

  constructor(state, db){
    super(state,db);

    let select1 = this.div.append("div").classed("select-1 switch", true)
    let select0 = this.div.append("div").classed("select-0 switch", true)

    this.margin = {'top':0,'right':0,'bottom':0,'left':0};
    
    this.treemap = new NestedTreemap( {'margin':this.margin} );
    this.treemap.layout = "SliceDice";

    this.treemap.setState(state)

    let nestings = [
      [
        {isActive:true, name:'Subject', accessor:d=>d.subject==undefined?'Subject unknown':d.subject },
        {name:'Schooltype', accessor: d=>d.schooltype==undefined?'Schooltype unknown':d.schooltype },
        {name:'Schoollevel', accessor: d=>d.schoollevel==undefined?'Schoollevel unknown':d.schoollevel }
      ],
      [
        {isActive:true, name:'Place', accessor:d=>d.publisher_city==undefined?'Place unknown':d.publisher_city },
        {name:'Publisher', accessor: d=>d.publisher==undefined?'Publisher unbekannt':d.publisher }
      ]
    ]

    this.treemap
      .setNesting(nestings)
      .appendTo(this.div)

    this.treemap.createDropdowns(select0, select1)

    let height = parseInt(select1.style("height"))

    select1
      .style('transform', `rotate(-90deg)translate3d(-${this.treemap.height}px,0, 0)`)
      .style('width', this.treemap.height+'px')
  }


  stateChange(next, last) {
    console.log(next, last)

    // init
    if (next.loaded != last.loaded) {
      this.treemap.updateData(this.db.date.top(Infinity))
      this.treemap.render("brushmove");
      this.treemap.render("brushend");
    }
    
    // skip if not in viewport
    if (!next.visible.TreemapSection) return;

    // update if became visible
    if (next.visible.TreemapSection !== last.visible.TreemapSection)
      this.treemap.updateData(this.db.date.top(Infinity))
      this.treemap.render("brushmove")

    // update if in viewport and brush has changed
    if (  next.brushStart !== last.brushStart
          || next.brushEnd !== last.brushEnd
          || next.visible.TreemapSection !== last.visible.TreemapSection ) {
          this.render(next, last)
    }

  }


    render(next, last){

    // this simple hack enables brushstart,brushmove and brushend events
    const event = (last.event != next.event && next.event == "brushmove") ? "brushstart" : next.event;

    this.treemap.updateData(this.db.date.top(Infinity));
    this.treemap.render(event);
  }



}