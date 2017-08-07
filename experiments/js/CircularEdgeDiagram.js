import * as d3 from "./d3.js";
import * as GeiVisUtils from './GeiVisUtils'

export default class CircularEdgeDiagram {

	constructor(properties) {
		this.properties = properties;
		this.setDiameter(this.properties.diameter);
		this.setInnerRadius(properties.innerRadius);
		return this;
	}

	setDiameter(diameter) {
		this.diameter = diameter;
		this.radius = diameter / 2;
		return this;
	}

	setInnerRadius (innerRadius) {
		this.innerRadius = innerRadius;
		return this;
	}

	setParent (parentSelector) {

		this.cluster = d3.layout.cluster()
		    .size([360, this.innerRadius])
		    .sort(null)
		    .value(d => d.size);

		this.bundle = d3.layout.bundle();

		this.line = d3.svg.line.radial()
		    .interpolate("bundle")
		    .tension(.85)
		    .radius(d => d.y)
		    .angle(d => (d.x / 180 * Math.PI) );

		this.svg = d3.select(parentSelector)
			.append("svg")
	    	.attr("width", this.diameter)
	    	.attr("height", this.diameter)
	  		.append("g")
	    	.attr("transform", "translate(" + this.radius + "," + this.radius + ")");

		this.link = this.svg.append("g").selectAll(".link"),
	    this.node = this.svg.append("g").selectAll(".node");

		return this;
	}


	setData (data) {


		function mouseoverEvent(d) {


			console.log("over");

			/*
		  this.node
		      .each(function(n) { n.target = n.source = false; });
		  link
		      .classed("link--target", function(l) { if (l.target === d) return l.source.source = true; })
		      .classed("link--source", function(l) { if (l.source === d) return l.target.target = true; })
		    .filter(function(l) { return l.target === d || l.source === d; })
		      .each(function() { this.parentNode.appendChild(this); });

		  node
		      .classed("node--target", function(n) { return n.target; })
		      .classed("node--source", function(n) { return n.source; });

			*/
		}

		function mouseoutEvent(d) {

		console.log("out");

		/*

		link
		.classed("link--target", false)
		.classed("link--source", false);

		node
		.classed("node--target", false)
		.classed("node--source", false);
		*/
		}


		//console.log(data);

		//console.log(data.links);

		//console.log(this.bundle);

		console.log(this.bundle( data.links));

		//this.nodes = cluster.nodes(packageHierarchy(classes)),
    	//this.links = packageImports(nodes);

		this.link = this.link
			.data( this.bundle( data.links) )
			.enter()
			.append("path")
			//.each( d => { d.source = d[0], d.target = d[d.length - 1]; })
			.attr("class", "link")
			.attr("d", this.line);

		this.node = this.node
			.data( data.nodes )
			.enter().append("text")
			.attr("class", "node")
			.attr("dy", ".31em")
			.attr("transform", d => "rotate(" + (d.x - 90) + ")translate(" + (d.y + 8) + ",0)" + (d.x < 180 ? "" : "rotate(180)") )
			.style("text-anchor", d => (d.x < 180) ? "start" : "end" )
			.text( d => d.key )
			.on("mouseover", this.mouseoverEvent)
			.on("mouseout", this.mouseoutEvent);
	}

//d3.select(self.frameElement).style("height", diameter + "px");
/*
// Lazily construct the package hierarchy from class names.
function packageHierarchy(classes) {
  var map = {};

  function find(name, data) {
    var node = map[name], i;
    if (!node) {
      node = map[name] = data || {name: name, children: []};
      if (name.length) {
        node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
        node.parent.children.push(node);
        node.key = name.substring(i + 1);
      }
    }
    return node;
  }

  classes.forEach(function(d) {
    find(d.name, d);
  });

  return map[""];
}

// Return a list of imports for the given array of nodes.
function packageImports(nodes) {
  var map = {},
      imports = [];

  // Compute a map from name to node.
  nodes.forEach(function(d) {
    map[d.name] = d;
  });

  // For each import, construct a link from the source to target node.
  nodes.forEach(function(d) {
    if (d.imports) d.imports.forEach(function(i) {
      imports.push({source: map[d.name], target: map[i]});
    });
  });

  return imports;
}

*/




}