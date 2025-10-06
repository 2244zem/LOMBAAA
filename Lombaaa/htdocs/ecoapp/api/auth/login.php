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

if(!empty($data->email) && !empty($data->password)) {
    $email = $data->email;
    $password = $data->password;

    $query = "SELECT id, name, email, password, balance FROM users WHERE email = :email";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":email", $email);
    $stmt->execute();

    if($stmt->rowCount() == 1) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $id = $row['id'];
        $name = $row['name'];
        $email = $row['email'];
        $balance = $row['balance'];
        $password_hash = $row['password'];

        if(password_verify($password, $password_hash)) {
            $token = base64_encode(json_encode([
                "id" => $id,
                "email" => $email,
                "exp" => time() + (60 * 60)
            ]));

            http_response_code(200);
            echo json_encode(array(
                "message" => "Login berhasil!",
                "token" => $token,
                "user" => array(
                    "id" => $id,
                    "name" => $name,
                    "email" => $email,
                    "balance" => $balance
                )
            ));
        } else {
            http_response_code(401);
            echo json_encode(array("message" => "Email atau password salah."));
        }
    } else {
        http_response_code(401);
        echo json_encode(array("message" => "Email atau password salah."));
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