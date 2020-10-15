// width = 975
// height = width
// innerRadius = 180
// outerRadius = Math.min(width, height) * 0.67
// d3 = require("d3@6")
// chart = {
//     var svg = d3.select(DOM.svg(width, height))
//         .attr("viewBox", `${-width / 2} ${-height * 0.69} ${width} ${height}`)
//         .style("width", "100%")
//         .style("height", "auto")
//         .style("font", "10px sans-serif")
  
//     svg.append("g")
//       .selectAll("g")
//       .data(d3.stack().keys(data.columns.slice(1))(data))
//       .join("g")
//         .attr("fill", d => z(d.key))
//       .selectAll("path")
//       .data(d => d)
//       .join("path")
//         .attr("d", arc),
  
//     svg.append("g")
//         .call(xAxis),

//     svg.append("g")
//         .call(yAxis),
  
//     svg.append("g")
//         .call(legend),
  
//     return svg.node()
//   }

data = d3.csvParse(await FileAttachment("static/data/mergedstatedata.csv").text(), (d, _, columns) => {
    let total = 0;
    for (let i = 1; i < columns.length; ++i) total += d[columns[i]] = +d[columns[i]];
    d.total = total;
    return d;
  }).sort((a, b) => b.total - a.total)

  console.log(data)

  arc = d3.arc()
    .innerRadius(d => y(d[0]))
    .outerRadius(d => y(d[1]))
    .startAngle(d => x(d.data.State))
    .endAngle(d => x(d.data.State) + x.bandwidth())
    .padAngle(0.01)
    .padRadius(innerRadius)

  y = d3.scaleRadial()
    .domain([0, d3.max(data, d => d.total)])
    .range([innerRadius, outerRadius])

  z = d3.scaleOrdinal()
    .domain(data.columns.slice(1))
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"])

    xAxis = g => g
    .attr("text-anchor", "middle")
    .call(g => g.selectAll("g")
      .data(data)
      .enter().append("g")
        .attr("transform", d => `
          rotate(${((x(d.State) + x.bandwidth() / 2) * 180 / Math.PI - 90)})
          translate(${innerRadius},0)
        `)
        .call(g => g.append("line")
            .attr("x2", -5)
            .attr("stroke", "#000"))
        .call(g => g.append("text")
            .attr("transform", d => (x(d.State) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI
                ? "rotate(90) translate(0,16)"
                : "rotate(-90) translate(0,-9)")
            .text(d => d.State)))

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