google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
var data = google.visualization.arrayToDataTable([
  ['Stats', 'Covid-19 states'],
  ['Andhra Pradesh',     603],
  ['Delhi',     1893],
  ['Gujarat',     1376],
  ['Karnataka',     384],
  ['Kerala',     399],
  ['Madhya Pradesh',     1402],
  ['Maharashtra',     3648],
  ['Rajasthan',     1351],
  ['Tamil Nadu',     1372],
  ['Telangana',      809],
  ['Uttar Pradesh',  974],
  ['Kerala',  399],
    ['J and K',  341],
    ['West Bengal',  287],
    ['Punjab',  234],
    ['Haryana',  232]    
]);

var options = {
  width:"350",
  height:"350", 
  pieHole: 0.5,
  legend: {position: 'bottom', textStyle: {color: 'gray'}},
  backgroundColor: { fill:'transparent' },
	titlePosition: 'in', axisTitlesPosition: 'in',
	hAxis: {textPosition: 'in'}, vAxis: {textPosition: 'in'},
  options: {
  theme: 'maximized'
},
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
  pieSliceText: 'none',
};

var chart = new google.visualization.PieChart(document.getElementById('covid'));
chart.draw(data, options);
}
