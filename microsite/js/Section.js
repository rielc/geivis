export let __hotReload = true

import {StateDb} from './StateDb';

export class Section extends StateDb {

	constructor(state, db){
	  super(state,db);

	  d3.select("#"+this.name).remove(); //hotreload hotfix
	  this.div = d3.select(".container").append("section").attr("id", this.name);
	  this.title = this.div.append("h2").classed("title", true);
	  this.type = "section";
	}

}