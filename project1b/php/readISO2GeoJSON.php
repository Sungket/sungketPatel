<?php
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

    $jsonString = file_get_contents(__DIR__ . '/../utils/countryBorders.geo.json');
    //change to an array below
    $jsonData = json_decode($jsonString, true);

    //below gives 175 countries
    $numCountries =  count($jsonData["features"]);

    $countries = array();

    $x = 0;

    do {
        $countries[$x] = 
            [
                "name" => $jsonData["features"][$x]["properties"]["name"],
                "iso_a2" => $jsonData["features"][$x]["properties"]["iso_a2"],
                "iso_a3" => $jsonData["features"][$x]["properties"]["iso_a3"],
                "iso_n3" => $jsonData["features"][$x]["properties"]["iso_n3"],
            ];
        $x++;
    } while ($x < $numCountries);

    echo json_encode($countries);