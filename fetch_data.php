<?php
header("Cache-Control: no-cache");

$url = "https://gandacel.ro/code_tests/testData.txt";
$data = @file_get_contents($url);

if ($data === FALSE) {
    http_response_code(500);
    echo "Failed to fetch data.";
    exit;
}

header("Content-Type: text/plain");
echo $data;
?>