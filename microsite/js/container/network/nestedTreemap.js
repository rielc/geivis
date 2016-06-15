export let __hotReload = true

export default class NestedTreemap {

	constructor( props ) {
		
		this.props = props;
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

	// TODO: Put Utils in extra Class

	makeSafeForCSS (name) {
	    return name.replace(/[^a-z0-9]/g, function(s) {
	        var c = s.charCodeAt(0);
	        if (c == 32) return '-';
	        if (c >= 65 && c <= 90) return '_' + s.toLowerCase();
	        return '__' + ('000' + c.toString(16)).slice(-4);
	    });
	}


	checkOverflow(el)
	{
		console.log(el);
	   var curOverflow = el.style.overflow;
	   if ( !curOverflow || curOverflow === "visible" )
	      el.style.overflow = "hidden";

	   var isOverflowing = el.clientWidth < el.scrollWidth 
	      || el.clientHeight < el.scrollHeight;

	   el.style.overflow = curOverflow;

	   return isOverflowing;
	}


	setState(state, db) {
		this.state = state;
		this.db = db;
    	this.state.listen(this.stateChange.bind(this));
	}


	stateChange(next, last) {

		if(next.brushStart !== last.brushStart){
			this.filteredData = this.db.date.top(Infinity);
	    	this.update();
	    }

	    console.log(next);
  	}


	init(containerSelector) {
		
		this.container = d4.select(containerSelector);
	    this.createSelectors();

	    this.width = parseInt( this.container.style("width") );
	    this.height = parseInt( this.container.style("height") );

		this.svg = this.container
			.append("div")
			.attr("class", "visualization")
			.style("width", this.width )
			.style("height", this.height );

		this.format = d4.format(",d");
		this.color = d4.scaleMagma().domain([-1, 4]);

		this.treemap = d4.treemap()
			.size([this.width, this.height])
			.paddingOuter(d => { return ((d.depth ==1) ? 5 : 0); })
			.paddingTop(d => { return ((d.depth ==1) ? 20 : 0); })
			.paddingInner(d => { return ((d.depth >= 0) ? 1 : 0); })
			.round(true);

		// TODO: make the layout-switching efficient! 1/2
		if (this.layout == "SliceDice") { this.treemap.tile(d4.treemapSliceDice); }


		return this;
	}


	setLevelA (string) { this.levelA = string; return this; }
	setLevelB (string) { this.levelB = string; return this; }


	relativeColorScale (initial, value) {
		d4.scaleLinear.domain([-1.0, 0.0, 1.0]).range(["#ff0000, #cccccc", "#00ff00"]);
	}

	update() {

		// Enable Singular nesting

		this.nested = d4.nest()
			.key( this.nestings[this.levelA] )
			.key( this.nestings[this.levelB] )
			.rollup( (leaves) => { return {"size" : leaves.length } ; } )
			.entries( this.filteredData );

		// TODO: Dont use weird string replacement to generate the new object. Instead use a recursive function, a accessor or sth else.  

		// from values and keys to children and name
		this.nested = JSON.parse( JSON.stringify(this.nested).replace(/"key":/gi, '"name":').replace(/"values":/gi, '"children":') );

		var threshold = 5;

		// get the size of each cell
		this.nested.forEach( function (major) {
			let majorSize = 0;
			major.children.forEach( function(minor) {
				//majorSize += minor.children.size;
				minor.size = minor.children.size;
				delete(minor.children);
			});
			major.size = majorSize;
		});


		// TODO: Use a histogram to generate the "other" bin in Treemap
		// Generate a histogram using twenty uniformly-spaced bins.
		// var hist = d3.layout.histogram()
		//     .bins(10)
		//     .value(d => d.size)
		//     (this.nested);

		//     console.log(hist);

		this.root = d4
			.hierarchy(
				{
					"name" : "root", 
					"children" : this.nested, 
					"size" : 0
				}, (d) => { return d.children; }
			)
			.sum( (d) => { return d.size; })
			.sort( (a, b) => { return b.height - a.height || b.value - a.value; });

		// TODO: make the layout-switching efficient! 2/2
			if (this.layout == "SliceDice") { this.root.sort( (a, b) => { return Math.abs(b.x1 - b.x0) - Math.abs(a.x1 - a.x0) || b.value - a.value; }) }


		this.treemap(this.root);

		let that = this;

		function updateNode (s) {

			s
				.filter( d => (d.depth != 1 || d.depth != 2) )
				.style("left", d => ( (d.x0) + "px") )
				.style("top", d => ( (d.y0) + "px") )
				.style("width", d => ( (d.x1 - d.x0) + "px") )
				.style("height", d => ( (d.y1 - d.y0) + "px") );

			
			s
			.filter( d => (d.depth == 2) ) 
			.transition()
			.duration(300)
			.delay( (d,i) => { return d.depth *i; } )
			.style("left", d => ( (d.x0) + "px") )
			.style("top", d => ( (d.y0) + "px") )
			.style("width", d => ( (d.x1 - d.x0) + "px") )
			.style("height", d => ( (d.y1 - d.y0) + "px") );
			//.style("box-shadow", d => ( "0px 0px " + (d.x1 - d.x0)/2 + "px " + (d.x1 - d.x0)/4 + "px rgba(0, 0, 0, 0.25) inset") )
		}

		function updateCell (s) {
			s

			//.style("fill", (d) => { return that.color(d.depth); } )
		}

		this.svg.selectAll(".node").remove();

		this.nodes = this.svg.selectAll(".node")
			.data(this.root.descendants(), d => {
				let r = d.data.name;
				if (d.parent != undefined) { r+=d.parent.data.name; } 
				//console.log(r);
				return r;
			})
			.call(updateNode);

		this.nodes
			.enter()
			.append("div")
			.attr("id", d => {
				//console.log(d);
				let r = d.data.name;
				if (d.parent != undefined) { r+=d.parent.data.name; } 
				return r;
			})
			.attr("class", d => (this.makeSafeForCSS(d.data.name) + (" level-" + d.depth)) )
			.classed("node", true)
			.style("width", "10px" )
			.style("height", "10px" )
			.each( (d) => { })
			.on("mouseover", (d) => {
				// TODO: Implement custom relative Color-Scale
				//console.log(d);
				d4.selectAll(".node").classed("active", false);
				//let currentSize = d.data.size;
				d4.selectAll("." + this.makeSafeForCSS(d.data.name)).classed("active", true);
				//same.style("background-color", d => this.relativeColorScale(d.size, ) )
				//console.log(d.data.name);
			})
			.text(d => d.depth!=0? d.data.name : null)
			.call(updateNode)

			//.append("div")
			//.attr("class", (d) => ("cell level-" + d.depth) )
			//.attr("id", function(d) { console.log(d); return "rect-" + d.id; })
			//.call(updateCell)
/*

			this
				.nodes
				.enter()
				.append("div);

		this.svg.selectAll(".node")
			.append("text")
			.attr("x", 0)
			.attr("y", 0)
			.text( d => { return d.data.name; })
*/
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

	createSelectors () {
		var n = d4.keys(this.nestings);
		
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

	updateData (data) {
		this.data = data;
		this.update();
		return this;
	}

	loadData (dataURL) {
		d4.json(dataURL, (result) => { this.data = result; this.filteredData = this.data; this.update(); } );
		return this;
	}

	filterData( evaluation ) {
		this.filteredData = this.data.filter(evaluation);
		this.update();
		return this;
	}

}