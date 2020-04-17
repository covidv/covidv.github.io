function ThisLoc(ca){
    console.log(ca);
}


function UpdateMap(){
    fetch('https://corona.lmao.ninja/v2/countries?sort=country')
    .then(res => {
        return res.json()}) 
    .then(respo => {
        console.log(respo);
        console.log(respo[0].countryInfo.lat);
        respo.forEach( element => {
            latitude = element.countryInfo.lat;
            longitude = element.countryInfo.long;

            cases= element.cases;
            if(cases>255){
                color = "rgb(255,0,0)";
            }
            else{
                color = `rgb(${cases},0,0)`;
            }
            new mapboxgl.Marker({
                draggable: false,
                color: color
                })
                .setLngLat([longitude, latitude])
                .addTo(map);    

                
                
                // var brk = element.split("|");
                var monument = [longitude, latitude];
                // var $new = $([])
                var popup = new mapboxgl.Popup({ offset: 50 }).setText(
                // 'Construction on the Washington Monument began in 1848.'
                   
                ` ${element.country}  ⬞  `  + 
                ` Confirmed Cases : ${element.cases} ◾ Deaths: ${element.deaths} ◾ Active: ${element.active} ◾ Recovered: ${element.recovered} ◾ Critical: ${element.critical} ◾ Today Cases: ${element.todayCases} ◾ Today Deaths: ${element.todayDeaths}`,  
                
            )

                    
            // var cat = new mapboxgl.Popup({ offset: 50 }).setText(⬤
            //     // 'Construction on the Washington Monument began in 1848.'
                   
            //     ` ${element.country} |  
            //     Confirmed Casesdssd : ${element.cases}  
            //     Deaths ` + popup,
            // );
             
            // create DOM element for the marker
            var el = document.createElement('div');
            el.id = 'marker';
             
            // create the marker
            new mapboxgl.Marker(el)
            .setLngLat(monument)
            
            .setPopup(popup)
             // sets a popup on this marker
            .addTo(map);
            
        })
        
    })
}
UpdateMap();
function UpdateMap1(){
    fetch('https://corona.lmao.ninja/v2/all')
    .then(res => {
        return res.json()}) 
    .then(data => {
        console.log(data);
        console.log(data.cases);
    })
}
UpdateMap1();
// function UpdateMap2(){
//     fetch('https://corona.lmao.ninja/states')
//     .then(res => {
//         return res.json()}) 
//     .then(data => {
//         console.log(data);
//     })
// }
// UpdateMap2();