<?php
session_start();


$stmt = $pdo->prepare("SELECT club_id, club_name, board_count FROM club WHERE access_pin = ?");
$entered_code = $_POST['access_pin'];
$club = $stmt->fetch();

if ($club) {
    $_SESSION['team_id'] = $club['club_id'];
    $_SESSION['team_name'] = $club['club_name'];
    $_SESSION['borad_count'] = $club['board_count'];
}
?>
