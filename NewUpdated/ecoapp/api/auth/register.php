<?php
// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    // Tambahkan header CORS untuk preflight
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

if (!empty($data->name) && !empty($data->email) && !empty($data->password)) {
    $database = new Database();
    $db = $database->getConnection();
    
    // Simpan ke variabel
    $email = $data->email;
    
    // Cek email duplikat
    $query = "SELECT id FROM users WHERE email = :email";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":email", $email);
    $stmt->execute();
    
    if ($stmt->rowCount() > 0) {
        http_response_code(400);
        echo json_encode(array("message" => "Email sudah digunakan."));
        exit();
    }
    
    // Hash password
    $password_hash = password_hash($data->password, PASSWORD_BCRYPT);
    
    // Simpan semua ke variabel
    $username = $data->name;
    $full_name = $data->name;
    $phone = $data->phone ?? '';
    $address = $data->address ?? '';
    $role = $data->role ?? 'user';
    
    // Insert user baru
    $query = "INSERT INTO users (username, email, password, full_name, phone, address, role) 
              VALUES (:username, :email, :password, :full_name, :phone, :address, :role)";
    $stmt = $db->prepare($query);
    
    $stmt->bindParam(":username", $username);
    $stmt->bindParam(":email", $email);
    $stmt->bindParam(":password", $password_hash);
    $stmt->bindParam(":full_name", $full_name);
    $stmt->bindParam(":phone", $phone);
    $stmt->bindParam(":address", $address);
    $stmt->bindParam(":role", $role);
    
    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(array("message" => "Pendaftaran berhasil!", "status" => "success"));
    } else {
        http_response_code(500);
        echo json_encode(array("message" => "Gagal mendaftar."));
    }
} else {
    http_response_code(400);
    echo json_encode(array(
        "message" => "Data tidak lengkap.",
        "received_data" => $data,
        "raw_input" => file_get_contents("php://input")
    ));
}
?>