// set the dimensions and margins of the graph


var svgWidth = 960;
var svgHeight = 800;


var margin = {top: 10, right: 30, bottom: 40, left: 100};
    width = svgWidth - margin.left - margin.right,
    height = svgHeight - margin.top - margin.bottom;
// append the svg object to the body of the page
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    innerRadius = 180,
    outerRadius = Math.min(width, height) / 2.5,
    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var xScaleOffset = Math.PI * 75/180;
​
var x = d3.scaleBand()
    .range([xScaleOffset, 2 * Math.PI + xScaleOffset])
    .align(0);
​
var y = d3.scaleLinear()
    .range([innerRadius, outerRadius]);
​
var z = d3.scaleOrdinal()
    .range(["#a1d76a", "#91bfdb"]);
​
var zClasses = ['Football', 'Basketball'];
​
​
    
    // StateData = d3.csv("static/data/mergedstatecount.csv").then(function(StateData) {
    d3.csv("static/data/mergedstatecount.csv", function(d, i, columns) {
        d.Football = (+d.Football);
        d.Basketball =  (+d.Basketball);
        return d;
        }, function(error, data) {
        if (error) throw error;
        console.log(data)
      
        x.domain(data.map(function(d) { return d.State; }));
        y.domain([0, d3.max(data, function(d) { return (d.Football + d.Basketball); })]);
        z.domain(data.columns.slice(1));
      
        
        g.append('g')
            .selectAll("g")
          .data(d3.stack().keys(data.columns.slice(1))(data))
          .enter().append("g")
            .attr("fill", function(d) { return z(d.key); })
          .selectAll("path")
          .data(function(d) { return d; })
          .enter().append("path")
            .attr("d", d3.arc()
                .innerRadius(function(d) { return y(d[0]); })
                .outerRadius(function(d) { return y(d[1]); })
                .startAngle(function(d) { return x(d.data.State); })
                .endAngle(function(d) { return x(d.data.State) + x.bandwidth(); })
                .padAngle(0.01)
                .padRadius(innerRadius));
      
        //yAxis
      
        var yAxis = g.append("g")
            .attr("text-anchor", "middle");
      
        var yTicksValues = d3.ticks(0, 200, 4);
      
        var yTick = yAxis
          .selectAll("g")
          .data(yTicksValues)
          .enter().append("g");
      
        yTick.append("circle")
            .attr("fill", "none")
            .attr("stroke", "#ccdcea")
            .attr("r", y);
      
        yTick.append("text")
            .attr("y", function(d) { return -y(d); })
            .attr("dy", "0.35em")
            .attr("fill", "none")
            .attr("stroke", "#fff")
            .attr("stroke-width", 5)
            .text(y.tickFormat(5, "s"));
      
        yTick.append("text")
            .attr("y", function(d) { return -y(d); })
            .attr("dy", "1em")
            .text(y.tickFormat(5, "s"));
      
        yAxis.append("text")
            .attr("y", function(d) { return -y(yTicksValues.pop()); })
            .attr("dy", "1em")
            .text("State Player Counts");
      
        // Labels for xAxis
      
        var label = g.append("g")
          .selectAll("g")
          .data(data)
          .enter().append("g")
            .attr("text-anchor", "middle")
            .attr("transform", function(d) { return "rotate(" + ((x(d.km) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")translate(" + innerRadius + ",0)"; });
      
        label.append("line")
            .attr("x2", function(d) { return (((d.km % 5) == 0) | (d.km == '1')) ? -7 : -4 })
            .attr("stroke", "#000");
      
        label.append("text")
            .attr("transform", function(d) { return (x(d.km) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI ? "rotate(90)translate(0,16)" : "rotate(-90)translate(0,-9)"; })
            .text(function(d) { 
              var xlabel = (((d.km % 5) == 0) | (d.km == '1')) ? d.km : '';
              return xlabel; });
      
      // Legend
        var legend = g.append("g")
          .selectAll("g")
          .data(zClasses)
          .enter().append("g")
            .attr("transform", function(d, i) { return "translate(-50," + (i - (zClasses.length - 1) / 2) * 25+ ")"; });
      
        legend.append("circle")
            .attr("r", 8)
            .attr("fill", z);
      
        legend.append("text")
            .attr("x", 15)
            .attr("y", 0)
            .attr("dy", "0.35em")
            .text(function(d) { return d; });
      
      });