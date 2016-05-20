export default class NestedTreemap {

	constructor() {
	 	this.container = {};
		this.svg = {};
		this.root = {};
		this.data;
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
	}

	init(containerSelector) {
		
		this.container = d3.select(containerSelector);
	    this.createSelectors();

		this.svg = this.container
			.append("svg")
			.attr("id", "treemap-visualization")
			.attr("width", window.innerWidth)
			.attr("height", window.innerHeight);

	    this.width = +this.svg.attr("width"),
	    this.height = +this.svg.attr("height");
		this.format = d3.format(",d");
		this.color = d3.scaleMagma().domain([-1, 4]);

		this.treemap = d3.treemap()
			.size([this.width, this.height])
			.paddingOuter(10)
			.paddingTop(30)
			.paddingInner(5)
			.round(false);
	}


	setLevelA (string) { this.levelA = string; }
	setLevelB (string) { this.levelB = string; }

	update() {

		this.nested = d3.nest()
			.key( this.nestings[this.levelA] )
			.key( this.nestings[this.levelB] )
			.rollup( (leaves) => { return {"size" : leaves.length } ; } )
			.entries( this.data );

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

		this.root = d3
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
			//console.log(s);
			s.attr("transform", (d) => { return "translate(" + d.x0 + "," + d.y0 + ")"; })
		}

		function updateCell (s) {
			s
			.attr("width", (d) => { return d.x1 - d.x0; } )
			.attr("height", (d) => { return d.y1 - d.y0; } )
			.style("fill", (d) => { return that.color(d.depth); } )
		}

		this.svg.selectAll(".node").remove();

		this.nodes = this.svg.selectAll(".node");

		this.nodes
			.data(this.root.descendants())
			.call(updateNode);

		this.nodes
			.data(this.root.descendants())
			.enter().append("g")
			.classed("node", true)
			//.attr("id", function(d) { return "rect-" + d.data.name; })
			.each( (d) => { d.node = this; })
			.on("mouseover", (d) => { console.log(d.data.name); })
			.call(updateNode)
			//.select("rect")
			//.data(function (d) { console.log(d); })
			.append("rect")
			//.attr("id", function(d) { console.log(d); return "rect-" + d.id; })
			.call(updateCell);

		this.nodes
			.data(this.root.descendants())
			.exit()
			.remove();

		
		//cells.append("clipPath")
		//.attr("id", function(d) { return "clip-" + d.id; })
		//.append("use")
		//.attr("xlink:href", function(d) { return "#rect-" + d.id + ""; });
		
		
		
		// var label = nodes
		// .append("text")
		// .attr("clip-path", function(d) { return "url(#clip-" + d.id + ")"; });

		// label = nodes
		// 	.selectAll("text")
		// 	.data(function(d) {
		// 		return d.data.name;
		// 		//.id.substring(d.id.lastIndexOf(".") + 1).split(/(?=[A-Z][^A-Z])/g).concat("\xa0" + format(d.value));
		// 	})
		// 	.enter().append("text")
		// 	.attr("x", (d, i) => { return i ? null : 4; })
		// 	.attr("y", 13)
		// 	.text( d => { return d; });

		//nodes.append("title").text(function(d) { return d.id + "\n" + format(d.value); });
		

  }


	createSelectors () {
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
			.attr("value", (d) => { return d; })
			.text( (d) => { return d; });
		this.dropdownB
			.selectAll("option")
			.data(n)
			.enter()
			.append("option")
			.attr("value", (d) => { return d; })
			.text( (d) => { return d; });
	}


	addNesting (name, f) { this.nestings[name] = f; }

	loadData (dataURL) {
		d3.json(dataURL, (result) => { this.data = result; this.update(); } );
	}

}