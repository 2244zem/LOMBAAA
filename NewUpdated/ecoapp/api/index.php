<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Ambil path dari URL
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$segments = explode('/', trim($path, '/'));

// Routing sederhana
if (count($segments) >= 3 && $segments[0] === 'ecoapp' && $segments[1] === 'api') {
    $controller = $segments[2];
    
    switch ($controller) {
        case 'auth':
            if (isset($segments[3])) {
                $action = $segments[3];
                if ($action === 'register') {
                    include 'auth/register.php';
                } elseif ($action === 'login') {
                    include 'auth/login.php';
                } else {
                    http_response_code(404);
                    echo json_encode(array("message" => "Endpoint tidak ditemukan."));
                }
            } else {
                http_response_code(400);
                echo json_encode(array("message" => "Aksi tidak ditentukan."));
            }
            break;
        default:
            http_response_code(404);
            echo json_encode(array("message" => "Controller tidak ditemukan."));
    }
} else {
    http_response_code(404);
    echo json_encode(array("message" => "URL tidak valid."));
}
?>