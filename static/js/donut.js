var chart = new CanvasJS.Chart("revenue", {
	animationEnabled: true,
	title:{
		text: "Division I - FBS Averages",
		horizontalAlign: "left"
	},
	data: [{
		type: "doughnut",
		startAngle: 60,
		innerRadius: 60,
		indexLabelFontSize: 17,
		indexLabel: "{label} - #percent%",
		toolTipContent: "<b>{label}:</b> {y} (#percent%)",
		dataPoints: [
			{ y: 28.6, label: "NCAA/Conference Distributions, Media Rights, Post-Season"},
			{ y: 17, label: "Ticket Sales" },
			{ y: 10.3, label: "Institution / Govt Support" },
			{ y: 6.7, label: "Student Fees"},
			{ y: 7.2, label: "Other Revenue"},
            { y: 8.7, label: "Corporate Sponsorship"},
            { y: 19.9, label: "Donors"},            
            { y: 1.6, label: "Competition Guarantees"}
		]
	}]
});
chart.render();