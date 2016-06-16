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

		//let hist = d3.histogram().value(h=>h.value).thresholds([2])
		let nested = nesting.entries(data);

		// let nested = nesting.entries(data).map( d=> {
		// 	let rHist = hist(d.values);
		// 	if (rHist.length>1) {
		// 		let rVal = d3.values(rHist[1]).filter(f=> typeof f === "object");
		// 		rVal.push({key:"Other", value : d3.sum(rHist[0], s=>s.value)});
		// 		return { key:d.key, values: rVal };
		// 	} else {
		// 		return d;
		// 	}
		// });	

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


	render() {

		let that = this;

		function updateNode (s) {
			s
			.style("transform", d => `translate3d(${d.x0}px,${d.y0}px,0px)` )
			//.style("border", d=> (Math.abs(d.x1-d.x0)<3||Math.abs(d.y1-d.y0)<3) ? "none" : null)
			.style("width", d => { return ((d.x1-d.x0)+"px"); })
  			.style("height", d => ((d.y1 - d.y0)+"px"));

  			s.each( checkOverflow );
		}


		//this.svg.selectAll(".node").remove();	
		
		let data = this.root.descendants().filter(d=>d.depth>0);

		this.nodes = this.svg
			.selectAll(".node")
			.data(data, d=>d.data.key)
			.call(updateNode)
			.attr("class", d => {
				let c = GeiVisUtils.makeSafeForCSS(d.data.key) + " node " + "level-"+d.depth;
				c += (Math.abs(d.x1-d.x0)<3||Math.abs(d.y1-d.y0)<3) ? " other" : "";
				return c;
			});

		this.nodes.select(".label").text(d => d.depth!=0?d.data.key:null);
		this.nodes.select(".count").text(d => d.depth!=0?d.data.value:null);

		this.nodes.each(checkOverflow);

		let enteredNodes = this.nodes.enter();

		let appendedNode = enteredNodes
			.append("div")
			.attr("class", d => {
				let c = GeiVisUtils.makeSafeForCSS(d.data.key) + " node " + "level-"+d.depth;
				c += (Math.abs(d.x1-d.x0)<3||Math.abs(d.y1-d.y0)<3) ? " other" : "";
				return c;
			})
			.on("mouseover", function (d) {
				if (d.depth===2) {
					that.svg.selectAll(".node").classed("related", false);
					that.svg.selectAll("."+GeiVisUtils.makeSafeForCSS(d.data.key)).classed("related", true);
				}
			})
			.on("mouseout", function (d) {
				that.svg.selectAll(".node").classed("related", false);
			})
			.attr("id", d => {
				if (d.depth === 1) return GeiVisUtils.makeSafeForCSS(d.data.key);
				if (d.depth === 2) return GeiVisUtils.makeSafeForCSS(d.parent.data.key+d.data.key);
			})
			.call(updateNode);


		appendedNode
			.append("span")
			.classed("label", true)
			.text(d => d.depth!=0?d.data.key:null);

		appendedNode
			.append("span")
			.classed("count", true)
			.text(d => d.depth!=0?d.data.value:null);

		appendedNode
			.each( checkOverflow );

		function checkOverflow (d) {
			let el = d3.select(this);
			let overflow = GeiVisUtils.checkOverflow(el.node());
			if (overflow == "overflow") {
				el.classed("overflow", true);
			  	el.attr("data-balloon", d=>d.data.key);
			  	el.attr("data-balloon-pos", "up");
			} else {
				el.attr("data-balloon", null);
				el.attr("data-balloon-pos", null);
				el.classed("overflow", false);
			}
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