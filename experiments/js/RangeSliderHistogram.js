import * as d4 from "./d4.js";
import * as d3 from "./d3.js";

export default class RangeSlider {

	constructor( properties ) {
		this.properties = properties;
	}

	setParent( selector ) {

		let asd = parseInt( selector.style("width") );

	    this.properties.width = parseInt( selector.style("width") ) - this.properties.margin.left - this.properties.margin.right,
	    this.properties.height = parseInt( selector.style("height") ) - this.properties.margin.top - this.properties.margin.bottom;

		this.svg = selector.append("svg")
			.attr("width", this.properties.width + this.properties.margin.left + this.properties.margin.right)
			.attr("height", this.properties.height + this.properties.margin.top + this.properties.margin.bottom)
			.append("g")
    		.attr("transform", "translate(" + this.properties.margin.left + "," + this.properties.margin.top + ")");

		this.svg.append("rect")
		    .attr("class", "grid-background")
		    .attr("width", this.properties.width)
		    .attr("height", this.properties.height);

		return this;

	}


	setScale () {

		this.x = d3.scale.linear().domain([0, 10]).range([0, this.properties.width]);

		let c = d3.svg.axis().scale(this.x).orient("bottom").ticks(d3.time.hours, 12).tickSize(-this.properties.height).tickFormat("");

		this.brush = d3.svg.brush().x(this.x).extent([0, this.properties.width]).on("brush", this.brushed);

		this.svg.append("g")
		    .attr("class", "x grid")
		    .attr("transform", "translate(0," + this.properties.height + ")")
		    .call( c )
		 	.selectAll(".tick");
		    //.classed("minor", function(d) { return d.getHours(); });

		this.gBrush = this.svg.append("g")
			.attr("class", "brush")
	    	.call(this.brush);

		this.gBrush.selectAll("rect")
			.attr("height", this.properties.height);

    }

	setBrushEvent (event) { this.brush.on("brush", () => { event( this.brush.extent() ); }); }

}