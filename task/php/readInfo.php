<?php
	$lang = $_GET["lang"];
    $country = $_GET["country"];
    $username = $_GET["username"];

    // $curl = curl_init();

    // curl_setopt($curl, CURLOPT_URL, "http://api.geonames.org/countryInfoJSON?formatted=true&lang=" + $lang + "&country=" + $country + "&username=" + $username);
    // curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

    // $response = curl_exec($curl);
    // $err = curl_error($curl);

    // curl_close($curl);

    // $decode = json_decode($response,true);
    // $output = $decode['geonames'];

    // header('Content-Type: application/json; charset=UTF-8');

	// echo $output;

    $url = "http://api.geonames.org/countryInfoJSON?formatted=true&lang=" . $lang . "&country=" . $country . "&username=" . $username;
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HTTPGET, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response_json = curl_exec($ch);
    // curl_close($ch);
    // $response=json_encode($response_json, true);
    
    echo $response_json ;