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
		this.order = [];
	}

	appendTo (selector) {
		
		this.container = selector;
	    //this.createDropdowns();

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

		this.rawData = data;

		let nesting = d3.nest(); 

		// if both nestings are of same value, just use the first
		if (this.levelA != this.levelB) {
			nesting.key( this.nestings[this.levelA] ).key( this.nestings[this.levelB] )
		} else {
			nesting.key( this.nestings[this.levelA] )
		}

		nesting.rollup(d=>d.length);
		let nested = nesting.entries(data);

		this.root = d3
			.hierarchy( { key : "all values", values : nested }, function(d) { return d.values; })
			.sum( d => d.value  )
			.sort( (b, a) => { return ( Math.abs((a.x1-a.x0)-Math.abs(b.x1-b.x0)) || (a.value - b.value) ); } );

		this.treemap = d3.treemap()
			.size([this.width, this.height])
			.tile(d3.treemapSliceDice)
			.round(true)
			.paddingLeft( d=> {
				switch(d.depth){
					case 1: return 1; break;
					default: return 0; break;
				}
			})
			.paddingRight( d=> {
				switch(d.depth){
					case 1: return 1;
					default: return 0;
				}
			})
			.paddingTop( d=> {
				switch(d.depth){
					case 1: return 30; break;
					case 2: return 1; break;
					case 3: return 1; break;
					default: return 1; break;
				}
			})
			.paddingBottom( d=> {
				switch(d.depth){
					case 2: return 1; break;
					//case 3: return 1;
					default: return 2; break;
				}
			});

		this.treemap(this.root);
		return this;
	}


	setNodeDimensions (selection) {
		selection
			.style("transform", d => `translate3d(${d.x0}px,${d.y0}px,0px)` )
			.style("width", d => { return ((d.x1-d.x0)+"px"); })
			.style("height", d => ((d.y1 - d.y0)+"px"));

		selection.select(".label").text(d => d.depth!=0?d.data.key:null);
		selection.select(".count").text(d => d.depth!=0?d.data.value:null);
	}

	setNodeClass (selection) {
		selection
			.attr("class", d => {
				let c = GeiVisUtils.makeSafeForCSS(d.data.key) + " node " + "level-"+d.depth;
				c += (Math.abs(d.x1-d.x0)<3||Math.abs(d.y1-d.y0)<3) ? " other" : "";
				return c;
			});
	}

	setNodeID (selection) {
		selection
		.attr("id", (d) => {
			if (d.depth === 1) return GeiVisUtils.makeSafeForCSS(d.data.key);
			if (d.depth === 2) return GeiVisUtils.makeSafeForCSS(d.parent.data.key + d.data.key);
		});
	}

	setMouseBehaviour (selection) {
		selection
			.on("mouseover", (d) => {
				if (d.depth===2) {
					this.svg.selectAll(".node").classed("related", false);
					this.svg.selectAll("."+GeiVisUtils.makeSafeForCSS(d.data.key)).classed("related", true);
				}
			})
			.on("mouseout", (d) => {
				this.svg.selectAll(".node").classed("related", false);
			})
	}


	checkOverflow (d,i,array) {
		let el = d3.select(this);
		let o = GeiVisUtils.checkOverflow(el.node());
		if (o == "overflow") {
			el.classed("overflow", true);
		  	el.attr("data-balloon", d=>d.data.key);
		  	el.attr("data-balloon-pos", "up");
		} else {
			el.attr("data-balloon", null);
			el.attr("data-balloon-pos", null);
			el.classed("overflow", false);
		}
	}

	dKey (d) {
		let k = d.data.key
		k += d.parent!=undefined?d.parent.data.key:'root'
		return k
	}


	render(mode) {

		console.log(mode)

		// this filter function enables us render partial data depending on the brushevent
		let filter = () => true;
		switch (mode) {
			case "brushmove" : filter = (d) => { return (d.depth > 0 && d.depth < 2) }; break;
			case "brushend" : filter = (d) => { return (d.depth > 0) }; break;
		}

		// data filtered depending on the brushevent
		let data = this.root.descendants().filter(filter)
		this.nodes = this.svg.selectAll(".node").data(data, this.dKey)

		switch (mode) {
			case "brushstart" :
				// update all existing nodes
				this.nodes
					.call(this.setNodeDimensions)
					.style("height", "100px")
					.call(this.setNodeID)
					.call(this.setNodeClass);
			break;
			case "brushmove" :
				// update all existing nodes
				this.nodes
					.call(this.setNodeDimensions)
					.call(this.setNodeID)
					.call(this.setNodeClass)
			break;
			case "brushend" :

				this.nodes
					.call(this.setNodeID)
					.call(this.setNodeClass)
					.call(this.setNodeDimensions)

				let enteredNodes = 
					this.nodes
						.enter()
						.append("div")
						.call(this.setNodeClass)
						.call(this.setNodeDimensions)
						.call(this.setNodeID)
						.call(this.setMouseBehaviour.bind(this));

				enteredNodes
					.append("span")
					.classed("label", true)
					.text(d => d.depth!=0?d.data.key:null);

				enteredNodes
					.append("span")
					.classed("count", true)
					.text(d => d.depth!=0?d.data.value:null);

				// got through each new node and check if its overflowing
		    enteredNodes
		      .call( (d) => { 
		      	d.nodes().forEach( (n) => {
		      		this.checkOverflow.bind(n)()
		      	})
		      })

			break;
		}


		this.nodes
			.exit()
			.remove();

		return this;
  	}

		// TODO: Make the number of levels dynamic

	createDropdowns (a,b) {

		var n = d3.keys(this.nestings);
		this.dropdownA = a.append("select").attr("id", "dropdown-a");
		this.dropdownB = b.append("select").attr("id", "dropdown-b");
		
		this.dropdownA.on("change", (sel) => { this.levelA = this.dropdownA.property("value"); this.updateData(this.rawData).render(); });
		this.dropdownB.on("change", (sel) => { this.levelB = this.dropdownB.property("value"); this.updateData(this.rawData).render(); });
		
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