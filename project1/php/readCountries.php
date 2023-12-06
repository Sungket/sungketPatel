<?php
    $jsonString = file_get_contents(__DIR__ . '/../utils/countryBorders.geo.json');
    //change to an array below
    $jsonData = json_decode($jsonString, true);

    // echo $jsonData["features"][2]["properties"]["name"] . "<br />";
    
    // echo $jsonData["features"][2]["properties"]["iso_a2"] . "<br />";

    // echo $jsonData["features"][2]["properties"]["iso_a3"] . "<br />";

    //below gives 175 countries
    $numCountries =  count($jsonData["features"]);
    // echo $numCountries  . "<br />";

    $countries = array();

    $x = 0;

    do {
        array_push($countries, $jsonData["features"][$x]["properties"]["name"]);
        $x++;
    } while ($x < $numCountries);

    // print_r($countries);
    $encodedCountries = json_encode($countries);
    echo $encodedCountries;