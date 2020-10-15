//Width  of chart
width = 975
//HEight of chart
height = width
//Inner radius of chart
innerRadius = 180
//Outer radius of chart
outerRadius = Math.min(width, height) / 2
//Chart  Setup
function createSVG(chart) {
    //Create SVG Window
    const svg = d3.select(DOM.svg(width, height))
        .attr("viewBox", `${-width / 2} ${-height / 2} ${width} ${height}`)
        .style("width", "100%")
        .style("height", "auto")
        .style("font", "12px fantasy")
        .style("font-weight","bold")
    
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

  //Import Data
  d3.csv("static/data/mergedstatecount.csv").then(function(data) {
    //Iterate through Data
    let total = 0;
    for (let i = 1; i < columns.length; ++i) total += d[columns[i]] = +d[columns[i]];
    d.total = total;
    return d;
  })
    //Creates Arc for Chart
    arc = d3.arc()
        .innerRadius(d => y(d[0]))
        .outerRadius(d => y(d[1]))
        .startAngle(d => x(d.data.State))
        .endAngle(d => x(d.data.State) + x.bandwidth())
        .padAngle(0.01)
        .padRadius(innerRadius)
    //Set Width of Bars
    x = d3.scaleBand()
        .domain(data.map(d => d.State))
        .range([0, 2 * Math.PI])
        .align(0);
    //Set Length of Bars
    y = d3.scaleRadial()
      .domain([0, d3.max(data, d => d.total)])
      .range([innerRadius, outerRadius]);
    //Sets colors of bars
    z = d3.scaleOrdinal()
      .domain(data.columns.slice(1))
      .range(["#00FFFF", "#000000"]);
    //Append State Text to each bar
    xAxis = g => g
      .attr("text-anchor", "middle")
      .call(g => g.selectAll("g")
        .data(data)
        .join("g")
          .attr("transform", d => `
            rotate(${((x(d.State) + x.bandwidth() / 2) * 180 / Math.PI - 90)})
            translate(${innerRadius},0)
          `)
          .call(g => g.append("line")
              .attr("x2", -5)
              .attr("stroke", "#000"))
          .call(g => g.append("text")
              .attr("transform", d => (x(d.State) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI
                  ? "rotate(90)translate(0,16)"
                  : "rotate(-90)translate(0,-9)")
              .text(d => d.State)));
    //Set tick marks to each bar
    yAxis = g => g
        .attr("text-anchor", "middle")
        .call(g => g.append("text")
            .attr("y", d => -y(y.ticks(5).pop()))
            .attr("dy", "-1em")
            .text("Population"))
        .call(g => g.selectAll("g")
        .data(y.ticks(5).slice(1))
        .join("g")
            .attr("fill", "none")
            .call(g => g.append("circle")
                .attr("stroke", "#000")
                .attr("stroke-opacity", 0.5)
                .attr("r", y))
            .call(g => g.append("text")
                .attr("y", d => -y(d))
                .attr("dy", "0.35em")
                .attr("stroke", "#fff")
                .attr("stroke-width", 5)
                .text(y.tickFormat(5, "s"))
            .clone(true)
                .attr("fill", "#000")
                .attr("stroke", "none")))
    //Create Legend
    legend = g => g.append("g")
        .selectAll("g")
        .data(data.columns.slice(1).reverse())
        .join("g")
            .attr("transform", (d, i) => `translate(-40,${(i - (data.columns.length - 1) / 2) * 20})`)
            .call(g => g.append("rect")
                .attr("width", 18)
                .attr("height", 18)
                .attr("fill", z))
            .call(g => g.append("text")
                .attr("x", 24)
                .attr("y", 9)
                .attr("dy", "0.35em")
                .text(d => d))