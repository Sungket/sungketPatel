<?php

    $time = microtime(true);

    $url = "https://newsapi.org/v2/everything?q=tesla&from=2024-04-22&sortBy=publishedAt&apiKey=b9b539d3256c4a5e8f5f838814eca746";

    $ch = curl_init($url);

    curl_setopt($ch);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'User-Agent: testing'
    ));

    $response_json = curl_exec($ch);

    curl_close($ch);

    echo $response_json;
?>
