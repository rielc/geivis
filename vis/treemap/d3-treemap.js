'use strict';

var nestedTreemap = function () {

	var container = {};
	var svg = {};
	var root = {};
	var data;
	var treemap = {};
	var nested = {};
	var nestings = {};
	var url = {};
	var width = {};
	var height = {};
	var dropdownA = {};
	var dropdownB = {};
	var levelA = "";
	var levelB = "";
	var format;
	var color;

	var init = function init(containerSelector) {

		container = d3.select(containerSelector);
		createSelectors();

		svg = container.append("svg").attr("id", "treemap-visualization").attr("width", window.innerWidth).attr("height", window.innerHeight);

		width = +svg.attr("width"), height = +svg.attr("height");
		format = d3.format(",d");
		color = d3.scaleMagma().domain([-1, 4]);

		treemap = d3.treemap().size([width, height]).paddingOuter(3).paddingTop(15).paddingInner(3).round(false);
	};

	var setLevelA = function setLevelA(string) {
		return levelA = string;
	};
	var setLevelB = function setLevelB(string) {
		return levelB = string;
	};

	var update = function update() {

		nested = d3.nest().key(nestings[levelA]).key(nestings[levelB]).rollup(function (leaves) {
			return { "size": leaves.length };
		}).entries(data);

		// from values and keys to children and name
		nested = JSON.parse(JSON.stringify(nested).replace(/"key":/gi, '"name":').replace(/"values":/gi, '"children":'));

		// get the size of each cell
		nested.forEach(function (major) {
			var majorSize = 0;
			major.children.forEach(function (minor) {
				//majorSize += minor.children.size;
				minor.size = minor.children.size;
				delete minor.children;
			});
			major.size = majorSize;
		});

		//console.log(nested);

		root = d3.hierarchy({
			"name": "root",
			"children": nested,
			"size": 0
		}, function (d) {
			return d.children;
		}).sum(function (d) {
			return d.size;
		}).sort(function (a, b) {
			return b.height - a.height || b.data.size - a.data.value;
		});

		treemap(root);

		function updateNode(s) {
			//console.log(s);
			s.attr("transform", function (d) {
				return "translate(" + d.x0 + "," + d.y0 + ")";
			});
		}

		function updateCell(s) {
			//console.log(s);
			s.attr("width", function (d) {
				return d.x1 - d.x0;
			}).attr("height", function (d) {
				return d.y1 - d.y0;
			}).style("fill", function (d) {
				return color(d.depth);
			});
		}

		svg.selectAll(".node").remove();

		var nodes = svg.selectAll(".node");

		nodes.data(root.descendants()).call(updateNode);

		nodes.data(root.descendants()).enter().append("g").classed("node", true)
		//.attr("id", function(d) { return "rect-" + d.data.name; })
		.each(function (d) {
			d.node = this;
		}).on("mouseover", function (d) {
			console.log(d.data.name);
		}).call(updateNode)
		//.select("rect")
		//.data(function (d) { console.log(d); })
		.append("rect")
		//.attr("id", function(d) { console.log(d); return "rect-" + d.id; })
		.call(updateCell);

		nodes.data(root.descendants()).exit().remove();

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
	};

	var createSelectors = function createSelectors() {
		var n = d3.keys(nestings);

		dropdownA = container.append("select").attr("id", "dropdown-a");
		dropdownB = container.append("select").attr("id", "dropdown-b");
		dropdownA.on("change", function () {
			levelA = d3.select(this).property("value");update();
		});
		dropdownB.on("change", function () {
			levelB = d3.select(this).property("value");update();
		});

		dropdownA.selectAll("option").data(n).enter().append("option").attr("value", function (d) {
			return d;
		}).text(function (d) {
			return d;
		});

		dropdownB.selectAll("option").data(n).enter().append("option").attr("value", function (d) {
			return d;
		}).text(function (d) {
			return d;
		});
	};

	var addNesting = function addNesting(name, f) {
		nestings[name] = f;
	};

	var loadData = function loadData(dataURL) {
		d3.json(dataURL, function (result) {
			data = result;
			update();
		});
	};

	return {
		levelA: levelA,
		levelB: levelB,
		nested: nested,
		nestings: nestings,

		init: init,
		update: update,
		loadData: loadData,
		createSelectors: createSelectors,

		addNesting: addNesting,
		setLevelA: setLevelA,
		setLevelB: setLevelB
	};
}();

console.log(nestedTreemap);

// define the initial nesting values
nestedTreemap.setLevelA("Schultyp");
nestedTreemap.setLevelB("Schullevel");

// add the nestings and accessor functions
nestedTreemap.addNesting("Schulfach", function (d) {
  return d.subject == undefined ? "Schulfach unbekannt" : d.subject;
});
nestedTreemap.addNesting("Schultyp", function levelA(d) {
  return d.schooltype == undefined ? "Schultyp unbekannt" : d.schooltype;
});
nestedTreemap.addNesting("Schullevel", function (d) {
  return d.schoollevel == undefined ? "Schullevel unbekannt" : d.schoollevel;
});
nestedTreemap.addNesting("Ort", function (d) {
  return d.publisher_city == undefined ? "Ort unbekannt" : d.publisher_city;
});
nestedTreemap.addNesting("Verlag", function (d) {
  return d.publisher == undefined ? "Verlag unbekannt" : d.publisher;
});

// initialize with the selector of the parent element
nestedTreemap.init("#treemap");

// load the data
nestedTreemap.loadData("../../data/better-data.json");
//# sourceMappingURL=d3-treemap.js.map