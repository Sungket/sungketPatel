<?php
    $country = $_GET["country"];

    $url = "http://api.geonames.org/search?q=lake&country=" . $country . "&username=sungket";
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HTTPGET, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response_json = curl_exec($ch);
    
    echo $response_json;