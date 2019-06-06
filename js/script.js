var dataset = [{price: 200, time: 3},
              {price: 150, time: 4},
              {price: 110, time: 3.5}];

$(document).ready(function onReady() {
  // x: Price
  // y: Time
  const w = 800;
  const h = 500;
  const radius = 5;
  const pixelmargin = 20;
  var margin = {left:50,right:50,top:40,bottom:0};
  var y = d3.scaleLinear()
               .domain([1,d3.max(dataset,d => d.time)])
               .range([h-pixelmargin,pixelmargin]);
  var x = d3.scaleLinear()
               .domain([50,d3.max(dataset,d => d.price)])
               .range([pixelmargin,w-3*pixelmargin]);

  var yAxis = d3.axisLeft(y).ticks(3).tickPadding(10).tickSize(10);
  var xAxis = d3.axisBottom(x).ticks(3).tickPadding(10).tickSize(10);

  function addFlight() {
    console.log("Updating dataset");
    return {
      price: +$("#inputprice").val(),
      time: +$("#inputtime").val()
    };
  }

  //Create SVG element
  const svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);
  var chartGroup = svg.append("g").attr("transform","translate("+margin.left+","+(-2*pixelmargin)+")");
  var dataGroup = chartGroup.append("g")
  var axesGroup = chartGroup.append("g")

  var xd3axis= axesGroup.append("g").attr("class","axis x")

  function update() {
    var y = d3.scaleLinear()
                 .domain([1,d3.max(dataset,d => d.time)])
                 .range([h-pixelmargin,pixelmargin]);
    var x = d3.scaleLinear()
                 .domain([50,d3.max(dataset,d => d.price)])
                 .range([pixelmargin,w-3*pixelmargin]);

    var yAxis = d3.axisLeft(y).ticks(3).tickPadding(10).tickSize(10);
    var xAxis = d3.axisBottom(x).ticks(3).tickPadding(10).tickSize(10);
    console.log(dataset)
    // Update selection: Resize and position existing
    // DOM elements with data bound to them.
    // assign a circle to each dataset element
    circles=dataGroup.selectAll("circle")
      .data(dataset)
    circles.enter()
      .append("circle")
      .attr("cx", function(d) {
        return x(d.price) //(d.price - 50) * 4;
      }) // X coordinate: 1st element of each object in the dataset
      .attr("cy", function(d) {
        return y(d.time);
      }) // Y coordinate: 2nd element of each object in the dataset
      .attr("r", radius) // circle radius
      .attr("fill", "green");

    //update all circles to new positions
    circles.transition()
        .duration(500)
        .attr("cx", function(d) {
          return x(d.price) //(d.price - 50) * 4;
        }) // X coordinate: 1st element of each object in the dataset
        .attr("cy", function(d) {
          return y(d.time);
        }) // Y coordinate: 2nd element of each object in the dataset

    dataGroup.selectAll("text")
      .data(dataset)
      .enter()
      .append("text")
      .text(function(d) {
        return "Airport"; // replace with var returned by inputs
      })
      .attr("x", function(d) {
        return x(d.price) + radius + 1//(d.price - 50) * 4 + 6;
      })
      .attr("y", function(d) {
        return y(d.time) //h - ((d.time - 1) * 200) + 1;
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", "12px")
      .attr("fill", "blue");
    console.log("SVG updated");

    axesGroup.append("g") // modify as the x axis
    .attr("class","axis y")
    .call(yAxis);

    //axesGroup.append("g")
    //.attr("class","axis x")
    xd3axis.attr("transform",`translate(${pixelmargin},${h})`)
    .call(xAxis);
  }

  $("#newflight").click(function(event) {
    dataset.push(addFlight());
    update();
  });
  update();
});
