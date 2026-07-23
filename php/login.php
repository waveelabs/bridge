<?php
session_start();

// Tegyük fel, hogy a felhasználó ezt küldte el az űrlapról:
$entered_code = $_POST['team_code'];

// Példa: Adatbázisból kikeresed a csapatot a kód alapján
// (Most a szemléltetés kedvéért egy fix ellenőrzést írunk):
if ($entered_code === "STORM2026") {
    
    // Nem egyéni embert tárolunk, hanem a CSAPATOT
    $_SESSION['team_id'] = 12;
    $_SESSION['team_name'] = "Viharos Sárkányok";
    $_SESSION['score'] = 150; // Akár az aktuális pontszámot is

    // Átirányítás a versenyfelületre
    header("Location: contest.php");
    exit;
} else {
    echo "Hibás csapatkód!";
}
?>
