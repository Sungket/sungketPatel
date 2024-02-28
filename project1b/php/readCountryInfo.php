<?php
    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $iso = ($_GET["country"]);

    $url = "http://api.geonames.org/countryInfo?country=" . $iso . "&username=sungket";
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HTTPGET, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response_json = curl_exec($ch);

    curl_close($ch);
    
    echo $response_json;