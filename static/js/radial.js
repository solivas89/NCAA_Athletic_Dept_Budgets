var svgWidth = 900,
  svgHeight = 550,
  chartRadius = svgHeight / 2;

var color = d3.scaleOrdinal(d3.schemeCategory10);

var margin = {top: 25, right: 100, bottom: 25, left: 100};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select('#radial').append('svg')
  .attr('width', svgWidth)
  .attr('height', svgHeight)
  .append('g')
    .attr('transform', 'translate(' + svgWidth / 4 + ',' + svgHeight / 2 + ')');

var chartGroup2 = svg.append("g")
.attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
chartGroup2.append('text')
.attr('x', (-100))
.attr('y', 205)
.attr('text-anchor', 'middle')
.style('font-size', '20px')
.style('font-weight', 'bold')
.text('Top 10 States Producing Pro Athletes')
chartGroup2.append('text')
.attr('x', (-100))
.attr('y', 220)
.attr('text-anchor', 'middle')
.style('font-size', '12px')
.style('font-weight', 'bold')
.text('(Hover over an Arc to see the numbers)')

var tooltip = d3.select('body').append('div')
  .attr('class', 'tooltipradial');

var PI = Math.PI,
  arcMinRadius = 10,
  arcPadding = 10,
  labelPadding = -5,
  numTicks = 10;


d3.csv('static/data/mergedstatecount.csv').then((StateData,error) => {
  var data = StateData.slice(0,10)
  var scale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value) * 1.1])
    .range([0, 2 * PI]);

  var ticks = scale.ticks(numTicks).slice(0,-1);
  var keys = data.map((d, i) => d.name.slice(0,10));
  //number of arcs
  var numArcs = keys.length;
  var arcWidth = (100) / numArcs;

  var arc = d3.arc()
    .innerRadius((d, i) => getInnerRadius(i))
    .outerRadius((d, i) => getOuterRadius(i))
    .startAngle(0)
    .endAngle((d, i) => scale(d));

  var radialAxis = svg.append('g')
    .attr('class', 'r axis')
    .selectAll('g')
      .data(data)
      .enter().append('g');

  radialAxis.append('circle')
    .attr('r', (d, i) => getOuterRadius(i) + arcPadding);

  radialAxis.append('text')
    .attr('x', labelPadding)
    .attr('y', (d, i) => -getOuterRadius(i) + arcPadding)
    .text(d => d.name);

  var axialAxis = svg.append('g')
    .attr('class', 'a axis')
    .selectAll('g')
      .data(ticks)
      .enter().append('g')
        .attr('transform', d => 'rotate(' + (rad2deg(scale(d)) - 90) + ')');

  axialAxis.append('line')
    .attr('x2', chartRadius/2);

  var arcs = svg.append('g')
    .attr('class', 'data')
    .selectAll('path')
      .data(data.slice(0,10))
      .enter().append('path')
      .attr('class', 'arc')
      .style('fill', (d, i) => color(i))

  arcs.transition()
    .delay((d, i) => i * 200)
    .duration(1000)
    .attrTween('d', arcTween);

  arcs.on('mousemove', showTooltip)
  arcs.on('mouseout', hideTooltip)


  function arcTween(d, i) {
    var interpolate = d3.interpolate(0, d.value);
    return t => arc(interpolate(t), i);
  }

  function showTooltip(d) {
    tooltip.style('left', (d3.event.pageX + 10) + 'px')
      .style('top', (d3.event.pageY - 25) + 'px')
      .style('display', 'inline-block')
      .html( `STATE: ${d.name} Football: ${d.valuef} Basketball: ${d.valueb} Total: ${d.value}`);
  }

  function hideTooltip() {
    tooltip.style('display', 'none');
  }

  function rad2deg(angle) {
    return angle * 180 / PI;
  }

  function getInnerRadius(index) {
    return arcMinRadius + (numArcs - (index + 1)) * (arcWidth + arcPadding);
  }

  function getOuterRadius(index) {
    return getInnerRadius(index) + arcWidth;
  }
});
