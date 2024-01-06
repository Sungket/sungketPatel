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
        $countries[$x] = 
            [
                "name" => $jsonData["features"][$x]["properties"]["name"],
                "iso_a2" => $jsonData["features"][$x]["properties"]["iso_a2"]
            ];
        $x++;
    } while ($x < $numCountries);

    echo json_encode($countries);