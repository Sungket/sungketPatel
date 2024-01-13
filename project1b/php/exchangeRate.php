<?php
    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $symbol = $_GET["symbols"];

    $url = "https://openexchangerates.org/api/latest.json?app_id=44a738b0aab34f73906f57e69037439a&symbols=" . $symbol;
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HTTPGET, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response_json = curl_exec($ch);
    curl_close($ch);
    
    echo $response_json ; 