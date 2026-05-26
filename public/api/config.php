<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, x-admin-password');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dataDir = __DIR__ . '/../data';
$configFile = $dataDir . '/config.json';
$passwordFile = $dataDir . '/admin-password.txt';

if (!is_dir($dataDir)) {
    mkdir($dataDir, 0755, true);
}

function getPassword() {
    global $passwordFile;
    if (file_exists($passwordFile)) {
        return trim(file_get_contents($passwordFile));
    }
    return 'admin123';
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($configFile)) {
        echo file_get_contents($configFile);
    } else {
        echo json_encode(['error' => 'no config']);
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $headers = getallheaders();
    $password = '';
    foreach ($headers as $key => $value) {
        if (strtolower($key) === 'x-admin-password') {
            $password = $value;
            break;
        }
    }

    $storedPassword = getPassword();

    if ($password !== $storedPassword) {
        http_response_code(401);
        echo json_encode(['error' => 'Wrong password']);
        exit;
    }

    $body = json_decode(file_get_contents('php://input'), true);
    if (!$body) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON']);
        exit;
    }

    if (isset($body['adminPassword']) && !empty($body['adminPassword'])) {
        file_put_contents($passwordFile, $body['adminPassword']);
        unset($body['adminPassword']);
    }

    file_put_contents($configFile, json_encode($body, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    echo json_encode(['ok' => true]);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
