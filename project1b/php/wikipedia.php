<?php
    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $input = urlencode($_GET["input"]);

    $url = "http://api.geonames.org/wikipediaSearch?q=" . $input . "&maxRows=3&username=sungket";
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HTTPGET, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response_json = curl_exec($ch);
    
    echo $response_json;