<?php
    $jsonString = file_get_contents(__DIR__ . '/../utils/countryBorders.geo.json');
    //change to an array below
    $jsonData = json_decode($jsonString, true);

    // if ($iso == $jsonData["features"]["properties"]["iso_a2"]) {
    //     echo $jsonData["features"]["geometry"]["coordinates"];
    //   };


    //below gives 175 countries
    // $numCountries =  count($jsonData["features"]);

    // $borders = array();

    // $x = 0;

    // do {
    //     $borders[$x] = 
    //         [
    //             "iso_a2" => $jsonData["features"][$x]["properties"]["iso_a2"],
    //             "coordinates" => $jsonData["features"][$x]["geometry"]["coordinates"],
    //         ];
    //     $x++;
    // } while ($x < $numCountries);

    // echo json_encode($borders);

    $encodedCountries = json_encode($jsonData);
    echo $encodedCountries;