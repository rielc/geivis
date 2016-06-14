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

    this.margin = {'top':180,'right':50,'bottom':50,'left':50};

    this.network = new
      CirclePackedNetwork( {'margin':this.margin} )
      .setBlacklist(this.blacklist)
      .setNodeAccessor("RSWKTag")
      .setOccurrenceScale( d3.scaleLinear().domain([0,1]).range([0.5, 1.0])  )
      .append(this.div);

  }


  stateChange(next, last){
    if( next.brushStart.getFullYear() != last.brushStart.getFullYear() ) {
      //this.years = [next.brushStart.getFullYear(), next.brushEnd.getFullYear()];
      
      let data = this.db.dates.top(Infinity);
      if (data.length>0) {
        this.network.updateData(this.db.date.top(Infinity));
        this.network.render();
      }
    //}

    //console.log(next);
  	// console.log(next)

  	// if(next.loaded == !last.loaded){
  	// 	this.stream.x.domain(this.db.extent);
  	// 	this.stream.load().render();
  	}
  }

  render(){

  }




}