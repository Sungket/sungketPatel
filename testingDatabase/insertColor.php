<?php

    include ("config.php");

    header('Content-Type: application/json; charset=UTF-8');

	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

    if (mysqli_connect_errno()) {

        $output['status']['code'] = '300';
        $output['status']['name'] = 'failure';
        $output['status']['description'] = 'database unavailable';
        $output['data'] = [];

        mysqli_close($conn);

        echo json_encode($output);

        exit();
    }

    // query takes parameters, hence it is prepared
    $query = $conn->prepare('INSERT INTO colorsCode (color, code) VALUES(?,?)');

    $query->bind_param("ss", $_POST['colorInput'], $_POST['colorCodeInput']);

    $query->execute();

    if (false === $query) {
        $output['status']['code'] = '500';
        $output['status']['name'] = 'failure';
        $output['status']['description'] = 'empty query';
        $output['data'] = [];
        
        mysqli_close($conn);

        echo json_encode($output);

    }

    $output['status']['code'] = '200';
    $output['status']['name'] = 'success';
    $output['data'] = [];
    
    mysqli_close($conn);

    echo "<h2>Your Selection</h2>";
    echo $_POST['colorInput'];
    echo $_POST['colorCodeInput'];

    echo json_encode($output);
    header('Location: index.php');
?>