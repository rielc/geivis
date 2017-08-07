// import the modules 

import * as d3 from "./js/d3.js";
import * as GeiVisUtils from './js/GeiVisUtils'

    var diameter = 1000;
    var radius = diameter / 2;
    var margin = 50;

    // Generates a tooltip for a SVG circle element based on its ID
    function addTooltip(circle) {
      var x = parseFloat(circle.attr("cx"));
      var y = parseFloat(circle.attr("cy"));
      var r = parseFloat(circle.attr("r"));
      var text = circle.attr("id");

      var tooltip = d3.select("#plot")
        .append("text")
        .text(text)
        .attr("x", x)
        .attr("y", y)
        .attr("dy", -r * 2)
        .attr("id", "tooltip");

      var offset = tooltip.node().getBBox().width / 2;

      if ((x - offset) < -radius) {
        tooltip.attr("text-anchor", "start");
        tooltip.attr("dx", -r);
      } else if ((x + offset) > (radius)) {
        tooltip.attr("text-anchor", "end");
        tooltip.attr("dx", r);
      } else {
        tooltip.attr("text-anchor", "middle");
        tooltip.attr("dx", 0);
      }
    }

    // Draws an arc diagram for the provided undirected graph
    function drawGraph(data) {

      var graph = GeiVisUtils.generateLinksAndNodes(data);
      
      // create svg image
      var svg = d3.select("body").select("#circle")
        .append("svg")
        .attr("width", diameter)
        .attr("height", diameter);

      // draw border around svg image
      // svg.append("rect")
      //     .attr("class", "outline")
      //     .attr("width", diameter)
      //     .attr("height", diameter);

      // create plot area within svg image
      var plot = svg.append("g")
        .attr("id", "plot")
        .attr("transform", "translate(" + radius + ", " + radius + ")");
        
      // fix graph links to map to objects instead of indices
      graph.links.forEach(function(d, i) {
        d.source = isNaN(d.source) ? d.source : graph.nodes[d.source];
        d.target = isNaN(d.target) ? d.target : graph.nodes[d.target];
      });

      // calculate node positions
      circleLayout(graph.nodes.sort( (a,b) => { return (b.name-a.name); } ));

      drawCurves(graph.links);

      // draw nodes last
      drawNodes(graph.nodes);
      // draw edges first
      //drawLinks(graph.links);
    }

    // Calculates node locations
    function circleLayout(nodes) {

      // use to scale node index to theta value
      var scale = d3.scale.linear()
        .domain([0, nodes.length])
        .range([0, 2 * Math.PI]);

      // calculate theta for each node
      nodes.forEach( function(d, i) {
        // calculate polar coordinates
        var theta = scale(i);
        var radial = radius - margin;

        // convert to cartesian coordinates
        d.x = radial * Math.sin(theta);
        d.y = radial * Math.cos(theta);
      });
    }

    // Draws nodes with tooltips
    function drawNodes(nodes) {
      // used to assign nodes color by group
      var color = d3.scale.category20();

      d3.select("#plot").selectAll(".node")
        .data(nodes)
        .enter()
        .append("circle")
        .classed("node", true)
        .attr("id", function(d, i) {
          return d.name;
        })
        .attr("cx", function(d, i) {
          return d.x;
        })
        .attr("cy", function(d, i) {
          return d.y;
        })
        .attr("r", 3)
        .on("mouseover", function(d, i) {
          console.log(d);

          //console.log(d);
          addTooltip(d3.select(this));
          d3.selectAll(".link").classed("active", false);
          d3.selectAll(".from-" + GeiVisUtils.makeSafeForCSS( d.name ) ).classed("active", true);
          d3.selectAll(".to-" + GeiVisUtils.makeSafeForCSS( d.name ) ).classed("active", true);

          console.log( ".from-" + GeiVisUtils.makeSafeForCSS( d.name ) );
        })
        .on("mouseout", function(d, i) {
          d3.select("#tooltip").remove();
        });
    }


    // Draws curved edges between nodes
    function drawCurves(links) {
      // remember this from tree example?

      //var m = d3.max(links, d => d.strength);
      //var m = d3.max(links, d => d.strength);
      //var c = d3.scale.linear().domain([0, m]).range(["#fff", "#000"]);
      //console.log(c);

      d3.select("#plot").selectAll(".link")
        .data(links)
        .enter()
        .append("path")
        .attr("class", d => {
          var classString = "link ";
          classString += "from-"+GeiVisUtils.makeSafeForCSS(d.source.name) + " ";
          classString += "to-"+GeiVisUtils.makeSafeForCSS( d.target.name) + " ";
          return classString;
        })
        //.style("stroke", d => c(d.strength) )
        .attr("d", function(d){
          var lineData = [
          {
            x: Math.round(d.target.x),
            y: Math.round(d.target.y)
          }, {
          x: Math.round(d.target.x) - Math.round(d.target.x)/2,
            y: Math.round(d.target.y) - Math.round(d.target.y)/2
          }, 
          {
          x: Math.round(d.source.x) - Math.round(d.source.x)/2,
            y: Math.round(d.source.y) - Math.round(d.source.y)/2
          },{
            x: Math.round(d.source.x),
            y: Math.round(d.source.y)
          }];
          return `M${lineData[0].x},${lineData[0].y}C${lineData[1].x},${lineData[1].y},${lineData[2].x},${lineData[2].y},${lineData[3].x},${lineData[3].y} `;
        });    }

    d3.json("../data/better-data.json", drawGraph);