<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

$input = file_get_contents("php://input");
$data = json_decode($input);

echo json_encode([
    "status" => "success",
    "message" => "API is working!",
    "server_time" => date('Y-m-d H:i:s'),
    "request_method" => $_SERVER['REQUEST_METHOD'],
    "received_raw_data" => $input,
    "received_json_data" => $data,
    "get_parameters" => $_GET,
    "post_parameters" => $_POST
]);
?>