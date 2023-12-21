<?php
    // $country = $_GET["country"];

    $url = "https://hub.worldpop.org/rest/data/pop";
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HTTPGET, true);
    // curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    //     'User-Agent: testing'
    // ));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response_json = curl_exec($ch);
    
    echo $response_json;