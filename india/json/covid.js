google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
	var data = google.visualization.arrayToDataTable([
	  ['Stats', 'Covid-19', { role: 'style' }],
	  ["Active cases",     12738, 'opacity: 0.5'],
	  ['Recovered',      2463, 'opacity: 0.5'],
	  ['Deaths',  521, 'opacity: 0.5']
	]);

	var options = {
	  width:"350",
      height:"350",
	  pieHole: 0.5,
	  backgroundColor: { fill:'transparent'},
	  chartArea:{
		left:10,
		right:10, // !!! works !!!
		bottom:20,  // !!! works !!!
		top:20,
		width:"100%",
		height:"100%"
	  },
	  pieSliceTextStyle: {
		color: 'white',
	  },
	  legend: {position: 'bottom', textStyle: {color: 'gray'}},
	     
	  pieSliceText: 'none',
	};

	var chart = new google.visualization.PieChart(document.getElementById('covid19'));
	chart.draw(data, options);
  }

$(document).ready(function(){
	$.getJSON("https://api.covid19india.org/data.json", function(data){
		var stats = '';
		$.each(data.statewise, function(key, value){
			if (value.state == "Total") {
			stats += '["stats",' + value.confirmed + '],';
			}	
		});
	});
});	