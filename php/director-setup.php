
<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
header('Content-Type: application/json');

$host = 'localhost';
$dbname = 'bridgepal';
$user = 'root';
$pass = '';


// mentes

try {
    // PDO kapcsolat létrehozása
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);

    $jsonInput = file_get_contents('php://input');
    $data = json_decode($jsonInput, true);
    $aktualisNap = date('Y-m-d');
    $name = trim($data['name'] ?? '');

    if (!$data) {
        echo json_encode(['success' => false, 'message' => 'Ervenytelen adatok!']);
        exit;
    }
    //// 3. SQL INSERT lekérdezés előkészítése
    $sql = "INSERT INTO tournaments 
            (name, played_on, table_count, board_count, status) 
            VALUES 
            (:name, :played_on, :table_count, :board_count, :status)";
    $stmt = $pdo->prepare($sql);

    //Paraméterek behelyettesítése és végrehajtás
    $stmt->execute([
        ':name'         => !empty($name) ? $name : $aktualisNap,
        ':played_on'    => $aktualisNap,
        ':table_count'  => $data['table_count'],
        ':board_count'  => $data['board_count'],
        ':status'       => 1

    ]);

    // Válasz a JS-nek
    echo json_encode(['success' => true, 'message' => 'Adat sikeresen elmentve!']);

} catch (PDOException $e) {
    // Hiba esetén visszaküldjük a hibaüzenetet
    echo json_encode(['success' => false, 'message' => 'Adatbázis hiba: ' . $e->getMessage()]);
}
}
