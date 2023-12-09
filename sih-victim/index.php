<?php

// File path for the log
$logFilePath = __DIR__ . DIRECTORY_SEPARATOR . 'app_log.log';

// Function to log information
function logRequest() {
    global $logFilePath;
    
    $logData = date('Y-m-d H:i:s') . " | "
        . $_SERVER['REQUEST_METHOD'] . " | "
        . $_SERVER['REQUEST_URI'] . " | "
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
</head>
<body>
    <h1>PHP Playground</h1>

    <form action="" method="post">
        <label for="xss_input">XSS Playground:</label>
        <input type="text" name="xss_input" id="xss_input" value="">

        <label for="sql_injection_input">SQL Injection Playground:</label>
        <input type="text" name="sql_injection_input" id="sql_injection_input" value="">

        <button type="submit">Submit</button>
    </form>

    <h2>Log File Contents:</h2>
    <pre><?php echo file_get_contents($logFilePath); ?></pre>
</body>
</html>
