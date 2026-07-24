
<?php


// mentes


try {

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    session_start();
    require_once 'db.php';
    
    header('Content-Type: application/json');


    $jsonInput = file_get_contents('php://input');
    $data = json_decode($jsonInput, true);

    if (!$data) {
        echo json_encode(['success' => false, 'message' => 'Ervenytelen adatok!']);
        exit;
    }
    //// 3. SQL INSERT lekérdezés előkészítése
    $sql = "INSERT INTO board_results 
            (board_id, table_number, pair_ns_id, pair_ew_id, declarer, contract_amount, contract_suite, doubled, tricks_result, ns_score, ew_score, recorder) 
            VALUES 
            (:board_id, :table_number, :pair_ns_id, :pair_ew_id, :declarer, :contract_amount, :contract_suite, :doubled, :tricks_result, :ns_score, :ew_score, :recorder)";

    $stmt = $pdo->prepare($sql);

    //Paraméterek behelyettesítése és végrehajtás
    $stmt->execute([
        ':board_id'         => $data['board_id'],
        ':table_number'     => $data['table_number'],
        ':pair_ns_id'       => $data['pair_ns'],
        ':pair_ew_id'       => $data['pair_ew'],
        ':declarer'         => $data['declarer'],
        ':contract_amount'  => $data['contract_amount'],
        ':contract_suite'   => $data['contract_suite'],
        ':doubled'          => $data['doubled'],
        ':tricks_result'    => $data['tricks_result'],
        ':ns_score'         => $data['ns_score'],
        ':ew_score'         => $data['ew_score'],
        ':recorder'         => $data['recorder']
    ]);

    // Válasz a JS-nek
    echo json_encode(['success' => true, 'message' => 'Adat sikeresen elmentve!']);
}

} catch (PDOException $e) {
    // Hiba esetén visszaküldjük a hibaüzenetet
    echo json_encode(['success' => false, 'message' => 'Adatbázis hiba: ' . $e->getMessage()]);
}

?>