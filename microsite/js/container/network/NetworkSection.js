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
      .text("This visualization shows the distribution of tags throughout the currently selected timeframe. The size of a circle represent the number of books with that tag. On hover you can see the other tags that were given in conjunction. The opacity of the other circles indicates how often they were given in conjunction. By clicking on a circle you can see it’s neighbourhood: Other related tags form a circle around the selected tag. Their relation is caluclated by the number of shared occurrences and by how much of their own occurrence is shared together with the selected tag. Clicking on the link shows the corresponding books for each tag. Clicking on the centered node or changing the timeframe leaves this view.")
 
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