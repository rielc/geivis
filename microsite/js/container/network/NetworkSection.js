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

    this.margin = {'top':100-parseInt(this.title.style("height")),'right':0,'bottom':0,'left':0};

    this.network = new
      CirclePackedNetwork( {'margin':this.margin} )
      .setBlacklist(this.blacklist)
      .setNodeAccessor("RSWKTag")
      .setOccurrenceScale( d3.scaleLinear().domain([0,1]).range([0.5, 1.0])  )
      .append(this.div);

      this.title.html(`All tags`);
  }

  stateChange(next, last){

    if (next.loaded != last.loaded) this.network.updateData(this.db.date.top(Infinity)).render();
    if (!next.visible.NetworkSection) return;

    if (next.brushStart !== last.brushStart || next.brushEnd !== last.brushEnd) {
      this.title.html(`All tags from ${next.brushStart.getFullYear()} to ${next.brushEnd.getFullYear()}`);
      let data = this.db.date.top(Infinity);
      if (data.length>0) {
        this.network.updateData(data);
        this.network.render();
      }
    }
  }

  render(){

  }

}