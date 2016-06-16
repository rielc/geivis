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


		this.root = d3
			.hierarchy( { key : "all values", values : nesting.entries(data) }, function(d) { return d.values; })
			.sum( d => d.value  )
			.sort( (b, a) => { return ( Math.abs((a.x1-a.x0)-Math.abs(b.x1-b.x0)) || (a.value - b.value) ); } );

		this.treemap = d3.treemap()
			.size([this.width, this.height])
			.tile(d3.treemapSliceDice)
			.round(true)
			.paddingTop( d=> {
				switch(d.depth){
					case 1: return 30;
					default: return 0;
				}
			})
			.paddingBottom( d=> {
				switch(d.depth){
					case 1: return 1;
					default: return 0;
				}
			})
			.paddingLeft( d=> {
				switch(d.depth){
					case 1: return 2;
					default: return 0;
				}
			})
			.paddingRight( d=> {
				switch(d.depth){
					case 1: return 2;
					default: return 0;
				}
			});

		this.treemap(this.root);
		return this;
	}


	render() {

		let that = this;

		function updateNode (s) {

			s
			.style("transform", d => `translate(${d.x0}px,${d.y0}px)` )
			.style("width", d => { return ((d.x1-d.x0)+"px"); })
  			.style("height", d => ((d.y1 - d.y0)+"px"));

			s
			.filter( d => (d.depth == 2) )
			.style("padding-top", d => ((d.y1 - d.y0)/2-5)+"px");
		}


		this.svg.selectAll(".node").remove();	
		
		let data = this.root.descendants();

		this.nodes = this.svg
			.selectAll(".node")
			.data(data, d=>d.data.key)
			.call(updateNode);

		let enteredNodes = this.nodes
			.enter();

		enteredNodes
			.append("div")
			.attr("id", d => {
				if (d.depth == 1) return GeiVisUtils.makeSafeForCSS(d.data.key);
				if (d.depth == 2) return GeiVisUtils.makeSafeForCSS(d.parent.data.key+d.data.key);
			})
			.attr("class", d => GeiVisUtils.makeSafeForCSS(d.data.key) + " node " + "level-"+d.depth)
			// .on("mouseover", function (d) {
			// 	// TODO: Implement custom relative Color-Scale
			// 	d3.selectAll(".node").classed("active", false);
			// 	d3.selectAll("." + GeiVisUtils.makeSafeForCSS(d.data.key)).classed("active", true);
			// })
			.text(d => d.depth!=0?d.data.key:"undefined")
			.call(updateNode)
			.each( function (d) {
				let el = d3.select(this);
				let overflow = GeiVisUtils.checkOverflow(el._groups[0], 14);
				el.classed(overflow, true);
				if (overflow == "overflow" || overflow == "partial-overflow") {
				  el.attr("data-balloon", d=>d.data.key+": "+d.values);
				  el.attr("data-balloon-pos", "down");
				}
			});

		this.nodes
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