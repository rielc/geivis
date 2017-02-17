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
      .text(`
        In dieser Visualisierung können Sie die Facetten Verlage und Verlagsorte mit den Facetten Schulfächer und Bildungslevel kombinieren und sich quantitative Vergleiche anzeigen lassen. Durch die Kombination Verlage mit Schulfächern werden zum Beispiel die Aktivitäten der Verlage entlang der Schulfächer dargestellt. 
        Wählen Sie durch Ziehen mit gedrückter Maustaste auf der Zeitleiste eine Zeitspanne aus und treffen Sie Ihre Facetten-Auswahl mit den Schaltern links unten auf der Seite. Die Ergebnisse Ihrer Auswahl werden nacheinander gruppiert als Tabelle dargestellt. Fahren Sie mit der Maus über eine der Zellen, können Sie das in der Zelle markierte Topic in seiner relationalen Verteilung verfolgen. Bei Klick auf die markierte Zelle, werden Ihnen die zur Auswahl passenden Schulbücher angezeigt.
      `);

    this.treemap = new NestedTreemap( {'margin':this.margin} )
    this.treemap.setState(state)
    this.treemap.setDB(db)
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
    this.db.bookshelfData = this.db.date.top(Infinity)

    // update if became visible
    if (next.visible.TreemapSection !== last.visible.TreemapSection)
    {
      this.treemap.updateData(this.db.date.top(Infinity))
      this.treemap.render("brushmove");
      this.treemap.showButton();
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