export let __hotReload = true;

import * as GeiVisUtils from "../../lib/GeiVisUtils.js";

export class NestedTreemap {

	constructor( props ) {
		this.properties = props;
	 	this.container = {};
		this.svg = {};
		this.root = {};
		this.data;
		this.filteredData = {};
		this.treemap = {};
		this.nested = {};
		this.nestings = {};
		this.url = {};
		this.width = {};
		this.height = {};
		this.dropdownA = {};
		this.dropdownB = {};
		this.levelA = "";
		this.levelB = "";
		this.format;
		this.color;
		this.state;
		this.layout = "SliceDice";
	}

	appendTo (selector) {
		
		this.container = selector;
	    this.createDropdowns();

	    this.width = parseInt( this.container.style("width") ) - this.properties.margin.left - this.properties.margin.right,
	    this.height = parseInt( this.container.style("height") ) - this.properties.margin.top - this.properties.margin.bottom;

		this.svg = this.container
			.append("div")
			.attr("class", "visualization")
			.style("width", this.width )
			.style("height", this.height );

		return this;
	}


	setLevelA (string) { this.levelA = string; return this; }
	setLevelB (string) { this.levelB = string; return this; }


	relativeColorScale (initial, value) {
		d3.scaleLinear.domain([-1.0, 0.0, 1.0]).range(["#ff0000, #cccccc", "#00ff00"]);
	}

	updateData(data) {

		let nesting = d3.nest(); 

		// if both nestings are of same value, just use the first
		if (this.levelA != this.levelB) {
			nesting.key( this.nestings[this.levelA] ).key( this.nestings[this.levelB] )
		} else {
			nesting.key( this.nestings[this.levelA] )
		}

		nesting.rollup( (d) => { return d.length; });


		// do the nesting and then remap the values
		//this.nested = nesting.entries( data );
		//this.nested = GeiVisUtils.remap({"key": "All Books", "values" : this.nested });



		//this.format = d3.format(",d");

		console.log("nested", this.nested);

		this.root = d3.hierarchy( nesting.entries( data ), function(d) { return d.values; })
			.sum( d => d.value  )
			.sort( (a, b) => { return Math.max((a.x1-a.x0)) - Math.max((b.x1-b.x0))||(a.value - b.value); } );

		//console.log("before", this.root);

		this.treemap = d3.treemap()
			.size([this.width, this.height])
			.tile(d3.treemapSlice)
			.round(false);
			// .padding( (d) => {
			// 	switch(d.depth) {
			// 		case 0: return [0, 0, 0, 0];
			// 		case 1: return [30, 0, 0, 0];
			// 		case 2: return [0 , 0, 0, 0];
			// 	}
			// } );

		this.treemap(this.root);

		console.log(this.root);

		//console.log("result", this.treemap(this.root));

		// console.log("after", this.root);

		return this;
	}


	render() {

		let that = this;

		function updateNode (s) {

			// position the text in the middle of all first levels
			//s.filter( d => (d.depth == 1)).style("padding-top", "10px");

			// s
			// 	.filter( d => (d.depth != 1 || d.depth != 2) )
			// 	.style("left", (d) => { return (that.properties.margin.left + d.x) + "px"; })
			// 	.style("top", (d) =>{ return (that.properties.margin.top + d.y) + "px"; })
			// 	.style("width", (d) => { return Math.max(0, d.dx - 1) + "px"; })
			// 	.style("height", (d) => { return Math.max(0, d.dy - 1) + "px"; });
			
			s
			//.filter( d => (d.depth == 2) )
			//.style("padding-top", d => (Math.max(0, d.dy - 1)/2 - 5) + "px" )
			// .sort( (a,b) => { return ((a.x)+Math.max(0, a.dy - 1)) - ((b.x)+Math.max(0, b.dy - 1)) })
			// .style("width", "0px")
			// .style("height", (d) => { return Math.max(0, d.dy - 1) + "px"; })
			// .transition()
			// .duration(300)
			// .delay( (d,i) => { return i*1.5; } )
			.style("transform", d => `translate(${d.x0},px${d.y0}px)` )
			.style("width", d => ((d.x1-d.x0)+"px"))
  			.style("height", d => ((d.y1 - d.y0)+"px"));
			// .each(function (d) { 
			// 	let el = d3.select(this);
			// 	let overflow = checkOverflow(el[0][0], 10, 2);
			// 	if (overflow) { el.classed("label", true); }
			// });

			// position the text in the middle of all 2nd levels
			//s.filter( d => (d.depth == 2)).style("padding-top", d => (Math.max(0, d.dy - 1)/2 - 5) + "px" );

		}


		console.log(this.root);
		
		let data = this.root.leaves();

		//this.svg.selectAll(".node").remove();

		this.nodes = this.svg
			.selectAll(".node")
			.data(data, (d,i) => {

				//console.log(d);
				//console.log(d);
				let r = d.data.key;
				if (d.parent != undefined) { r+=d.parent.data.name; } 
				//console.log(r);
				return i;
			})
			.call(updateNode);

		this.nodes
			.enter()
			.append("div")
			// .attr("id", d => {
			// 	console.log(d);
			// 	let r = d.data.key;
			// 	//if (d.parent != undefined) { r+=d.parent.data.key; } 
			// 	return GeiVisUtils.makeSafeForCSS(r);
			// })
			// .attr("class", d => (GeiVisUtils.makeSafeForCSS(d.data.key) + (" level-" + d.depth)) )
			.classed("node", true)
			// .on("mouseover", function (d) {
			// 	// TODO: Implement custom relative Color-Scale
			// 	d3.selectAll(".node").classed("active", false);
			// 	d3.selectAll("." + GeiVisUtils.makeSafeForCSS(d.data.key)).classed("active", true);
			// })
			// .text(d => d.depth!=0?d.data.key:null)
			.call(updateNode);


		this.nodes
			// .transition()
			// .duration(100)
			// .style("width", 0 )
			// .style("height", 0 )
			.exit()
			.remove();

		return this;

  }

		// TODO: Make the number of levels dynamic

	createDropdowns () {
		var n = d3.keys(this.nestings);
		
		this.dropdownA = this.container.append("select").attr("id", "dropdown-a");
		this.dropdownB = this.container.append("select").attr("id", "dropdown-b");
		
		this.dropdownA.on("change", (sel) => { this.levelA = this.dropdownA.property("value"); this.update(); });
		this.dropdownB.on("change", (sel) => { this.levelB = this.dropdownB.property("value"); this.update(); });
		
		this.dropdownA
			.selectAll("option")
			.data(n)
			.enter()
			.append("option")
			.attr("selected", d => d == this.levelA ? "true" : null)
			.attr("value", (d) => { return d; })
			.text( (d) => { return d; });
		this.dropdownB
			.selectAll("option")
			.data(n)
			.enter()
			.append("option")
			.attr("selected", d => d == this.levelB ? "true" : null)
			.attr("value", (d) => { return d; })
			.text( (d) => { return d; });

		return this;
	}

	addNesting (name, f) { this.nestings[name] = f; return this;}

	filterData( evaluation ) {
		this.filteredData = this.data.filter(evaluation);
		this.update();
		return this;
	}

}