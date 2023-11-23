function alerter(){
    alert("hey I'm in script!");
    const country = document.getElementById("selCountry").value;
    alert(country);
}



// $('#btnRun').on(click, function() {
//     alert("we in script");
//     console.log('hi');
//     $.ajax({
//         url: "/php/readInfo.php",
//         type: 'POST',
//         dataType: 'json',
//         data: {
//             country: $('#selCountry').val(),
//             lang: $('#selLanguage').val()
//         },
//         success: function(result) {

//             console.log(JSON.stringify(result));

//             if (result.status.name == "ok") {

//                 $('#txtContinent').html(result['data'][0]['continent']);
//                 $('#txtCapital').html(result['data'][0]['capital']);
//                 $('#txtLanguages').html(result['data'][0]['languages']);
//                 $('#txtPopulation').html(result['data'][0]['population']);
//                 $('#txtArea').html(result['data'][0]['areaInSqKm']);

//             }
        
//         },
//         error: function(jqXHR, textStatus, errorThrown) {
//             // your error code
//         }
//     }); 

// });

// fetch("../php/readinfo.php")
//     .then(response => response.json())
//     .then(data => showInfo(data));

// function showInfo(data) {
//     console.log(data.geonames);
// };

// const reply = url;
// fetch(reply, {cache: 'no-cache'}).then(response => {
//     if(response.ok) {
//         const temp = response.json();
//         console.log(JSON.stringify(temp));
//         return response.json();
//     }
//     throw new Error('Request failed');
// }
// , networkError => {
//     console.log('networkError.message');
// }
// )