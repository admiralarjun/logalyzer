<?php

// File path for the log
$logFilePath = __DIR__ . DIRECTORY_SEPARATOR . 'apache.log';

// Function to log information
function logRequest() {
    global $logFilePath;
    // Create the file if it doesn't exist
    if (!file_exists($logFilePath)) {
        $file = fopen($logFilePath, "w");
        fclose($file);
    }
    // Get the uploaded files
    $uploadedFiles = '';
    // Get the contents of the uploaded files
    $fileContents = '';

    if (!empty($_FILES)) {
        $uploadedFiles = json_encode($_FILES);
        foreach ($_FILES as $file) {
            // Check if the file is an image and tmp_name is not empty
            if (!empty($file['tmp_name']) && strpos($file['type'], 'image') !== false) {
                // If it's an image, base64 encode the file contents
                $fileContents .= base64_encode(file_get_contents($file['tmp_name']));
            } elseif (!empty($file['tmp_name'])) {
                // If it's not an image, just get the file contents
                $fileContents .= file_get_contents($file['tmp_name']);
            }
        }
    }

    $logData = date('Y-m-d H:i:s') . " | "
        . $_SERVER['REQUEST_METHOD'] . " | "
        . $_SERVER['REQUEST_URI'] . " | "
        . $uploadedFiles . " | " // Include the uploaded files
        . $fileContents . " | " // Include the contents of the uploaded files
        . json_encode($_REQUEST) . "\n";

    file_put_contents($logFilePath, $logData, FILE_APPEND);
}

// Log the current request
logRequest();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Playground</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <style>
        .background-container {
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            padding: 20px;
            border-radius: 10px;
        }
        .form-container {
            background-color: rgba(255, 255, 255, 0.8);
            padding: 20px;
            border-radius: 10px;
            width: 30%; /* Reduce the width of the form */
            height: 60%; /* Increase the height of the form */
            margin: auto; /* Center the form */
        }
        #pranavi{
            background-image: url('background.jpeg');
        }
        /* Override Bootstrap styles */
        .container-fluid {
            padding-left: 0;
            padding-right: 0;
        }
        .row {
            margin-left: 0;
            margin-right: 0;
        }
    </style>
</head>
<body>
    <nav class="navbar bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img src="icon.png" alt="Logo" width="30" height="30" class="d-inline-block align-text-top">
                CENTRAL RESERVE POLICE FORCE
            </a>
        </div>
    </nav>
    <div id="pranavi">
        <br><br><br><br><br><br>
        <div class="row justify-content-center background-container" >
            <div class="form-container">
            <form action="" method="post" class="row g-3" enctype="multipart/form-data">
                <div class="col-12">
                    <label for="username">Username:</label>
                    <input type="text" name="username" id="xss_input" value="" class="form-control" required  title="Only alphanumeric characters are allowed" pattern="^[a-zA-Z0-9]+$">
                </div>
                <div class="col-12">
                    <label for="password">Password:</label>
                    <input type="text" name="password" id="xss_input" value="" class="form-control" required  title="Only alphanumeric characters are allowed" pattern="^[a-zA-Z0-9]+$">
                </div>
                <div class="col-12">
                    <label for="file">File:</label>
                    <input type="file" name="file" id="file" class="form-control">
                </div>
                <div class="col-12">
                    <button type="submit" class="btn btn-primary mt-4">Submit</button>
                </div>
            </form>
            </div>
        </div>
        <br><br><br><br><br>
    </div>
</body>
</html>

