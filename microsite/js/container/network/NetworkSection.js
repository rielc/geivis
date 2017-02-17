export let __hotReload = true

import {Section} from '../../Section';
import {classificationTags} from '../../../data/classificationTags'
import {CirclePackedNetwork} from './CirclePackedNetwork'

export class NetworkSection extends Section {
  constructor(state, db){
    super(state,db);


  // gabriel modules init
  // create a blacklist of tags to ignore because they are part of the classification
  this.blacklist = []; 
  d3.values(classificationTags).forEach( e1 => {
    d3.values(e1).forEach( e2 => {
      e2.forEach( e3 => { 
        this.blacklist.push(e3);
      }); 
    });
  });

   this.div.append("div")
      .attr("class", "intro")
      .text(`
        Diese Visualisierung veranschaulicht die Verteilung der Schlagwörter in GEI-Digital. Wählen Sie eine Zeitspanne aus und es werden Ihnen die für diesen Zeitraum vergebenen Schlagwörter in Form von Kreisen angezeigt. Die Größe eines Kreises stellt die Anzahl der Schulbücher dar, die mit dem gleichen Schlagwort in GEI-Digital erfasst sind. Um die Hauptschlagwörter gruppieren sich weitere Schlagwort-Kreise, die mit den Hauptschlagwörtern in Verbindung stehen. Wenn Sie auf ein Schlagwort klicken, öffnet sich eine Ansicht mit weiteren verwandten Schlagwörtern. Per Mausklick können Sie sich die zu den Schlagwörtern passenden Schulbücher im Menü Books anzeigen lassen. Durch Klicken auf den zentrierten Knoten oder durch Ändern des Zeitrahmens verlassen Sie die ausgewählte Ansicht. 
      `);
    this.title.html(`Tags`);

    let oh = 0;
    oh+=parseInt(this.title.style("padding-top"));
    oh+=parseInt(this.title.style("padding-bottom"));
    oh+=parseInt(this.title.style("height"));
    this.margin = {'top':oh,'right':0,'bottom':0,'left':0};

    this.network = new
      CirclePackedNetwork( {'margin':this.margin} )
      .setBlacklist(this.blacklist)
      .setNodeAccessor("RSWKTag")
      .setOccurrenceScale( d3.scaleLinear().domain([0,1]).range([0.5, 1.0])  )
      .append(this.div)

    this.network.setState(state)
    this.network.setDB(db)

  }

  stateChange(next, last){

    // init
    if (next.loaded != last.loaded) {
      this.network.updateData(this.db.date.top(Infinity))
      this.network.render("brushend");
    }

    if (!next.visible.NetworkSection) return;
    this.db.bookshelfData = this.db.date.top(Infinity)

    if (  next.brushStart !== last.brushStart
          || next.brushEnd !== last.brushEnd
          || next.visible.NetworkSection !== last.visible.NetworkSection ) {
        this.render(next, last);
    }
  }

  render(next, last){

    // this simple hack enables brushstart,brushmove and brushend events
    let event = (last.event != next.event && next.event == "brushmove") ? "brushstart" : next.event;

      let data = this.db.date.top(Infinity);
      if (data.length>0) {
        this.network.updateData(data);
        this.network.render(event);
      }
  }

}