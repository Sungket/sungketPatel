<?php
    $lat = $_GET["lat"];
    $long = $_GET["long"];

    $url = "http://api.geonames.org/timezoneJSON?lat=" . $lat . "&lng=" . $long . "&username=sungket&style=full";
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HTTPGET, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response_json = curl_exec($ch);
    
    echo $response_json ;