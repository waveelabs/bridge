<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();
require_once __DIR__ . '/db.php';
$error_message = '';

// Ellenőrizzük, hogy elküldték-e az űrlapot (POST kérés érkezett-e)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $user_input_code = trim($_POST['club_id'] ?? '');

    if (!empty($user_input_code)) {
        
        $stmt = $pdo->prepare("SELECT club_id, club_name, board_count FROM club WHERE access_pin = ?");
        $stmt->execute([$user_input_code]); // ez az ami a '?' helyére kerül
        $club = $stmt->fetch();

        if ($club) {
            // Sikeres belépés -> Elmentjük a session-be
            $_SESSION['team_id'] = $club['club_id'];
            $_SESSION['team_name'] = $club['club_name'];
            $_SESSION['board_count'] = $club['board_count'];


            // Átdobjuk a csapatot a verseny felületre
            header("Location: /bridge/index.html");
            exit;
        } else {
            header("Location: ../login.html?error=invalid_code");
            exit;
        }

    } else {
        header("Location: ../login.html?error=empty");
        exit;
    }
} /*else{
    header("Location: ../login.html?error=vissza"); //ez azért volt benne hogy ne lehessen csak úgy megnyitni
    exit;
}*/
?>
