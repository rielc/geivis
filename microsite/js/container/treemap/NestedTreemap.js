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

		this.connectionSVG = this.svg
			.append('svg')
			.style('position', 'absolute')
			.attr("class", "label-connections")
			.style("width", this.width)
			.style("height", 62);

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
			.style("transform", d => `translate3d(${d.x0}px,${d.y0+60}px,0px)` )
			.style("width", d => { return ((d.x1-d.x0)+"px"); })
			.style("height", d => (d.depth==1?(d.y1-d.y0-60):(d.y1-d.y0))+'px' );

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


	render (mode) {

		let line = d3.line().x(d=>Math.round(d[0])).y(d=>d[1]).curve(d3.curveMonotoneY)

		function connectionLinePath (d,i,array) {
				let shift = 30
				let amt = i/array.length
				let vStart = [i*w+w,0]
				let vEnd = [d.x0+(d.x1-d.x0)*0.5,60]
				let v0 = [vStart[0],vStart[1]]; v0[1]+=shift-(shift*amt);
				let v1 = [vEnd[0],vEnd[1]]; v1[1]-=shift*amt;

				return line( [vStart,v0,v1,vEnd] )
			}


		console.log(mode)

		let l, w, nodes

		// this filter function enables us render partial data depending on the brushevent
		let filter = () => true;
		switch (mode) {
			case "brushmove" : filter = (d) => { return (d.depth > 0 && d.depth < 2) }; break;
			case "brushend" : filter = (d) => { return (d.depth > 0) }; break;
		}


		// data filtered depending on the brushevent
		let data = this.root.descendants()
		let dataLevel1 = data.filter((d)=>d.depth==1)
		let dataLevel2 = data.filter((d)=>d.depth==2)

		// this.nodes = this.svg.selectAll(".node").data(data, this.dKey)

		switch (mode) {
			case "brushstart" :
				// update all existing nodes
				// this.nodes
				// 	.call(this.setNodeDimensions)
				// 	.style("height", "100px")
				// 	.call(this.setNodeID)
				// 	.call(this.setNodeClass);
			break;
			case "brushmove" :

				this.svg.selectAll(".node.level-2").remove()

				let nodesLevel1 =  this.svg.selectAll(".node.level-1").data(dataLevel1, this.dKey)
				let labelLevel1 =  this.svg.selectAll(".level-1-label").data(dataLevel1, this.dKey)
				let connections =  this.connectionSVG.selectAll("path").data(dataLevel1, this.dKey)

				w = this.width / dataLevel1.length
				// enter l1-labels
				let enteredLabelLevel1 = labelLevel1.enter().append('div')
					.classed('level-1-label', true)
					.text((d) => d.data.key )
					.style('width', w+'px')
					.style('height', '60')
					.style('transform',(d,i) => `translate3d(${i*w}px,0px,0px)`)
				// update 
				labelLevel1
					.style('width', w+'px')
					.style('transform',(d,i) => `translate3d(${i*w}px,0px,0px)`)
				// exit
				labelLevel1.exit().remove()


				// enter connection lines
				let enteredConnections = connections.enter()
					.append('path')
					.attr('class', (d) => ('path ' + d.data.key) )
					.attr( "d", connectionLinePath)
				// update
				connections.transition().duration(300)
					.attr( "d", connectionLinePath)

				// exit
				connections.exit().remove()

				// enter l1-nodes
				let enteredNodesLevel1 = nodesLevel1.enter().append('div')
					.call(this.setNodeClass)
					.call(this.setNodeID)
					.call(this.setNodeDimensions)
				// update 
				nodesLevel1
					.call(this.setNodeDimensions)
					.call(this.setNodeID)
				// exit
				nodesLevel1.exit().remove()


			break;
			case "brushend" :

				let nodesLevel2 =  this.svg.selectAll(".node.level-2").data(dataLevel2, this.dKey)

				// enter l2-nodes
				let enteredNodesLevel2 = nodesLevel2.enter().append('div')
					.call(this.setNodeClass)
					.call(this.setNodeID)
					.call(this.setNodeDimensions)
						.call(this.setMouseBehaviour.bind(this))
				// labels
				enteredNodesLevel2
					.append("span")
					.classed("label", true)
					.text(d => d.depth!=0?d.data.key:null);
				enteredNodesLevel2
					.append("span")
					.classed("count", true)
					.text(d => d.depth!=0?d.data.value:null);
				// check for overflow
		    enteredNodesLevel2
		      .call( (d) => { 
		      	d.nodes().forEach( (n) => {
		      		this.checkOverflow.bind(n)()
		      	})
		      })
		      
				// // update 
				// nodesLevel2
				// 	.call(this.setNodeDimensions)
				// 	.call(this.setNodeID)
				// // exit
				// nodesLevel2.exit().remove()



/*
				// update the existing level 2 nodes
				this.nodes
					.filter(f=>f.depth==2)
					.call(this.setNodeID)
					.call(this.setNodeClass)
					.call(this.setNodeDimensions)

				let enteredNodes = 
					this.nodes
						.enter()
						.append("div")
						.call(this.setNodeClass)
						.call(this.setNodeID)
						.call(this.setMouseBehaviour.bind(this))

				let enteredNodesL2 = enteredNodes.filter(f=>f.depth==2)


				// level 2 nodes follow the treemap data
				enteredNodesL2
					.call(this.setNodeDimensions)
					.call(this.setMouseBehaviour.bind(this));

				enteredNodesL2
					.append("span")
					.classed("label", true)
					.text(d => d.depth!=0?d.data.key:null);

				enteredNodesL2
					.append("span")
					.classed("count", true)
					.text(d => d.depth!=0?d.data.value:null);

				// got through each new node and check if its overflowing
		    enteredNodesL2
		      .call( (d) => { 
		      	d.nodes().forEach( (n) => {
		      		this.checkOverflow.bind(n)()
		      	})
		      })


				let nodesL1 = this.nodes.filter(f=>f.depth==1)


				// width of the first level nodes
				w = this.width / nodesL1.nodes().length

				// level 1 nodes have a connection line and are spaced equally
				nodesL1
					.style('background-color', '#cecece')
					.style('width', w)
					.style('height', '30px')
					.style('transform',(d,i) => `translate3d(${i*w}px,0px,0px)`)
*/
			break;
		}

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