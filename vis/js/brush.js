class BrushChart {

	constructor(prop){
		console.log("chart");

		this.params = {
			chart: true,
			outerWidth: 400,
			outerHeight: 300, 
			margin: {top: 40, right: 40, bottom: 40, left: 40},
			width: this.outerWidth
		}
	}

	_(...p){
		if(p.length == 2){
			this.params[p[0]] = p[1];
			return this;
		} else {
			return this.params[p[0]];
		}
	}



	// get prop() {
 //    return this.prop;
 //  }
 //  set prop(value) {
 //    Object.assign(this.prop, value);
 //  }



	// init(params){
	// 	console.log(params);

	// 	let margin = {top: 40, right: 40, bottom: 40, left: 40},
 //    width = outerWidth - margin.left - margin.right,
 //    height = outerHeight - margin.top - margin.bottom;

	// 	d3.select(params.div).append("svg");

	// 	return this;
	// }

	// state(val){
	// 	if (!val) { return this._state; }
	// 	this._state = Object.assign(this._state, val);
	// 	return this;
	// }

}