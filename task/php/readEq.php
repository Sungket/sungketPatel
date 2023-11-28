<?php
    $north = $_GET["north"];
    $east = $_GET["east"];
    $south = $_GET["south"];
    $west = $_GET["west"];

    $url = "http://api.geonames.org/earthquakesJSON?north=" . $north ."&south=" . $south . "&east=" . $east . "&west=" . $west . "&username=sungket&style=full";
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HTTPGET, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response_json = curl_exec($ch);
    
    echo $response_json ;