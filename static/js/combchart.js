d3.csv('static/data/College Budget File Flattened.csv').then(function(collegeData){
	// console.log(collegeData);

	d3.csv('static/data/nba_cleaned.csv').then(function(nbaData){
		// console.log(nbaData.school)
		// console.log(collegeData)
		schools = []
		nbaData.forEach(function(d){
			// console.log(d.school)
			schools.push(d.school)
		});

		var top10 = schools.slice(0,10)
		// console.log(top10);

		// var filteredData = collegeData.filter(function(d){
		// 	if(collegeData.institution_name == top10){
		// 		return d;
		// 	}
		// });

	});

	
	// console.log(filteredData);

	var chart = new CanvasJS.Chart("combined", {
		animationEnabled: true,
		theme: "light2",
		title: {
			text: "NCAA College Athletics"
		},
		axisX: {
			labelAngle: 100,
			title: "Universities"
		},
		axisY: {
			title: "Players"
		},
		axisY2: {
			prefix: "$",
			labelFormatter: addSymbols,
			title: "Amount"
		},
		toolTip: {
			shared: true
		},
		legend: {
			cursor: "pointer",
			itemclick: toggleDataSeries
		},
		data: [
		{
			type: "column",
			name: "Basketball",
			showInLegend: true,
			// xValueFormatString: "",
			yValueFormatString: "##",
			dataPoints: [
				{ label: "Kentucky", y: 13 },
				{ label: "Duke", y: 15 },
				{ label: "North Carolina-Chapel Hill", y: 37},
				{ label: "UCLA", y: 16},
				{ label: "UT Austin", y: 15 },
				{ label: "Kansas", y: 16 },
				{ label: "Michigan-Ann Arbor", y: 15 },
				{ label: "Indiana-Bloomington", y: 17 },
				{ label: "Arizona", y: 16 },
				{ label: "Villanova", y:  15},
				{ label: "Alabama", y:  15},
				{ label: "Ohio State", y:  15},
				{ label: "Louisiana State", y:  15},
				{ label: "Florida", y:  15},
				{ label: "Washington-Seattle", y:  15},
				{ label: "Miami", y:  15},
				{ label: "Oklahoma", y:  15},
				{ label: "Clemson", y:  15},
				{ label: "Florida State", y:  15}
			]
		},
		{
			type: "column",
			name: "Football",
			showInLegend: true,
			// xValueFormatString: "",
			yValueFormatString: "##",
			dataPoints: [
				{ label: "Kentucky", y: 124 },
				{ label: "Duke", y: 15 },
				{ label: "North Carolina-Chapel Hill", y: 37},
				{ label: "UCLA", y: 16},
				{ label: "UT Austin", y: 15 },
				{ label: "Kansas", y: 16 },
				{ label: "Michigan-Ann Arbor", y: 15 },
				{ label: "Indiana-Bloomington", y: 17 },
				{ label: "Arizona", y: 16 },
				{ label: "Villanova", y:  15},
				{ label: "Alabama", y:  15},
				{ label: "Ohio State", y:  15},
				{ label: "Louisiana State", y:  15},
				{ label: "Florida", y:  15},
				{ label: "Washington-Seattle", y:  15},
				{ label: "Miami", y:  15},
				{ label: "Oklahoma", y:  15},
				{ label: "Clemson", y:  15},
				{ label: "Florida State", y:  15}
			]
		}, 
		{
			type: "line",
			name: "Bball Rev",
			showInLegend: true,
			axisYType: "secondary",
		// 	yValueFormatString: "$#,##0",
			dataPoints: [
				{ label: "Kentucky", y: 38829651 },
				{ label: "Duke", y: 15 },
				{ label: "North Carolina-Chapel Hill", y: 37},
				{ label: "UCLA", y: 16},
				{ label: "UT Austin", y: 15 },
				{ label: "Kansas", y: 16 },
				{ label: "Michigan-Ann Arbor", y: 15 },
				{ label: "Indiana-Bloomington", y: 17 },
				{ label: "Arizona", y: 16 },
				{ label: "Villanova", y:  15},
				{ label: "Alabama", y:  15},
				{ label: "Ohio State", y:  15},
				{ label: "Louisiana State", y:  15},
				{ label: "Florida", y:  15},
				{ label: "Washington-Seattle", y:  15},
				{ label: "Miami", y:  15},
				{ label: "Oklahoma", y:  15},
				{ label: "Clemson", y:  15},
				{ label: "Florida State", y:  15}
			]
		},
		{
			type: "line",
			name: "Fball Rev",
			showInLegend: true,
			axisYType: "secondary",
		// 	yValueFormatString: "$#,##0",
			dataPoints: [
				{ label: "Kentucky", y: 41366437 },
				{ label: "Duke", y: 116 },
				{ label: "North Carolina-Chapel Hill", y: 37},
				{ label: "UCLA", y: 16},
				{ label: "UT Austin", y: 15 },
				{ label: "Kansas", y: 16 },
				{ label: "Michigan-Ann Arbor", y: 15 },
				{ label: "Indiana-Bloomington", y: 17 },
				{ label: "Arizona", y: 16 },
				{ label: "Villanova", y:  15},
				{ label: "Alabama", y:  15},
				{ label: "Ohio State", y:  15},
				{ label: "Louisiana State", y:  15},
				{ label: "Florida", y:  15},
				{ label: "Washington-Seattle", y:  15},
				{ label: "Miami", y:  15},
				{ label: "Oklahoma", y:  15},
				{ label: "Clemson", y:  15},
				{ label: "Florida State", y:  15}
			]
		},
		{
			type: "area",
			name: "Bball Exp",
			axisYType: "secondary",
			markerBorderColor: "white",
			markerBorderThickness: 2,
			showInLegend: true,
		// 	yValueFormatString: "$#,##0",
			dataPoints: [
				{ label: "Kentucky", y: 20202558 },
				{ label: "Duke", y: 22178473 },
				{ label: "North Carolina-Chapel Hill", y: 37},
				{ label: "UCLA", y: 16},
				{ label: "UT Austin", y: 15 },
				{ label: "Kansas", y: 16 },
				{ label: "Michigan-Ann Arbor", y: 15 },
				{ label: "Indiana-Bloomington", y: 17 },
				{ label: "Arizona", y: 16 },
				{ label: "Villanova", y:  15},
				{ label: "Alabama", y:  15},
				{ label: "Ohio State", y:  15},
				{ label: "Louisiana State", y:  15},
				{ label: "Florida", y:  15},
				{ label: "Washington-Seattle", y:  15},
				{ label: "Miami", y:  15},
				{ label: "Oklahoma", y:  15},
				{ label: "Clemson", y:  15},
				{ label: "Florida State", y:  15}
			]
		},
		{
			type: "area",
			name: "Fball Exp",
			axisYType: "secondary",
			markerBorderColor: "white",
			markerBorderThickness: 2,
			showInLegend: true,
		// 	yValueFormatString: "$#,##0",
			dataPoints: [
				{ label: "Kentucky", y: 31446474 },
				{ label: "Duke", y: 28806459 },
				{ label: "North Carolina-Chapel Hill", y: 37},
				{ label: "UCLA", y: 16},
				{ label: "UT Austin", y: 15 },
				{ label: "Kansas", y: 16 },
				{ label: "Michigan-Ann Arbor", y: 15 },
				{ label: "Indiana-Bloomington", y: 17 },
				{ label: "Arizona", y: 16 },
				{ label: "Villanova", y:  15},
				{ label: "Alabama", y:  15},
				{ label: "Ohio State", y:  15},
				{ label: "Louisiana State", y:  15},
				{ label: "Florida", y:  15},
				{ label: "Washington-Seattle", y:  15},
				{ label: "Miami", y:  15},
				{ label: "Oklahoma", y:  15},
				{ label: "Clemson", y:  15},
				{ label: "Florida State", y:  15}
			]
		}
	]
	});
	chart.render();
});




function addSymbols(e) {
	var suffixes = ["", "K", "M", "B"];
	var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);

	if(order > suffixes.length - 1)                	
		order = suffixes.length - 1;

	var suffix = suffixes[order];      
	return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
}

function toggleDataSeries(e) {
	if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	} else {
		e.dataSeries.visible = true;
	}
	e.chart.render();
}
