// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 40, left: 100},
    width = 500 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select(".lollipop")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Title of the chart
svg.append('text')
    .attr('x', (width/2))
    .attr('y', 0)
    .attr('text-anchor', 'middle')
    .style('font-size', '14px')
    .style('font-weight', 'bold')
    .text('Change in Q2 Taxes from 2019 to 2020 (%) ')

// X axis label
svg.append('text')
    .attr('x', width/2)
    .attr('y', height)
    .style('text-anchor', 'middle')
    .text('Percentage change')

// Y axis label
svg.append('text')
    .attr("transform", "rotate(-90)")
    .attr('y', 0-margin.left-5)
    .attr('x', 0-(height/2))
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text('State')

// Read json file
d3.json("static/data/Tax_Data.json", function(taxData) {
    // console.log(taxData)

    taxData.forEach(function(data){
        data.Q2_2020 = +data.Q2_2020,
        data.Q1_2020 = +data.Q1_2020,
        data.Q2_2019 = +data.Q2_2019,
        data.Q1_Q2_2020_Delta = +data.Q1_Q2_2020_Delta,
        data.Q2_2019_2020_Delta = +data.Q2_2019_2020_Delta
    })
    // console.log(taxData)

// sort data
taxData.sort(function(a, b) {
  return a.Q2_2019_2020_Delta - b.Q2_2019_2020_Delta;
});

// Add X axis
var x = d3.scaleLinear()
  .domain([d3.min(taxData, d=>d.Q2_2019_2020_Delta)-5, d3.max(taxData, d => d.Q2_2019_2020_Delta)+2])
  .range([ 0, width]);
svg.append("g")
  .attr("transform", "translate(0," + (height-50) + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end")

// Y axis
var y = d3.scaleBand()
  .range([ 0, height-50])
  .domain(taxData.map(function(d) { return d.State; }))
  .padding(1);
svg.append("g")
  .call(d3.axisLeft(y))

// Lines
var linesGroup = svg.selectAll("myline")
  .data(taxData)
  .enter()
  .append("line")
    .attr("x1", x(0))
    .attr("x2", x(0))
    .attr("y1", function(d) { return y(d.State); })
    .attr("y2", function(d) { return y(d.State); })
    .attr("stroke", "grey")

// Circles -> start at X=0
var circlesGroup = svg.selectAll("mycircle")
  .data(taxData)
  .enter()
  .append("circle")
    .attr("cx", x(0) )
    .attr("cy", function(d) { return y(d.State); })
    .attr("r", "3")
    .style("fill", "#69b3a2")
    .attr("stroke", "black")

// Tooltip
var toolTip = d3.tip()
    .attr('class', 'toolTip')
    .offset([10,30])
    .html(d => (`${d.Q2_2019_2020_Delta}%`))

svg.call(toolTip);

circlesGroup.on('mouseover', d => toolTip.show(d, this))
    .on('mouseout', d=>toolTip.hide(d));

// Change the X coordinates of line and circle
svg.selectAll("circle")
  .transition()
  .duration(2000)
  .attr("cx", function(d) { return x(d.Q2_2019_2020_Delta); })

svg.selectAll("line")
  .transition()
  .duration(2000)
  .attr("x1", function(d) { return x(d.Q2_2019_2020_Delta); })

})