<?php
$dsn = "mysql:host=localhost;dbname=ai_lookbook";
$username = "root";
$password = "";

try {
    $pdo = new PDO ($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connessione fallita: " . $e->getMessage();
}
?>