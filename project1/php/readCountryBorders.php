<?php
    $jsonString = file_get_contents(__DIR__ . '/../utils/countryBorders.geo.json');
    //change to an array below
    $jsonData = json_decode($jsonString, true);

    //below gives 175 countries
    // $numCountries =  count($jsonData["features"]);

    // $countries = array();

    // $x = 0;

    // do {
    //     $countries[$x] = [
    //         "iso_a2" => $jsonData["features"][$x]["properties"]["iso_a2"],
    //         "coordinates" => $jsonData["features"][$x]["geometry"]["coordinates"]
    //     ];
    //     $x++;
    // } while ($x < $numCountries);

    // print_r($countries);
    $encodedCountries = json_encode($jsonData);
    echo $encodedCountries;