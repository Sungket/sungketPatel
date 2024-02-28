<?php
    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $value = $_POST["value"];

    $jsonString = file_get_contents(__DIR__ . '/../utils/countryBorders.geo.json');
    //change to an array below
    $jsonData = json_decode($jsonString, true);

    $coords = null;
    foreach($jsonData['features'] as $item) {
        if($item['properties']['iso_a2'] === $value)
        {
            $coords = $item;
            break;
        }
    }

    $encodedCoords = json_encode($coords);
    echo $encodedCoords;