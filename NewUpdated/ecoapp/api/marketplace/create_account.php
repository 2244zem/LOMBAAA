<?php
// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    exit();
}

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");

include_once '../config/database.php';

$data = json_decode(file_get_contents("php://input"));
if (!empty($data->user_id)) {
    $db = (new Database())->getConnection();
    
    // Cek apakah akun marketplace sudah ada
    $stmt = $db->prepare("SELECT id FROM marketplace_sellers WHERE user_id = ?");
    $stmt->execute([$data->user_id]);
    
    if ($stmt->rowCount() == 0) {
        // Buat akun baru
        $stmt = $db->prepare("INSERT INTO marketplace_sellers (user_id, name, created_at) VALUES (?, ?, NOW())");
        $stmt->execute([$data->user_id, $data->name]);
    }
    
    echo json_encode(['success' => true]);
} else {
    http_response_code(400);
    echo json_encode(['error' => 'User ID required']);
}
?>