let land;
let lang;

function alerter(){
// ***********************************************************
    land = document.getElementById('selCountry').value;
    lang = document.getElementById('selLanguage').value;
    let hr = new XMLHttpRequest();
    //JS calls the endpoint directly
    let url = "http://api.geonames.org/countryInfoJSON?formatted=true&lang="+lang + "&country=" + land + "&username=flightltd&style=full";
    
    $.ajax({url: url, success: function(result){
        //below coming back as JSON object - no need o parse 
        console.log(result);
      }});
    
    //this method calls the PHP then endpoint from PHP
      $.ajax({url: "http://localhost/projects/task/php/readInfo.php?formatted=true&lang="+lang + "&country=" + land + "&username=flightltd&style=full", success: function(result){
        const countries = JSON.parse(result);
        document.getElementById('country').innerHTML = countries.geonames[0].countryName;
        document.getElementById('area').innerHTML = countries.geonames[0].areaInSqKm;
        document.getElementById('capital').innerHTML =countries.geonames[0].capital;
        document.getElementById('continent').innerHTML = countries.geonames[0].continent;
        document.getElementById('currency').innerHTML = countries.geonames[0].currencyCode;
        document.getElementById('population').innerHTML = countries.geonames[0].population;
        document.getElementById('language').innerHTML = countries.geonames[0].languages;
      }});
    

    
    hr.open("POST", url, true);
    hr.setRequestHeader = function() {
        console.log(hr);
        if (this.status == 200) {
            let countries = JSON.parse(result).replace("[", "");
            let country = countries.continent;
            let areaInSqKm
            let capital
            let continent
            let currency
            let population
            let languages
            let north
            let east
            let south
            let west
            // countries.forEach(element => {
            //     console.log(element);
            //     //country = countries.countryName;
            //     areaInSqKm = element.areaInSqKm;
            //     capital = element.capital;
            //     continent = element.continentName;
            //     currency = element.currencyCode;
            //     population = element.population;
            //     languages = element.languages;
            //     north = element.north;
            //     east = element.east;
            //     south = element.south;
            //     west = element.west;
                document.getElementById('country').innerHTML = country;
                document.getElementById('area').innerHTML = areaInSqKm; 
                document.getElementById('capital').innerHTML = capital;
                document.getElementById('continent').innerHTML = continent;
                document.getElementById('currency').innerHTML = currency;
                document.getElementById('population').innerHTML = population;
                document.getElementById('language').innerHTML = languages;
            //)
            
    };
    hr.send();


// -----------------------------------------------------------




     
         

}}