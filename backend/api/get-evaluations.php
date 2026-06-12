<?php
require_once __DIR__ . "/../config/database.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");

$sql = "SELECT * FROM evaluations
ORDER BY created_at DESC";

$stmt = $pdo->prepare($sql);
$stmt->execute();

$evaluations = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($evaluations as &$evaluation) {
    $evaluation["selling_tips"] = json_decode($evaluation["selling_tips"], true);
}

echo json_encode($evaluations);
exit;
?>