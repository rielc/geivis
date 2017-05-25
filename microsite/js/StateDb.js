export let __hotReload = true

function ieFix(){
	if (Function.prototype.name === undefined && Object.defineProperty !== undefined) {
			Object.defineProperty(Function.prototype, 'name', {
					get: function() {
							var funcNameRegex = /function\s([^(]{1,})\(/;
							var results = (funcNameRegex).exec((this).toString());
							return (results && results.length > 1) ? results[1].trim() : "";
					},
					set: function(value) {}
			});
	}
}

export class StateDb {

	constructor(state, db){
		ieFix();
		this.name = this.constructor.name;
		this.state = state;
		this.state.subscribe(this);
		this.db = db;
		
	}

	stateChange(next, last){
		console.log("Section state", next);
	}

}