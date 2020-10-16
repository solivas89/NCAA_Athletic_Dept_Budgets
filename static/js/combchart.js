// d3.csv('static/data/College Budget File Flattened.csv').then(function(collegeData){
	// console.log(collegeData);

	// d3.csv('static/data/nba_cleaned.csv').then(function(nbaData){
	// 	// console.log(nbaData.school)
	// 	// console.log(collegeData)
	// 	schools = []
	// 	nbaData.forEach(function(d){
	// 		// console.log(d.school)
	// 		schools.push(d.school)
	// 	});

	// 	var top10 = schools.slice(0,10)
	// 	// console.log(top10);

	// 	// var filteredData = collegeData.filter(function(d){
	// 	// 	if(collegeData.institution_name == top10){
	// 	// 		return d;
	// 	// 	}
	// 	// });

	// });

	
	// console.log(filteredData);
	// var ctx = document.getElementById("combined");
	// var width = window.innerWidth/2;
	// ctx.width = width;
	// var height = window.innerHeight/2;
	// ctx.height = height;
	var chart = new CanvasJS.Chart("combined", {
		animationEnabled: true,
		theme: "dark2",
		title: {
			text: "NCAA Basketball and Football",
			fontSize: 16,
		},
		axisX: {
			labelAngle: 90,
			title: "Universities",
			titleFontSize: 14,
			labelFontSize: 14,
			interval: 1,
		},
		axisY: {
			title: "Players",
			titleFontSize: 14,
			labelFontSize: 14,
		},
		axisY2: {
			prefix: "$",
			labelFormatter: addSymbols
		},
		toolTip: {
			shared: true,
			// contentFormatter: function(e){
			// 	var content = "";
			// 	for (var i = 0; i < e.entries.length; i++){
			// 		content += e.entries[i].dataSeries.name + " " + "<strong>" + e.entries[i].dataPoint.y + "</strong>";
			// 		content += "<br/>";
			// 	}
			// 	return content;
			// }
		},
		legend: {
			cursor: "pointer",
			itemclick: toggleDataSeries,
			fontSize: 12,
			fontWeigth: "bold",
			verticalAlign: "top",
		},
		data: [
		{
			type: "column",
			name: "Basketball",
			showInLegend: true,
			// yValueFormatString: "##",
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
				{ label: "Alabama", y:  16},
				{ label: "Ohio State", y:  14},
				{ label: "Louisiana State", y:  14},
				{ label: "Florida", y:  16},
				{ label: "Washington-Seattle", y:  19},
				{ label: "Miami", y:  13},
				{ label: "Oklahoma", y:  16},
				{ label: "Clemson", y:  15},
				{ label: "Florida State", y:  18},
				{ label: "Notre Dame", y:  13}
			]
		},
		{
			type: "line",
			name: "Bball Rev",
			showInLegend: true,
			axisYType: "secondary",
			dataPoints: [
				{ label: "Kentucky", y: 38829651 },
				{ label: "Duke", y: 35489891 },
				{ label: "North Carolina-Chapel Hill", y: 27076307},
				{ label: "UCLA", y: 11959355},
				{ label: "UT Austin", y: 16493236 },
				{ label: "Kansas", y: 18974009 },
				{ label: "Michigan-Ann Arbor", y: 21114322 },
				{ label: "Indiana-Bloomington", y: 27008415 },
				{ label: "Arizona", y: 22437254 },
				{ label: "Villanova", y:  14428932},
				{ label: "Alabama", y:  16028795},
				{ label: "Ohio State", y:  24953122},
				{ label: "Louisiana State", y:  9965537},
				{ label: "Florida", y:  11943413},
				{ label: "Washington-Seattle", y:  11409380},
				{ label: "Miami", y:  9988284},
				{ label: "Oklahoma", y:  12355263},
				{ label: "Clemson", y:  9224524},
				{ label: "Florida State", y:  16773013},
				{ label: "Notre Dame", y:  4153208}
			]
		},
		{
			type: "area",
			name: "Bball Exp",
			axisYType: "secondary",
			markerBorderColor: "white",
			markerBorderThickness: 2,
			showInLegend: true,
			dataPoints: [
				{ label: "Kentucky", y: 20202558 },
				{ label: "Duke", y: 22178473 },
				{ label: "North Carolina-Chapel Hill", y: 11204115},
				{ label: "UCLA", y: 15468381},
				{ label: "UT Austin", y: 11649912 },
				{ label: "Kansas", y: 12547439 },
				{ label: "Michigan-Ann Arbor", y: 9874360 },
				{ label: "Indiana-Bloomington", y: 13230211 },
				{ label: "Arizona", y: 10383630 },
				{ label: "Villanova", y:  14428932},
				{ label: "Alabama", y:  15966875},
				{ label: "Ohio State", y:  10996364},
				{ label: "Louisiana State", y:  9512515},
				{ label: "Florida", y:  9317385},
				{ label: "Washington-Seattle", y:  9224123},
				{ label: "Miami", y:  8895333},
				{ label: "Oklahoma", y:  10072404},
				{ label: "Clemson", y:  8229736},
				{ label: "Florida State", y:  16773013},
				{ label: "Notre Dame", y:  8331273}
			]
		},
		{
			type: "column",
			name: "Football",
			visible: false,
			showInLegend: true,
			yValueFormatString: "##",
			dataPoints: [
				{ label: "Kentucky", y: 124 },
				{ label: "Duke", y: 116 },
				{ label: "North Carolina-Chapel Hill", y: 129},
				{ label: "UCLA", y: 116},
				{ label: "UT Austin", y: 115 },
				{ label: "Kansas", y: 130 },
				{ label: "Michigan-Ann Arbor", y: 140 },
				{ label: "Indiana-Bloomington", y: 122 },
				{ label: "Arizona", y: 123 },
				{ label: "Villanova", y:  94},
				{ label: "Alabama", y:  133},
				{ label: "Ohio State", y:  131},
				{ label: "Louisiana State", y:  118},
				{ label: "Florida", y:  119},
				{ label: "Washington-Seattle", y:  114},
				{ label: "Miami", y:  113},
				{ label: "Oklahoma", y:  119},
				{ label: "Clemson", y:  124},
				{ label: "Florida State", y:  108},
				{ label: "Notre Dame", y:  120}
			]
		},
		{
			type: "line",
			name: "Fball Rev",
			visible: false,
			showInLegend: true,
			axisYType: "secondary",
			dataPoints: [
				{ label: "Kentucky", y: 41366437 },
				{ label: "Duke", y: 40328603 },
				{ label: "North Carolina-Chapel Hill", y: 39314461},
				{ label: "UCLA", y: 41288698},
				{ label: "UT Austin", y: 156147208 },
				{ label: "Kansas", y: 38148252 },
				{ label: "Michigan-Ann Arbor", y: 122270243 },
				{ label: "Indiana-Bloomington", y: 52577443 },
				{ label: "Arizona", y: 43272457 },
				{ label: "Villanova", y:  67651615},
				{ label: "Alabama", y:  94604899},
				{ label: "Ohio State", y:  115091304},
				{ label: "Louisiana State", y:  91950610},
				{ label: "Florida", y:  84837920},
				{ label: "Washington-Seattle", y:  84041770},
				{ label: "Miami", y:  56257383},
				{ label: "Oklahoma", y:  94817907},
				{ label: "Clemson", y:  61378516},
				{ label: "Florida State", y:  68893857},
				{ label: "Notre Dame", y:  115510518}
			]
		},
		{
			type: "area",
			name: "Fball Exp",
			axisYType: "secondary",
			markerBorderColor: "white",
			markerBorderThickness: 2,
			visible: false,
			showInLegend: true,
			dataPoints: [
				{ label: "Kentucky", y: 31446474 },
				{ label: "Duke", y: 28806459 },
				{ label: "North Carolina-Chapel Hill", y: 23127138},
				{ label: "UCLA", y: 35463068},
				{ label: "UT Austin", y: 43200270 },
				{ label: "Kansas", y: 25325279 },
				{ label: "Michigan-Ann Arbor", y: 47430574 },
				{ label: "Indiana-Bloomington", y: 24216483 },
				{ label: "Arizona", y: 22548661 },
				{ label: "Villanova", y:  6765161},
				{ label: "Alabama", y:  69718059},
				{ label: "Ohio State", y:  60076743},
				{ label: "Louisiana State", y:  35319160},
				{ label: "Florida", y:  39149664},
				{ label: "Washington-Seattle", y:  40474139},
				{ label: "Miami", y:  56257383},
				{ label: "Oklahoma", y:  43453315},
				{ label: "Clemson", y:  55649888},
				{ label: "Florida State", y:  68893857},
				{ label: "Notre Dame", y:  50201929}
			]
		}
	]
	});
	chart.render();
// });




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
