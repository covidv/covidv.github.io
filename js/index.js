/** for refernce purpose:-
 *  
 *  $('#country-list'); side nav bar collection
 *  $('#location-card'); Location Card
 *  $('#total-cases'); Total Cases Card
 *  $('#total-deaths'); Total Death Card
 *  $('#total-recovered'); Total Recovered Card
 * 
**/

var countryArray = [];
var globalCases = 0;
var globalDeath = 0;
var globalRecover = 0;
var lastUpdate = 0;
var timeElapsed;
var suffix = '';
var countryListHTML = ``;

//get data country wise

$.ajax({
    url: 'https://services9.arcgis.com/N9p5hsImWXAccRNI/arcgis/rest/services/Nc2JKvYFoAEOFCG5JSI6/FeatureServer/2/query?' +
        'f=json' +
        '&where=1%3D1' +
        '&returnGeometry=false' +
        '&spatialRel=esriSpatialRelIntersects' +
        '&outFields=*' +
        '&orderByFields=Confirmed%20desc' +
        '&outSR=102100' +
        '&resultOffset=0' +
        '&resultRecordCount=190' +
        '&cacheHint=true',
    dataType: 'json',
    success: function (response) {
        Object.keys(response.features).forEach(function (key) {
            countryArray.push(response.features[key].attributes);
        });

        countryArray.forEach((country) => {
            globalCases += country.Confirmed;
            globalDeath += country.Deaths;
            globalRecover += country.Recovered;

            countryListHTML += `<li>
                                    <a style="text-decoration: none; color: white;" href="javascript: selectCountry('${country.Country_Region}')">
                                        <p><img src="https://img.shields.io/badge/-${country.Confirmed}-red" alt="count"> &nbsp;${country.Country_Region}</p>
                                    </a>
                                </li>`;

            if (lastUpdate < country.Last_Update) {
                lastUpdate = country.Last_Update;
            }
        });

        selectCountry('global');
        // Country List Elements
        $('#country-list').append(countryListHTML);
    },
    error: function (error) {
        alert("Somthing went wrong!! please visit later..");
    }
});

var searchForm = document.querySelector('#search-form');
if (searchForm != null) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log("Search bar implementation is pending");
    });
}

function setLastUpdatedTime(stamp) {
    timeElapsed = (new Date() - new Date(stamp)) / (1000);
    suffix = 'sec ago';
    if (timeElapsed >= 60) {
        timeElapsed = timeElapsed / 60;
        suffix = 'min ago';
        if (timeElapsed >= 60) {
            timeElapsed = timeElapsed / 60;
            suffix = 'hours ago';
        }
    }
    $('#lastUpdate-card').text(Math.floor(timeElapsed) + ' ' + suffix);
}

function animateNumbers() {
    $('#total-cases').counterUp({
        delay: 10,
        time: 500
    });
    $('#total-deaths').counterUp({
        delay: 10,
        time: 500
    });
    $('#total-recovered').counterUp({
        delay: 10,
        time: 500
    });
}

function selectCountry(name) {
    if (name == 'global') {
        $('#location-card').text('Global');
        $('#total-cases').text(globalCases);
        $('#total-deaths').text(globalDeath);
        $('#total-recovered').text(globalRecover);
        setLastUpdatedTime(lastUpdate);
    } else {
        var searched = countryArray.find(element => element.Country_Region == name)
        $('#location-card').text(searched.Country_Region);
        $('#total-cases').text(searched.Confirmed);
        $('#total-deaths').text(searched.Deaths);
        $('#total-recovered').text(searched.Recovered);
        setLastUpdatedTime(searched.Last_Update);
    }
    $("#bodyClick").click();
    animateNumbers();
    if (name != 'global' && name != 'US') {
        generateGraph(name);
        console.log("Creating Graph");
    } else {
        destroyGraph();
    }
}