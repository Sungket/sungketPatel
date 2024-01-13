<?php
    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $country = $_GET["country"];

    $url = "https://newsapi.org/v2/top-headlines?country=" . $country . "&pageSize=10&apiKey=b9b539d3256c4a5e8f5f838814eca746";
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HTTPGET, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'User-Agent: testing'
    ));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response_json = curl_exec($ch);

    curl_close($ch);
    
    echo $response_json;