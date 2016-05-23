import * as d4 from "./d4.js";

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
	}



	setState(state, db) {
		this.state = state;
		this.db = db;
    	this.state.listen(this.stateChange.bind(this));
	}


	stateChange(next, last){
    	// if(next.brushStart !== last.brushStart){
    	//   this.render();
    	// }
    	//console.log();
    	//console.log(this.db);

    	// i know that i could use crossfilter … but im very lazy!

    	this.filterData( 
    		function (e) { 
    			return ( e.year >= next.brushStart.getFullYear() && e.year <= next.brushEnd.getFullYear() ); 
			}
		);
    	this.update();
    	// console.log(next.brushStart, last.brushStart);
  }

	init(containerSelector) {
		
		this.container = d4.select(containerSelector);
	    this.createSelectors();

		this.svg = this.container
			.append("svg")
			.attr("id", "treemap-visualization")
			.attr("width", window.innerWidth)
			.attr("height", window.innerHeight);

	    this.width = +this.svg.attr("width"),
	    this.height = +this.svg.attr("height");
		this.format = d4.format(",d");
		this.color = d4.scaleMagma().domain([-1, 4]);

		this.treemap = d4.treemap()
			.size([this.width, this.height])
			.paddingOuter(5)
			.paddingTop(20)
			.paddingInner(1)
			.round(true);


		return this;
	}


	setLevelA (string) { this.levelA = string; return this; }
	setLevelB (string) { this.levelB = string; return this; }

	update() {

		this.nested = d4.nest()
			.key( this.nestings[this.levelA] )
			.key( this.nestings[this.levelB] )
			.rollup( (leaves) => { return {"size" : leaves.length } ; } )
			.entries( this.filteredData );

		// from values and keys to children and name
		this.nested = JSON.parse( JSON.stringify(this.nested).replace(/"key":/gi, '"name":').replace(/"values":/gi, '"children":') );

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

		this.root = d4
			.hierarchy(
				{
					"name" : "root", 
					"children" : this.nested, 
					"size" : 0
				}, (d) => { return d.children; }
			)
			.sum( (d) => { return d.size; })
			.sort( (a, b) => { return b.height - a.height || b.data.size - a.data.value; });

		this.treemap(this.root);

		let that = this;

		function updateNode (s) {
			s.attr("transform", (d) => { return "translate(" + d.x0 + "," + d.y0 + ")"; })
		}

		function updateCell (s) {
			s
			.attr("width", (d) => { return d.x1 - d.x0; } )
			.attr("height", (d) => { return d.y1 - d.y0; } )
			//.style("fill", (d) => { return that.color(d.depth); } )
		}

		this.svg.selectAll(".node").remove();

		this.nodes = this.svg.selectAll(".node").data(this.root.descendants());

		this.nodes.call(updateNode)

		this.nodes
			.enter()
			.append("g")
			.classed("node", true)
			//.attr("id", function(d) { return "rect-" + d.data.name; })
			.each( (d) => { d.node = this; })
			.on("mouseover", (d) => { console.log(d.data.name); })
			.call(updateNode)
			.append("rect")
			.attr("class", (d) => ("cell level-" + d.depth) )
			//.attr("id", function(d) { console.log(d); return "rect-" + d.id; })
			.call(updateCell)

		this.svg.selectAll(".node")
			.append("text")
			.attr("x", 0)
			.attr("y", 0)
			.text( d => { return d.data.name; })

		this.nodes
			.exit()
			.remove();

		return this;

  }


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
			.attr("value", (d) => { return d; })
			.text( (d) => { return d; });
		this.dropdownB
			.selectAll("option")
			.data(n)
			.enter()
			.append("option")
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