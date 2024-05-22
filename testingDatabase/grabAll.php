<?php
    
    include 'config.php';

    $conn = new mysqli($cd_host, $cd_port, $cd_socket, $cd_dbname, $cd_user, $cd_password);

    if ($conn -> connect_errno) {
        echo "Failed to connect to database";
        mysqli_close($conn);
        exit();
    }

    $query = $conn->prepare('SELECT firstName FROM personnel');

    //$query->bind_param("s", $firstName);

    $result = $conn->query($query);

    if (!$result) {
        $output['status']['code'] = '400';
        mysqli_close($conn);
        echo json_encode($output);

        exit();
    }

    $data = [];

    while ($row = mysqli_fetch_assoc($result)) {
        array_push($data, $row);
    }
    $output['data'] = $data;

    mysqli_close($conn);

    echo json_encode($output);
?>
