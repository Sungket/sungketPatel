<?php
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);
    
    $city = urlencode($_GET["city"]);

    $url = "http://api.weatherapi.com/v1/forecast.json?key=6242e9eb22454acc88a81609232612&q=" . $city . "&days=" . 3;
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HTTPGET, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response_json = curl_exec($ch);
    curl_close($ch);
    
    echo $response_json ;