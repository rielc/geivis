export let __hotReload = true

export class StateDb {

	constructor(state, db){
	  this.state = state;
	  this.state.subscribe(this);
	  this.db = db;
	  this.name = this.constructor.name;
	  
	}

	stateChange(next, last){
		console.log("Section state", next);
	}

}