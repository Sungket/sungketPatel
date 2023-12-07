<?php
    $countIdx = (isset($_GET['countryIndex'])) ? $_GET['countryIndex'] : 0;
    echo 'The country index is: ' . $countIdx;

    $jsonString = file_get_contents(__DIR__ . '/../utils/countryBorders.geo.json');
    $jsonData = json_decode($jsonString, true);

    //the below returns an array
    $coords =  $jsonData["features"][$countIdx]["geometry"]["coordinates"];

    $encodedCoords = json_encode($coords);
    echo $encodedCoords;