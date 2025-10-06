<?php
include_once '../config/database.php';
include_once '../middleware/cors.php';

$database = new Database();
$db = $database->getConnection();

// Debug: Log raw input
$rawInput = file_get_contents("php://input");
error_log("Raw input: " . $rawInput);

$data = json_decode($rawInput);

// Debug: Log decoded data
error_log("Decoded data: " . print_r($data, true));

if(!empty($data->name) && !empty($data->email) && !empty($data->password)) {
    $name = $data->name;
    $email = $data->email;
    $password = $data->password;

    // Check if user exists
    $query = "SELECT id FROM users WHERE email = :email";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":email", $email);
    $stmt->execute();

    if($stmt->rowCount() > 0) {
        http_response_code(400);
        echo json_encode(array("message" => "Email sudah terdaftar."));
        exit;
    }

    // Insert new user
    $query = "INSERT INTO users SET name=:name, email=:email, password=:password, balance=0";
    $stmt = $db->prepare($query);

    $stmt->bindParam(":name", $name);
    $stmt->bindParam(":email", $email);
    
    // Hash password
    $password_hash = password_hash($password, PASSWORD_DEFAULT);
    $stmt->bindParam(":password", $password_hash);

    if($stmt->execute()) {
        http_response_code(201);
        echo json_encode(array("message" => "User berhasil didaftarkan!"));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Tidak dapat mendaftarkan user."));
    }
} else {
    http_response_code(400);
    echo json_encode(array(
        "message" => "Data tidak lengkap.",
        "received_data" => $data,
        "raw_input" => $rawInput
    ));
}
?>