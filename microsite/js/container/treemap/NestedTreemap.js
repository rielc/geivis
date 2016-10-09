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
		this.activeNest = [];
		this.nestings = [];
		this.nestingA = {};
		this.nestingB = {};
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
			.style("height", 60);
		return this;
	}


	setState (state) { this.state = state; }


	relativeColorScale (initial, value) {
		d3.scaleLinear.domain([-1.0, 0.0, 1.0]).range(["#ff0000, #cccccc", "#00ff00"]);
	}

	updateData(data) {

		if (data != undefined) { this.data = data; }

		let nesting = d3.nest(); 
		let nstA = this.nestings[0][this.activeNest[0]].accessor
		let nstB = this.nestings[1][this.activeNest[1]].accessor
		nesting.key(nstA).key(nstB).rollup(d=>d.length)
		let nested = nesting.entries(this.data);

		this.root = d3
			.hierarchy( { key : "all values", values : nested }, function(d) { return d.values; })
			.sum( d => d.value  )
			.sort( (b, a) => { return ( Math.abs((a.x1-a.x0)-Math.abs(b.x1-b.x0)) || (a.value - b.value) ); } );

		this.treemap = d3.treemap()
			.size([this.width, this.height-60])
			.tile(d3.treemapSliceDice)
			.round(false)
			.paddingLeft(0)
			.paddingRight(0)
			.paddingTop(0)
			.paddingBottom(0)

		this.treemap(this.root);
		return this;
	}


	setNodeDimensions (selection) {
		selection
			.style("transform", d => `translate3d(${d.x0}px,${d.y0+60}px,0px)` )
			.style("width", d => { return ((d.x1-d.x0)+"px"); })
			.style("height", d => (d.depth==1?(d.y1-d.y0):Math.max(1,(d.y1-d.y0)))+'px' );

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


	checkOverflow (d,i,array) {
		let o = GeiVisUtils.checkOverflow( d3.select(this).node() )
		d3.select(this).classed('overflow', o=='overflow')
	}

	dKey (d) {
		let k = d.data.key
		k += d.parent!=undefined?d.parent.data.key:'root'
		return k
	}


	render (mode) {

		function updateLabels (dataLevel1) {
				let nodesLevel1 =  this.svg.selectAll(".node.level-1").data(dataLevel1, this.dKey)
				let labelLevel1 =  this.svg.selectAll(".level-1-label").data(dataLevel1, this.dKey)
				let connections =  this.connectionSVG.selectAll("path").data(dataLevel1, this.dKey)
				// enter l1-labels
				let enteredLabelLevel1 = labelLevel1.enter().append('div')
					.classed('level-1-label', true)
					.style('height', '60')
					.style('transform',(d,i) => `translate3d(${i*w}px,0px,0px)scale(0,0)`)
				// update 
				labelLevel1
					.style('width', w+'px')
					.html( (d) => {
						let label = d.data.key == '' ? 'unknown' : d.data.key
						return `${label}<br/><span>${d.value}</span>`
					})
					.style('transform',(d,i) => `translate3d(${i*w}px,0px,0px)scale(1,1)`)
				// exit
				labelLevel1
				.exit()
					.style('transform',(d,i) => `translate3d(${i*w}px,0px,0px)scale(1,1)`)
					.remove()
				// enter connection lines
				let enteredConnections = connections.enter()
					.append('path')
					.attr('class', (d) => ('path ' + d.data.key) )
					.attr( "d", connectionLinePath)
				// update
				connections.transition()
					.duration(100)
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
					.style('border-left',(d,i,array) => (i==0)?'none':null)
					.style('border-right',(d,i,array) => (i==array.length-1)?'none':null)
					.call(this.setNodeDimensions)
					.call(this.setNodeID)
				// exit
				nodesLevel1.exit().remove()
		}

		function connectionLinePath (d,i,array) {
				let shift = 30
				let amt = i/array.length
				let vStart = [i*w+w,0]
				let vEnd = [d.x0+(d.x1-d.x0)*0.5,60]
				let v0 = [vStart[0],vStart[1]]; v0[1]+=shift-(shift*amt);
				let v1 = [vEnd[0],vEnd[1]]; v1[1]-=shift*amt;
				return line( [vStart,v0,v1,vEnd] )
		}

		let nodes

		// data filtered depending on the brushevent
		let data = this.root.descendants()
		let dataLevel1 = data.filter((d)=>d.depth==1)
		let dataLevel2 = data.filter((d)=>d.depth==2)

		let m = 20
		let w = (this.width-m) / dataLevel1.length
		let line = d3.line().x(d=>Math.round(d[0])).y(d=>d[1]).curve(d3.curveMonotoneY)

		switch (mode) {
			case "brushstart" :
			// not mucho to do?
			break;
			case "brushmove" :

				this.svg.selectAll(".node.level-2").remove()
				updateLabels.bind(this)(dataLevel1)


			break;
			case "brushend" :

				updateLabels.bind(this)(dataLevel1)

				const nodesLevel2 =  this.svg.selectAll(".node.level-2").data(dataLevel2, this.dKey)

				// enter l2-nodes
				const enteredNodesLevel2 = nodesLevel2.enter().append('div')
					.call(this.setNodeClass)
					.call(this.setNodeID)
					.call(this.setNodeDimensions)
					.on("mouseover", (d,i,array) => {
						this.svg.selectAll(".node").classed("related", false)
						this.svg.selectAll("."+GeiVisUtils.makeSafeForCSS(d.data.key)).classed("related", true)
						const el = d3.select(array[i])
						const o = GeiVisUtils.checkOverflow(el.node())
						if (el.classed('overflow') || el.classed('other')) {
							const tPos = d3.mouse(this.container.node())
		        	this.state.push({ tooltip: { name: d.data.key, pos: tPos} })
		        }
					})
					.on("mouseout", (d) => {
						this.svg.selectAll(".node").classed("related", false)
	        	this.state.push({ tooltip: null })
					})
					.on("click", (d) => {
						let indicesA = this.data.map(this.nestings[1][this.activeNest[1]].accessor).map( (el,i)=>el==d.data.key?i:-1).filter(el=>el!=-1)
						let indicesB = this.data.map(this.nestings[0][this.activeNest[0]].accessor).map( (el,i)=>el==d.parent.data.key?i:-1).filter(el=>el!=-1)
						let filteredData = this.data.filter((d,i)=>indicesA.indexOf(i)!=-1&&indicesB.indexOf(i)!=-1)
						//console.log(filteredData)
	        	// this.state.push({ bookshelf: {data:filteredData} })
					})
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

			break;
		}

		return this;
  	}

	createDropdowns (a,b) {

		let that = this

		this.nestingA = a.append("span").attr("id", "nesting-0").call(createSwitchContent)
		this.nestingB = b.append("span").attr("id", "nesting-1").call(createSwitchContent)

		function createSwitchContent(selection) {

			let target = selection.attr('id')
			let targetID = target.replace('nesting-', '')
			let name = that.nestings[targetID][that.activeNest[targetID]].name

			selection.append('a').attr('href', '#')
				.classed('prev', true)
				.classed(target, true)
				.on("click", switchNesting)
				.text('Previous')
			selection.append('span').classed('name', true).text(name)
			selection.append('a')
				.attr('href', '#')
				.classed('next', true)
				.classed(target, true)
				.on("click", switchNesting)
				.text('Next')
		}

		function switchNesting() {
			d3.event.preventDefault()

			let direction = d3.select(this).classed('prev') ? -1:1
			let target = d3.select(this).classed('nesting-0') ? 0:1
			
			let newNest = that.activeNest[target]+1*direction
			newNest = newNest>that.nestings[target].length-1? 0:newNest
			newNest = newNest<0 ? that.nestings[target].length-1:newNest

			that.activeNest[target] = newNest
			d3.select('#nesting-'+target).select('.name').text(that.nestings[target][newNest].name)
			that.updateData()
			that.render('brushmove')
			that.render('brushend')
		}



		return this;
	}

	setNesting (nestings) {
		this.nestings = nestings
		// map-reduce to find the initally activated nestings
		this.activeNest = nestings.map( d => d.reduce((prev,current,i) => {
			if (prev==-1 && current.isActive==true) { return i } else { return prev } 
		}, -1))
		return this
	}

	filterData( evaluation ) {
		this.filteredData = this.data.filter(evaluation);
		this.update();
		return this;
	}

}