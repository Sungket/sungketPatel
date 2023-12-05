<?php
    // $path = 'utils/countryBorders.geo.json';
    $jsonString = file_get_contents(__DIR__ . '/../utils/countryBorders.geo.json');
    echo $jsonString;