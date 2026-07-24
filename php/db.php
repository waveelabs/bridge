<?php

$host = 'localhost';
$db   = 'bridgepal';  
$user = 'root';       
$pass = '';           
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

try {
    // Létrehozzuk a $pdo objektumot
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
} catch (\PDOException $e) {
    die("Adatbázis csatlakozási hiba: " . $e->getMessage());
}
?>