$(document).ready(function() {
var dataset = [];

function addFlight() {
  console.log("Updating dataset");
  return [
    +$("#inputprice").val(),
    +$("#inputtime").val()
  ];
}

const w = 800;
const h = 800;
//Create SVG element
const svg = d3.select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

function update() {
  console.log(dataset)
  // Update selection: Resize and position existing
  // DOM elements with data bound to them.
  // assign a circle to each dataset element
  svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
      return (d[0] - 50) * 4;
    }) // X coordinate: 1st element of each object in the dataset
    .attr("cy", function(d) {
      return h - ((d[1] - 1) * 200);
    }) // Y coordinate: 2nd element of each object in the dataset
    .attr("r", 5) // circle radius
    .attr("fill", "green");

  svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d) {
      return "Airport"; // replace with var returned by inputs
    })
    .attr("x", function(d) {
      return (d[0] - 50) * 4 + 6;
    })
    .attr("y", function(d) {
      return h - ((d[1] - 1) * 200) + 1;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "12px")
    .attr("fill", "blue");
    console.log("SVG updated");
};

$("#newflight").click(function(event) {
  dataset.push(addFlight());
  update();
});
});
