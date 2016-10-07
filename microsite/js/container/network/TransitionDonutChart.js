export let __hotReload = true;

import * as GeiVisUtils from "../../lib/GeiVisUtils.js";

export class TransitionDonutChart {

  constructor (props) {

    this.props = props
    this.arcHover

    this.innerRadius = this.props.innerRadius
    this.outerRadius = this.props.outerRadius
    
    this.width = this.outerRadius*2
    this.height = this.outerRadius*2

    this.color = d3.scaleOrdinal(d3.schemeCategory20c)

    // the layout generator
    this.pie = d3.pie()
      .value( (d) => { return d.values.length; } )
      .sort(null)

    // the path-generator
    this.arc = d3.arc()
      .outerRadius(this.innerRadius)
      .innerRadius(this.outerRadius)
      .padAngle(0.03)

    // the container
    this.container = this.props.container
      .attr("width", this.width)
      .attr("height", this.height)
      .append("g")
      .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")")

    // the selector for the donut paths
    this.path = this.container.selectAll("path")

    return this
  }


  updateData (data) {

    this.data = data
    this.arcData = this.pie(this.data)
    this.render()
    return this
  }

  show() {
    this.container.classed('hidden', false)
  } 

  hide () {
    this.container.classed('hidden', true)
  }

  setArcHover (cb) { this.arcHover = cb }

  render () {


    this.container.selectAll("path").remove();

    this.path = this.container.selectAll("path")

    this.path.data(this.arcData)
      .enter()
      .append("path")
      .style("stroke", "none")
      .style("fill", d => this.color(d.data.key) )
      // .each( (d, i) => { this._current = findNeighborArc(i, data0, data1, key) || d; })
      .attr("d", (d) => { return this.arc(d); } )
      .on("mouseover", this.arcHover )
      //.attr("fill", (d) => { return this.color(d.data.region); } )


    // this.path.exit()
    //   .datum( (d, i) => { return findNeighborArc(i, data1, data0, key) || d; })
    //   .transition()
    //   .duration(750)
    //   .attrTween("d", arcTween)
    //   .remove()

    // this.path.transition()
    //     .duration(750)
    //     .attrTween("d", arcTween)

    return this
  }


  change () {

    let arcData0 = path.data()
    let arcData1 = this.pie(this.data)
    this.path = this.path.data(arcData1);


  }

}


/*



var width = 960,
    height = 500,
    radius = Math.min(width, height) / 2;

var color = d3.scale.category20();

var pie = d3.layout.pie()
    .value(function(d) { return d.count; })
    .sort(null);

var arc = d3.svg.arc()
    .innerRadius(radius - 100)
    .outerRadius(radius - 20);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var path = svg.selectAll("path");

d3.tsv("data.tsv", type, function(error, data) {
  var regionsByFruit = d3.nest()
      .key(function(d) { return d.fruit; })
      .entries(data)
      .reverse();

  var label = d3.select("form").selectAll("label")
      .data(regionsByFruit)
    .enter().append("label");

  label.append("input")
      .attr("type", "radio")
      .attr("name", "fruit")
      .attr("value", function(d) { return d.key; })
      .on("change", change)
    .filter(function(d, i) { return !i; })
      .each(change)
      .property("checked", true);

  label.append("span")
      .text(function(d) { return d.key; });

  function change(region) {
    var data0 = path.data(),
        data1 = pie(region.values);

    path = path.data(data1, key);

    path.enter().append("path")
        .each(function(d, i) { this._current = findNeighborArc(i, data0, data1, key) || d; })
        .attr("fill", function(d) { return color(d.data.region); })
      .append("title")
        .text(function(d) { return d.data.region; });

    path.exit()
        .datum(function(d, i) { return findNeighborArc(i, data1, data0, key) || d; })
      .transition()
        .duration(750)
        .attrTween("d", arcTween)
        .remove();

    path.transition()
        .duration(750)
        .attrTween("d", arcTween);
  }
});

function key(d) {
  return d.data.region;
}

function type(d) {
  d.count = +d.count;
  return d;
}

function findNeighborArc(i, data0, data1, key) {
  var d;
  return (d = findPreceding(i, data0, data1, key)) ? {startAngle: d.endAngle, endAngle: d.endAngle}
      : (d = findFollowing(i, data0, data1, key)) ? {startAngle: d.startAngle, endAngle: d.startAngle}
      : null;
}

// Find the element in data0 that joins the highest preceding element in data1.
function findPreceding(i, data0, data1, key) {
  var m = data0.length;
  while (--i >= 0) {
    var k = key(data1[i]);
    for (var j = 0; j < m; ++j) {
      if (key(data0[j]) === k) return data0[j];
    }
  }
}

// Find the element in data0 that joins the lowest following element in data1.
function findFollowing(i, data0, data1, key) {
  var n = data1.length, m = data0.length;
  while (++i < n) {
    var k = key(data1[i]);
    for (var j = 0; j < m; ++j) {
      if (key(data0[j]) === k) return data0[j];
    }
  }
}

function arcTween(d) {
  var i = d3.interpolate(this._current, d);
  this._current = i(0);
  return function(t) { return arc(i(t)); };
}


*/