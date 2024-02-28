<?php
    ini_set('display_errors', 'On');
    error_reporting(E_ALL);
    
    $countrycode = $_GET["countrycode"];
    $string = urlencode($countrycode);

    $url = "https://api.opencagedata.com/geocode/v1/json?q=countrycode=" . $string . "&key=172e21212f8e4ad0ab0b91814752f05c";
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HTTPGET, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response_json = curl_exec($ch);

    curl_close($ch);
    
    echo $response_json; 