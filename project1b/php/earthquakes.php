<?php
    $north = $_GET["north"];
    $south = $_GET["south"];
    $east = $_GET["east"];
    $west = $_GET["west"];

    $url = "http://api.geonames.org/earthquakesJSON?north=" . $north . "&south=" . $south . "&east=" . $east . "&west=" . $west . "&username=sungket";
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HTTPGET, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response_json = curl_exec($ch);
    
    echo $response_json;