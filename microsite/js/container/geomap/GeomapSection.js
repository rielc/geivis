export let __hotReload = true

import {Section} from '../../Section';
import {Geomap} from './Geomap';

export class GeomapSection extends Section {

  constructor(state, db){
    super(state,db);

    this.title.text(`Places`);
    this.div.append("div")
      .attr("class", "intro")
      .text(`
        Each book got a publisher and a place where it originated. In this visualization the geographical distribution
        of the selection in time is shown as a bubble map. Each bubble represents the amout of books beeing 
        published at the geographical location. The big timestream above is now compressed into a small timeslider
        which will work from now on as a tool to customize each visualization. By dragging on the timeline you can
        select a specific timespan to be visualized underneath. Doubleclick on the selection to clear the start and 
        end time. 
      `)
    this.geomap = new Geomap(state,db, this.div.append("div"))
    //this.geomap.outerHeight = this.height;
    this.geomap.init();
  }


  stateChange(next, pev){
  //	console.log(next.visible.GeomapSection);

  	if(next.visible.GeomapSection != pev.visible.GeomapSection){
  	  // console.log("GeomapSection", next.visible.GeomapSection);
  	}
  }

  render(){

  }

}