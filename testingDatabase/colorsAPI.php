<?php
    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $jsonString = file_get_contents(__DIR__ . '/css-color-names.json');

    //now change it into an array
    $jsonData = json_decode($jsonString, true);

    $colors = [];

    $x = 0;

    echo json_encode($jsonData);
?>