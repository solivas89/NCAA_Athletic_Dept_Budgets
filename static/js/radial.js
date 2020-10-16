function RadialChart() {
    var svgWidth = 950;
    var svgHeight = 950;

    var innerRadius = 180

    outerRadius = Math.min(width, height) / 2
    
    var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 50
    };

    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    var svg = d3.select(".radialchart")
    .select("body")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

    var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


    
    StateData = d3.csv("static/data/mergedstatecount.csv").then(function(StateData) {
        d = StateData
        let total = 0;
        for (let i = 1; i < Football.length; ++i) total += d[Football[i]] = +d[Football[i]];
        d.total = total;
        return d;
        });
        
        
        //Creates Arc for Chart
        arc = d3.arc()
            .innerRadius(d => y(d[0]))
            .outerRadius(d => y(d[1]))
            .startAngle(d => x(d.StateData.State))
            .endAngle(d => x(d.StateData.State) + x.bandwidth())
            .padAngle(0.01)
            .padRadius(innerRadius)
        //Set Width of Bars
        x = d3.scaleBand()
            .domain(StateData.map(d => d.State))
            .range([0, 2 * Math.PI])
            .align(0);
        //Set Length of Bars
        y = d3.scaleRadial()
        .domain([0, d3.max(StateData, d => d.total)])
        .range([innerRadius, outerRadius]);
        //Sets colors of bars
        z = d3.scaleOrdinal()
        .domain(StateData.columns.slice(1))
        .range(["#00FFFF", "#000000"]);
        //Append State Text to each bar
        xAxis = g => g
        .attr("text-anchor", "middle")
        .call(g => g.selectAll("g")
            .StateData(StateData)
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
            .StateData(y.ticks(5).slice(1))
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
            .StateData(StateData.columns.slice(1).reverse())
            .join("g")
                .attr("transform", (d, i) => `translate(-40,${(i - (StateData.columns.length - 1) / 2) * 20})`)
                .call(g => g.append("rect")
                    .attr("width", 18)
                    .attr("height", 18)
                    .attr("fill", z))
                .call(g => g.append("text")
                    .attr("x", 24)
                    .attr("y", 9)
                    .attr("dy", "0.35em")
                    .text(d => d))
                
            chartGroup.append("g")
                .selectAll("g")
                .StateData(d3.stack().keys(StateData.columns.slice(1))(StateData))
                .join("g")
                .attr("fill", d => z(d.key))
                .selectAll("path")
                .StateData(d => d)
                .join("path")
                    .attr("d", arc),
            
                chartGroup.append("g")
                    .call(xAxis),
            
                chartGroup.append("g")
                    .call(yAxis),
            
                chartGroup.append("g")
                    .call(legend)

};

RadialChart();