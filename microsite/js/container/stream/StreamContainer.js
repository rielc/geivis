export let __hotReload = true

import {StreamGraph} from './StreamGraph'
import {BarList} from './BarList'

export class StreamContainer {

  constructor(state, db){
  	this.state = state;
  	this.db = db;

  	this.state.listen(this.stateChange.bind(this));


  	// console.log("init", state, db)

  	d3.select("#"+StreamContainer.name).remove(); //hotreload hotfix

  	this.div = d3.select(".container").append("section").attr("id", StreamContainer.name);

  	this.divStream = this.div.append("div").attr("class", "stream");
  	this.divEntities = this.div.append("div").attr("class", "entities");

  	this.stream = new StreamGraph(state, db, this.divStream).init();

  	this.listSubjects = new BarList(state, db, this.divEntities).Key("subjects");
  	this.listSchoollevels = new BarList(state, db, this.divEntities).Key("schoollevels");
  	this.listPublishers = new BarList(state, db, this.divEntities).Key("publishers");
  	this.listPlaces = new BarList(state, db, this.divEntities).Key("places");


  }


  stateChange(next, last){
  	// console.log(next)

  	if(next.loaded == !last.loaded){
  		this.stream.x.domain(this.db.extent);
  		this.stream.load().render();
  	}
  }

  render(){

  }




}