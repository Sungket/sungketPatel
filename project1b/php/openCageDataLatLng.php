<?php
    ini_set('display_errors', 'On');
    error_reporting(E_ALL);
    
    $lat = $_GET["lat"];
    $lng = $_GET["lng"];

    $url = "https://api.opencagedata.com/geocode/v1/json?q=" . $lat . ",+" . $lng . "&key=172e21212f8e4ad0ab0b91814752f05c&language=en&pretty=1";
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HTTPGET, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response_json = curl_exec($ch);

    curl_close($ch);
    
    echo $response_json; 