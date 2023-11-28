<?php
	$lang = $_GET["lang"];
    $country = $_GET["country"];
    $username = $_GET["username"];

    $url = "http://api.geonames.org/countryInfoJSON?formatted=true&lang=" . $lang . "&country=" . $country . "&username=" . $username;
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HTTPGET, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response_json = curl_exec($ch);
    
    echo $response_json ;