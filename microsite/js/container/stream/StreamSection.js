export let __hotReload = true

import {Section} from '../../Section';
import {StreamGraph} from './StreamGraph'
import {BarList} from './BarList'

export class StreamSection extends Section {

  constructor(state, db){
  	super(state,db);

    this.title.html("<strong>GEORG ECKERT INSTITUTE</strong> / Visualized Collection Prototype");

  	this.divStream = this.div.append("div").attr("class", "stream");
  	this.divEntities = this.div.append("div").attr("class", "entities");

  	this.stream = new StreamGraph(state, db, this.divStream).init();

  	this.listSubjects = new BarList(state, db, this.divEntities).Key("subjects");
  	this.listSchoollevels = new BarList(state, db, this.divEntities).Key("schoollevels");
  	this.listPublishers = new BarList(state, db, this.divEntities).Key("publishers");
  	this.listPlaces = new BarList(state, db, this.divEntities).Key("places");

  }


  stateChange(next, last){
  	// console.log(next.visible)

    //console.log(this.db.date.top(Infinity));

  }

  render(){

  }

}