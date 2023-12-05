<?php
    $url = "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=7b964a710daaa3af6d297d5f54bc105d";
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HTTPGET, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response_json = curl_exec($ch);
    
    echo $response_json ; 