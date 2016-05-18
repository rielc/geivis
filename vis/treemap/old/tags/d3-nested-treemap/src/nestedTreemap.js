export default function() {
  return 42;
};


export function updateTreemap (level) {
  nested = d3
      .nest()
      //.key(function (d) { return d.year; })
      .key(function (d) { return (d.schooltype==undefined) ? "no schooltype" : d.schooltype; })
      .key(function (d) { return (d.publisher_city==undefined) ? "no location" : d.publisher_city; })
      //.key(function (d) { return (d.schoollevel==undefined) ? "no schoollevel" : d.schoollevel; })
      //.key(function (d) { return (d.subject==undefined) ? "no Subject" : d.subject; })
      .rollup( function (leaves) { return {"size" : leaves.length } ; } )
      .entries(books);

    // from values and keys to children and name
    nested = JSON.parse( JSON.stringify(nested).replace(/"key":/gi, '"name":').replace(/"values":/gi, '"children":') );


    // get the size of each cell
    nested.forEach( function (major) {
      var majorSize = 0;
      major.children.forEach( function(minor) {
        //majorSize += minor.children.size;
        minor.size = minor.children.size;
        delete(minor.children);
      });
      major.size = majorSize;
    });

    root = d3
      .hierarchy({
          "name" : "root", 
          "children" : nested, 
          "size" : 0
      }, function(d) { return d.children; })
      .sum(function(d) { return d.size; })
      .sort(function(a, b) { return b.height - a.height || b.data.size - a.data.value; });

    treemap(root);

    var cell = svg
      .selectAll(".node")
      .data(root.descendants())
      .enter()
        .append("g")
        .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; })
        .attr("class", "node")
        .each(function(d) { d.node = this; })
        .on("mouseover", hovered(true))
        .on("mouseout", hovered(false));

    cell.append("rect")
        .attr("id", function(d) { return "rect-" + d.id; })
        .attr("width", function(d) { return d.x1 - d.x0; })
        .attr("height", function(d) { return d.y1 - d.y0; })
        .style("fill", function(d) { return color(d.depth); });

    cell.append("clipPath")
        .attr("id", function(d) { return "clip-" + d.id; })
      .append("use")
        .attr("xlink:href", function(d) { return "#rect-" + d.id + ""; });

    var label = cell.append("text")
        .attr("clip-path", function(d) { return "url(#clip-" + d.id + ")"; });

    label
      .filter(function(d) { return d.children; })
      .selectAll("tspan")
        .data(function(d) {
          return d.data.name;
          /*.id.substring(d.id.lastIndexOf(".") + 1).split(/(?=[A-Z][^A-Z])/g).concat("\xa0" + format(d.value));  */
        })
      .enter().append("tspan")
        .attr("x", function(d, i) { return i ? null : 4; })
        .attr("y", 13)
        .text(function(d) { return d; });

    label
      .filter(function(d) { return !d.children; })
      .selectAll("tspan")
      .data(function(d) { return d.data.name; })
      .enter().append("tspan")
        .attr("x", function(d, i) { return i ? null : 4; })
        .attr("y", 13)
        .text(function(d) { return d; });

    cell.append("title")
        .text(function(d) { return d.id + "\n" + format(d.value); });

}