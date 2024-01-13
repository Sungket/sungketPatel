<?php
    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $north = $_GET["north"];
    $south = $_GET["south"];
    $east = $_GET["east"];
    $west = $_GET["west"];

    $url = "http://api.geonames.org/earthquakesJSON?north=" . $north . "&south=" . $south . "&east=" . $east . "&west=" . $west . "&username=sungket";
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HTTPGET, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response_json = curl_exec($ch);

    curl_close($ch);
    
    echo $response_json;