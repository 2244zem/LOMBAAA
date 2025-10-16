<?php
function authenticateUser($token) {
    // Untuk demo, kita hanya return true
    // Di produksi, Anda perlu memvalidasi token dengan database
    return true;
}

function checkAuth() {
    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(array("message" => "Token otentikasi diperlukan."));
        exit();
    }
    
    $token = str_replace('Bearer ', '', $headers['Authorization']);
    if (!authenticateUser($token)) {
        http_response_code(401);
        echo json_encode(array("message" => "Token tidak valid."));
        exit();
    }
}
?>