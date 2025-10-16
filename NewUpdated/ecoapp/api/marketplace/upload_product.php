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
if (!empty($data->name) && !empty($data->price) && !empty($data->seller_id)) {
    $db = (new Database())->getConnection();
    
    $stmt = $db->prepare("INSERT INTO marketplace_products (name, description, price, stock, category, image, materials, dimensions, seller_id, seller_name, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())");
    $stmt->execute([
        $data->name,
        $data->description,
        $data->price,
        $data->stock,
        $data->category,
        $data->image,
        $data->materials,
        $data->dimensions,
        $data->seller_id,
        $data->seller_name
    ]);
    
    $product = [
        'id' => $db->lastInsertId(),
        'name' => $data->name,
        'description' => $data->description,
        'price' => $data->price,
        'stock' => $data->stock,
        'category' => $data->category,
        'image' => $data->image,
        'materials' => $data->materials,
        'dimensions' => $data->dimensions,
        'seller_id' => $data->seller_id,
        'seller_name' => $data->seller_name,
        'rating' => 4.0
    ];
    
    echo json_encode(['success' => true, 'product' => $product]);
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Data tidak lengkap']);
}
?>