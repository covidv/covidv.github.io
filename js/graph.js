let global = "https://services9.arcgis.com/N9p5hsImWXAccRNI/arcgis/rest/services/Nc2JKvYFoAEOFCG5JSI6/FeatureServer/4/query?f=json&where=(UID%20%3C%3E%20840)%20AND%20(Confirmed%3C%3E0)&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=OBJECTID%2CConfirmed%2CReport_Date_String&orderByFields=Report_Date_String%20asc&outSR=102100&resultOffset=0&resultRecordCount=32000&resultType=standard&cacheHint=true"
var dailyCases = [];
var dates = [];
var ctx = document.getElementById('chartHours').getContext("2d");
var chart;

function destroyGraph() {
    if (chart != undefined) {
        chart.destroy();
    }
    chart
}

function generateGraph(countryName) {
    dailyCases = [];
    dates = [];
    $.ajax({
        url: 'https://services9.arcgis.com/N9p5hsImWXAccRNI/arcgis/rest/services/Nc2JKvYFoAEOFCG5JSI6/FeatureServer/4/query?' +
            'f=json' +
            '&where=(UID%20%3C%3E%20840)%20AND%20(Confirmed%3C%3E0)%20AND%20(Country_Region%3D%27' + countryName + '%27)' +
            '&returnGeometry=false' +
            '&spatialRel=esriSpatialRelIntersects' +
            '&outFields=OBJECTID%2CConfirmed%2CReport_Date_String' +
            '&orderByFields=Report_Date_String%20asc' +
            '&outSR=102100&resultOffset=0&resultRecordCount=32000' +
            '&resultType=standard' +
            '&cacheHint=true',
        dataType: 'json',
        success: function (response) {
            Object.keys(response.features).forEach(function (key) {
                dailyCases.push(response.features[key].attributes.Confirmed);
                dates.push(response.features[key].attributes.Report_Date_String.substring(5));
            });
            updateGraph();
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function updateGraph() {
    if (chart != undefined) {
        chart.destroy();
    }
    chart = new Chart(ctx, {
        type: 'line',

        data: {
            labels: dates,
            datasets: [{
                borderColor: "#f17e5d",
                backgroundColor: "rgb(204,204,0, 0.3)",
                pointRadius: 2,
                borderWidth: 3,
                label: "Cases",
                data: dailyCases
            }]
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
                        fontColor: "#9f9f9f",
                        maxTicksLimit: 7,
                    },
                    gridLines: {
                        drawBorder: true,
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
                        fontColor: "#9f9f9f",
                        maxTicksLimit: 12
                    }
                }]
            },
        }
    });
}