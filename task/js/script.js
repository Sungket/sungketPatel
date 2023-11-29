function processInput(){
    let country = document.getElementById('selCountry').value;
    
    //ajax calls the PHP then endpoint from PHP

    $.ajax({url: "http://localhost/projects/task/php/readInfo.php?country=" + country + "&username=sungket&style=full", success: function(result){
        parser = new DOMParser();
        neighbours = parser.parseFromString(result, "text/xml");
        let names = neighbours.getElementsByTagName("name");
        let outputString = "";
        for (let i = 0; i < names.length; i++) {
            let name = names[i].firstChild.nodeValue;
            console.log(name);
            outputString += name + ", ";
        }
        document.getElementById('countries').innerHTML = outputString;
    }});

    //   $.ajax({url: "http://localhost/projects/task/php/readInfo.php?formatted=true&lang="+lang + "&country=" + land + "&username=sungket&style=full", success: function(result){
    //     const countries = JSON.parse(result);
    //     document.getElementById('country').innerHTML = countries.geonames[0].countryName;
    //     document.getElementById('area').innerHTML = countries.geonames[0].areaInSqKm;
    //     document.getElementById('capital').innerHTML =countries.geonames[0].capital;
    //     document.getElementById('continent').innerHTML = countries.geonames[0].continent;
    //     document.getElementById('currency').innerHTML = countries.geonames[0].currencyCode;
    //     document.getElementById('population').innerHTML = countries.geonames[0].population;
    //     document.getElementById('language').innerHTML = countries.geonames[0].languages;
    //   }});
}

function processTimezone() {
    let lat = document.getElementById('lat').value;
    let long = document.getElementById('long').value;
    //JS calls the endpoint directly
    let url = "http://api.geonames.org/timezoneJSON?lat=" + lat + "&lng=" + long + "&username=sungket&style=full";
    
    $.ajax({url: url, success: function(result){
        //below coming back as JSON object - no need to parse 
        const gmtOffset = result.gmtOffset;
        document.getElementById('timezone').innerHTML = `Timezone: GMT: ${gmtOffset < 0 ? "" : "+"}${gmtOffset}`;
      }});
}

function processEQ() {
    let north = document.getElementById('north').value;
    let east = document.getElementById('east').value;
    let south = document.getElementById('south').value;
    let west = document.getElementById('west').value;

    $.ajax({url: "http://localhost/projects/task/php/readEq.php?north=" + north + "&south=" + south + "&east=" + east + "&west=" + west + "&username=sungket&style=full", success: function(result){     
        const eqList = JSON.parse(result);
        try {
            document.getElementById('earthq').innerHTML = `Date: ${eqList.earthquakes[0].datetime} \n \
            Depth: ${eqList.earthquakes[0].depth} \n \
            Longitude: ${eqList.earthquakes[0].lng} \n \
            Latitude: ${eqList.earthquakes[0].lat} \n \
            Magnitude: ${eqList.earthquakes[0].magnitude}`;
        }
        catch(err) {
            document.getElementById('earthq').innerHTML = "No recorded recent earthquakes for the values given. Try a larger area."
        }
      }});
}