google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
var data = google.visualization.arrayToDataTable([
  ['Date', 'Cases'],
  ['25/03',  86],
  ['26/03',  78],
  ['27/03',  160],
  ['28/03',  143],
  ['29/03',  110],
  ['30/03',  208],
  ['31/03',  272],
  ['1/04',  379],
  ['2/04',  477],
  ['3/04',  563],
  ['4/04',  566],
  ['5/04',  605],
]);

var options = {
  backgroundColor: { fill: 'transparent' },
  curveType: 'function',
  hAxis: {
    textStyle:{color: 'gray'}
},
  vAxis: {
    textStyle:{color: 'gray'}
},
  legend: {position: 'bottom', textStyle: {color: 'gray'}},
};


}
