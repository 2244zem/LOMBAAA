<?php
// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    exit();
}

// Header CORS untuk response biasa
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->email) && !empty($data->password)) {
    $database = new Database();
    $db = $database->getConnection();
    
    // Simpan ke variabel
    $email = $data->email;
    
    $query = "SELECT id, username, email, password, full_name, role FROM users WHERE email = :email";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":email", $email);
    $stmt->execute();
    
    if ($stmt->rowCount() == 1) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (password_verify($data->password, $row['password'])) {
            $token = bin2hex(random_bytes(32));
            
            http_response_code(200);
            echo json_encode(array(
                "message" => "Login berhasil!",
                "status" => "success",
                "user" => array(
                    "id" => $row['id'],
                    "username" => $row['username'],
                    "email" => $row['email'],
                    "full_name" => $row['full_name'],
                    "role" => $row['role']
                ),
                "token" => $token
            ));
        } else {
            http_response_code(401);
            echo json_encode(array("message" => "Password salah."));
        }
    } else {
        http_response_code(401);
        echo json_encode(array("message" => "Email tidak ditemukan."));
    }
} else {
    http_response_code(400);
    echo json_encode(array(
        "message" => "Email dan password wajib diisi.",
        "received_data" => $data,
        "raw_input" => file_get_contents("php://input")
    ));
}
?>