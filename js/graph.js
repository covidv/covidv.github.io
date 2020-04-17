var dailyReport = [];
var dates = [];
var mainLandChina = [];
var otherLocation = [];
var totalRecovered = [];

$.ajax({
    url: 'https://services9.arcgis.com/N9p5hsImWXAccRNI/arcgis/rest/services/PmO6oUpJizhI0jM8pu3n/FeatureServer/0/query?' +
        'f=json' +
        '&where=1%3D1' +
        '&returnGeometry=false' +
        '&spatialRel=esriSpatialRelIntersects' +
        '&outFields=*' +
        '&orderByFields=Report_Date_String%20asc' +
        '&resultOffset=0' +
        '&resultRecordCount=10000' +
        '&cacheHint=true',
    dataType: 'json',
    success: function (response) {
        Object.keys(response.features).forEach(function (key) {
            dailyReport.push(response.features[key].attributes);
        });
        dailyReport.forEach((day) => {
            dates.push((new Date(day.Report_Date).getDate() + '/' + (new Date(day.Report_Date).getMonth() + 1)));
            mainLandChina.push(day.Mainland_China);
            otherLocation.push(day.Other_Locations);
            totalRecovered.push(day.Total_Recovered);
        });
        createGraph();
    },
    error: function (error) {
        setHardCodedResult();
        createGraph();
    }
});

function setHardCodedResult() {
    }

function createGraph() {

    ctx = document.getElementById('chartHours').getContext("2d");
    
    myChart = new Chart(ctx, {
        type: 'line',

        data: {
            labels: dates,
            datasets: [{
                borderColor: "red",
                backgroundColor: "rgb(0,0,0,0)",
                pointRadius: 2,
                pointHoverRadius: 4,
                borderWidth: 3,
                label: "MainLand China",
                data: mainLandChina
            },
            {
                borderColor: "yellow",
                backgroundColor: "rgb(0,0,0,0)",
                pointRadius: 2,
                pointHoverRadius: 4,
                borderWidth: 3,
                label: "Other Locations",
                data: otherLocation
            },
            {
                borderColor: "green",
                backgroundColor: "rgb(0,0,0,0)",
                pointRadius: 2,
                pointHoverRadius: 4,
                borderWidth: 3,
                label: "Total Recovered",
                data: totalRecovered
            }
            ]
        },
        options: {
            legend: {
                display: true
            },

            tooltips: {
                enabled: true
            },

            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "black",
                        beginAtZero: true,
                        maxTicksLimit: 7,
                    },
                    gridLines: {
                        drawBorder: false,
                        zeroLineColor: "#ccc",
                        color: 'rgba(0,0,0,0.1)'
                    }

                }],
                xAxes: [{
                    gridLines: {
                        drawBorder: false,
                        color: 'rgba(0,0,0,0.1)'
                    },
                    ticks: {
                        padding: 20,
                        fontColor: "black",
                        maxTicksLimit: 7
                    }
                }]
            },
        }
    });
}