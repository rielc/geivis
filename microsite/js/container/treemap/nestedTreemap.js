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
  	}


	appendTo(selector) {
		
		this.container = d3.select(selector);
	    this.createDropdowns();

	    this.width = parseInt( this.container.style("width") ) - this.properties.margin.left - this.properties.margin.right,
	    this.height = parseInt( this.container.style("height") ) - this.properties.margin.top - this.properties.margin.bottom;

		this.svg = this.container
			.append("div")
			.attr("class", "visualization")
			.style("width", this.width )
			.style("height", this.height );

		this.format = d3.format(",d");

		this.hierarchy = d3.hierarchy()
			.sum( d => d.size )
			.sort( (a, b) => { return Math.max(0, a.dx - 1) - Math.max(0, b.dx - 1) || a.value - b.value; } );

		this.treemap = d3.treemap()
			.size([this.width, this.height])
			.tile("slice-dice")
			.round(false)
			.padding( (d) => {
				switch(d.depth) {
					case 0: return [0, 0, 0, 0];
					case 1: return [30, 0, 0, 0];
					case 2: return [0 , 0, 0, 0];
				}
			} );


		return this;
	}


	setLevelA (string) { this.levelA = string; return this; }
	setLevelB (string) { this.levelB = string; return this; }


	relativeColorScale (initial, value) {
		d3.scaleLinear.domain([-1.0, 0.0, 1.0]).range(["#ff0000, #cccccc", "#00ff00"]);
	}


	update() {

		let nesting = d3.nest(); 

		// if both nestings are of same value, just use the first
		if (this.levelA != this.levelB) {
			nesting.key( this.nestings[this.levelA] ).key( this.nestings[this.levelB] )
		} else {
			nesting.key( this.nestings[this.levelA] )
		}

		// do the nesting and then remap the values
		this.nested = nesting.entries( this.filteredData );
		this.nested = GeiVisUtils.remap({"key": "All Books", "values" : this.nested });


		//var threshold = 5;

		// TODO: Use a histogram to generate the "other" bin in Treemap
		// Generate a histogram using twenty uniformly-spaced bins.
		// var hist = d3.layout.histogram()
		//     .bins(10)
		//     .value(d => d.size)
		//     (this.nested);


		this.treemap(this.root);

		let that = this;

		function updateNode (s) {

			// position the text in the middle of all first levels
			s.filter( d => (d.depth == 1)).style("padding-top", "10px");

			s
				.filter( d => (d.depth != 1 || d.depth != 2) )
				.style("left", (d) => { return (that.properties.margin.left + d.x) + "px"; })
				.style("top", (d) =>{ return (that.properties.margin.top + d.y) + "px"; })
				.style("width", (d) => { return Math.max(0, d.dx - 1) + "px"; })
				.style("height", (d) => { return Math.max(0, d.dy - 1) + "px"; });
			
			s
			.filter( d => (d.depth == 2) )
			.style("padding-top", d => (Math.max(0, d.dy - 1)/2 - 5) + "px" )
			// .sort( (a,b) => { return ((a.x)+Math.max(0, a.dy - 1)) - ((b.x)+Math.max(0, b.dy - 1)) })
			// .style("width", "0px")
			// .style("height", (d) => { return Math.max(0, d.dy - 1) + "px"; })
			// .transition()
			// .duration(300)
			// .delay( (d,i) => { return i*1.5; } )
			.style("left", (d) => { return (that.properties.margin.left + d.x) + "px"; })
			.style("top", (d) =>{ return (that.properties.margin.top + d.y) + "px"; })
			.style("width", (d) => { return Math.max(0, d.dx - 1) + "px"; })
			.style("height", (d) => { return Math.max(0, d.dy - 1) + "px"; })
			.each(function (d) { 
				let el = d3.select(this);
				let overflow = checkOverflow(el[0][0], 10, 2);
				if (overflow) { el.classed("label", true); }
			});

			// position the text in the middle of all 2nd levels
			s.filter( d => (d.depth == 2)).style("padding-top", d => (Math.max(0, d.dy - 1)/2 - 5) + "px" );

		}
		
		let data = this.treemap(this.nested).filter(f => f.depth < 3);

		this.svg.selectAll(".node").remove();

		this.nodes = this.svg.selectAll(".node")
			.data(data, d => {
				let r = d.name;
				if (d.parent != undefined) { r+=d.parent.name; } 
				return r;
			})
			.call(updateNode);

		this.nodes
			.enter()
			.append("div")
			.attr("id", d => {
				let r = d.name;
				if (d.parent != undefined) { r+=d.parent.name; } 
				return r;
			})
			.attr("class", d => (makeSafeForCSS(d.name) + (" level-" + d.depth)) )
			.classed("node", true)
			.on("mouseover", function (d) {
				// TODO: Implement custom relative Color-Scale
				d3.selectAll(".node").classed("active", false);
				d3.selectAll("." + makeSafeForCSS(d.name)).classed("active", true);
			})
			.text(d => d.depth!=0? d.name : null)
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

	updateData (data) {
		this.data = data;
		this.update();
		return this;
	}

	loadData (dataURL) {
		d3.json(dataURL, (result) => { this.data = result; this.filteredData = this.data; this.update(); } );
		return this;
	}

	filterData( evaluation ) {
		this.filteredData = this.data.filter(evaluation);
		this.update();
		return this;
	}

}