<?php
    $jsonString = file_get_contents(__DIR__ . '/../utils/countryBorders.geo.json');
    $jsonData = json_decode($jsonString, true);

    //the below returns an array
    $coords =  $jsonData["features"][1]["geometry"]["coordinates"];

    $encodedCoords = json_encode($coords);
    echo $encodedCoords;