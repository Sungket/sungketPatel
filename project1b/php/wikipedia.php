<?php
    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $input = urlencode($_GET["input"]);

    $url = "http://api.geonames.org/wikipediaSearch?q=" . $input . "&maxRows=10&username=sungket";

    // $url = "https://en.wikipedia.org/w/api.php?action=opensearch&prop=extracts&exintro&explaintext&format=xml&namespace=0&search=" . $input
    //     . "&limit=5";

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HTTPGET, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response_json = curl_exec($ch);
    curl_close($ch);
    
    echo $response_json;