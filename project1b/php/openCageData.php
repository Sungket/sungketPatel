<?php
    $lat = $_GET["lat"];
    $long = $_GET["lng"];

    $url = "https://api.opencagedata.com/geocode/v1/json?q=" . $lat . "+" . $long . "&key=172e21212f8e4ad0ab0b91814752f05c";
    // $url = "https://api.opencagedata.com/geocode/v1/json?&countrycode=" . "de" . "&key=172e21212f8e4ad0ab0b91814752f05c";
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HTTPGET, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response_json = curl_exec($ch);
    
    echo $response_json ; 