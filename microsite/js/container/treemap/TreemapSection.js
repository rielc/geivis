export let __hotReload = true;

import {Section} from '../../Section';
import {NestedTreemap} from './NestedTreemap'

export class TreemapSection extends Section {

  constructor(state, db){
    super(state,db);

    // these accessor functions describe the nesting values
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

    this.margin = {'top':0,'right':0,'bottom':0,'left':0}

    this.title.text(`Comparison`);
    this.div.append("div")
      .attr("class", "intro")
      .text("Cultural heritage institutions such as museums, archives, and libraries have been digitizing their inventories over the last two decades. The digitization process includes both the digital capture of the artifacts (for example via photography or 3d scanning) as well as the recording of the metadata about the artifact's historical context, material characteristics, and cultural significance. The main promises connected with digitization of cultural assets are long-term preservation and increased levels of access (Smith, 2002, pp.7). This paper is especially concerned with questions related to access, which so far has mostly relied on interface concepts from traditional information retrieval. However, there is an increased unease with a mode of access, which requires people to translate a possibly vague interest into a specific search query. Unlike museum exhibitions or library shelves that may lend themselves better to curiosity-driven browsing of cultural heritage, conventional search interfaces are arguable not particularly inviting. Instead, more 'generosity' is needed in the display of the artifacts' richness and their distribution in the collection")


    this.treemap = new NestedTreemap( {'margin':this.margin} )
    this.treemap.setState(state)

    this.treemap.appendTo(this.div)


    // selects
    this.selects = this.div.append("div").classed('selects', true)
    this.selects.append('span').text('Compare')
    let select1 = this.selects.append("div").classed("select-1 switch", true)
    this.selects.append('span').text('in')
    let select0 = this.selects.append("div").classed("select-0 switch", true)

    this.treemap
      .setNesting(nestings)
      .createDropdowns(select0, select1)


    // let height = parseInt(select1.style("height"))

    // select1
    //   .style('transform', `rotate(-90deg)translate3d(-${this.treemap.height}px,0, 0)`)
    //   .style('width', this.treemap.height+'px')
  }


  stateChange(next, last) {

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
    {
      this.treemap.updateData(this.db.date.top(Infinity))
      this.treemap.render("brushmove");
    } else {
      // update if in viewport and brush has changed
      if (  next.brushStart !== last.brushStart
            || next.brushEnd !== last.brushEnd
            || next.loaded !== last.loaded
            || next.visible.TreemapSection !== last.visible.TreemapSection ) {
            this.treemap.updateData(this.db.date.top(Infinity))
            this.render(next, last)
      }
    }


  }


    render(next, last){
    // this simple hack enables brushstart,brushmove and brushend events
    const event = (last.event != next.event && next.event == "brushmove") ? "brushstart" : next.event;
    this.treemap.updateData(this.db.date.top(Infinity));
    this.treemap.render(event);
  }



}