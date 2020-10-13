// set the dimensions and margins of the graph
var margin = {top: 100, right: 0, bottom: 0, left: 0},
    width = 460 - margin.left - margin.right,
    height = 460 - margin.top - margin.bottom,
    innerRadius = 90,
    outerRadius = Math.min(width, height) / 2;   // the outerRadius goes from the middle of the SVG area to the border

// append the svg object
var svg = d3.select(".circularbar")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");

d3.json("static/data/Tax_Data.json", function(taxData){

    taxData.forEach(function(data){
        data.Q2_2020 = +data.Q2_2020,
        data.Q1_2020 = +data.Q1_2020,
        data.Q2_2019 = +data.Q2_2019,
        data.Q1_Q2_2020_Delta = +data.Q1_Q2_2020_Delta,
        data.Q2_2019_2020_Delta = +data.Q2_2019_2020_Delta
    })

  // X scale: common for 2 data series
  var x = d3.scaleBand()
      .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
      .align(0)                  // This does nothing
      .domain(taxData.map(function(d) { return d.State; })); // The domain of the X axis is the list of states.

  // Y scale outer variable
  var y = d3.scaleRadial()
      .range([innerRadius, outerRadius])   // Domain will be define later.
      .domain([0, d3.max(taxData, d=> d.Q2_2019)]); // Domain of Y is from 0 to the max seen in the data

  // Second barplot Scales
  var ybis = d3.scaleRadial()
      .range([innerRadius, 5])   // Domain will be defined later.
      .domain([0, d3.max(taxData, d => d.Q2_2019)]);

  // Add the bars
  svg.append("g")
    .selectAll("path")
    .data(taxData)
    .enter()
    .append("path")
      .attr("fill", "#69b3a2")
      .attr("class", "yo")
      .attr("d", d3.arc()     // imagine your doing a part of a donut plot
          .innerRadius(innerRadius)
          .outerRadius(d => y(d.Q2_2019))
          .startAngle(function(d) { return x(d.State); })
          .endAngle(function(d) { return x(d.State) + x.bandwidth(); })
          .padAngle(0.01)
          .padRadius(innerRadius))

  // Add the labels
  svg.append("g")
      .selectAll("g")
      .data(taxData)
      .enter()
      .append("g")
        .attr("text-anchor", function(d) { return (x(d.State) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
        .attr("transform", function(d) { return "rotate(" + ((x(d.State) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (y(d.Q2_2019)+10) + ",0)"; })
      .append("text")
        .text(function(d){return(d.State)})
        .attr("transform", function(d) { return (x(d.State) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
        .style("font-size", "11px")
        .attr("alignment-baseline", "middle")

  // Add the second series
  svg.append("g")
    .selectAll("path")
    .data(taxData)
    .enter()
    .append("path")
      .attr("fill", "red")
      .attr("d", d3.arc()     // imagine your doing a part of a donut plot
          .innerRadius( function(d) { return ybis(0) })
          .outerRadius( d => ybis(d.Q2_2019))
          .startAngle(function(d) { return x(d.State); })
          .endAngle(function(d) { return x(d.State) + x.bandwidth(); })
          .padAngle(0.01)
          .padRadius(innerRadius))

});