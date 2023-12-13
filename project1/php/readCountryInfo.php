<?php
    // $country = $_GET["countryName"];

    $url = "http://api.geonames.org/countryInfo?country=" . "DE" . "&username=sungket";
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HTTPGET, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response_json = curl_exec($ch);
    
    echo $response_json ; 