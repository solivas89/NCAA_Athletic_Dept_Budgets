chart = {
    var svg = d3.select(DOM.svg(width, height))
        .attr("viewBox", `${-width / 2} ${-height * 0.69} ${width} ${height}`)
        .style("width", "100%")
        .style("height", "auto")
        .style("font", "10px sans-serif"),
  
    svg.append("g")
      .selectAll("g")
      .data(d3.stack().keys(data.columns.slice(1))(data))
      .join("g")
        .attr("fill", d => z(d.key))
      .selectAll("path")
      .data(d => d)
      .join("path")
        .attr("d", arc),
  
    svg.append("g")
        .call(xAxis),
  
    svg.append("g")
        .call(yAxis),
  
    svg.append("g")
        .call(legend),
  
    return svg.node(),
  }

  data = d3.csvParse(await FileAttachment("data-2.csv").text(), (d, _, columns) => {
    let total = 0;
    for (let i = 1; i < columns.length; ++i) total += d[columns[i]] = +d[columns[i]];
    d.total = total;
    return d;
  }).sort((a, b) => b.total - a.total)

  arc = ƒ()

  arc = d3.arc()
    .innerRadius(d => y(d[0]))
    .outerRadius(d => y(d[1]))
    .startAngle(d => x(d.data.State))
    .endAngle(d => x(d.data.State) + x.bandwidth())
    .padAngle(0.01)
    .padRadius(innerRadius)

  x = ƒ(i)

  x = d3.scaleBand()
    .domain(data.map(d => d.State))
    .range([0, 2 * Math.PI])
    .align(0)

  y = ƒ(t)

  y = d3.scaleRadial()
    .domain([0, d3.max(data, d => d.total)])
    .range([innerRadius, outerRadius])