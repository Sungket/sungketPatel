<?php
    ini_set('display_errors', 'On');
    error_reporting(E_ALL);
    
    $location = urlencode($_GET["loc"]);

    $url = "https://api.unsplash.com/search/photos?client_id=-XaASejYt46HYWe09jaYb-vGStiVTgCx6X-voQJ0DmI&query=" . $location;
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HTTPGET, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response_json = curl_exec($ch);

    curl_close($ch);
    
    echo $response_json; 