<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");

include_once '../config/database.php';

$db = (new Database())->getConnection();
$stmt = $db->query("SELECT * FROM marketplace_products ORDER BY created_at DESC");
$products = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Format materials
foreach ($products as &$product) {
    $product['materials'] = $product['materials'] ? explode(',', $product['materials']) : ['Bahan daur ulang'];
}
echo json_encode($products);
?>