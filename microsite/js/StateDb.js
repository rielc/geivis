export let __hotReload = true

export class StateDb {

	constructor(state, db){
	  this.name = this.constructor.name;
	  this.state = state;
	  this.state.subscribe(this);
	  this.db = db;
	  
	}

	stateChange(next, last){
		console.log("Section state", next);
	}

}