$(document).ready(function() {
  /* var dataset = [
    [pricevalue, timevalue]
  ]; */
  var dataset = [
    [20, 20] // replace with var returned by inputs (above)
  ];
  var w = 600;
  var h = 600;
  //Create SVG element
  var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);
  // assign a circle to each dataset element
  svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
      return d[0];
    }) // consider X coordinate: 1st element of each object in the dataset
    .attr("cy", function(d) {
      return d[1];
    }) // consider Y coordinate: 2nd element of each object in the dataset
    .attr("r", 5); // circle radius
  .attr("fill", "green");

  svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d) {
      return "Airport"; // replace with var returned by inputs
    })
    .attr("x", function(d) {
      return d[0] + 4;
    })
    .attr("y", function(d) {
      return d[1] + 1;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "12px")
    .attr("fill", "blue");

});
