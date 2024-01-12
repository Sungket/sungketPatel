<?php
    ini_set('display_errors', 'On');
    error_reporting(E_ALL);
    
    $iso = $_GET["isoa2"];

    $url = "https://restcountries.com/v3.1/alpha/" . $iso;
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HTTPGET, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response_json = curl_exec($ch);

    curl_close($ch);
    
    echo $response_json; 