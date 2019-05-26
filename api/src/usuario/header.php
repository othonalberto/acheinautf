<?php

header("Content-Type: application/json; charset=utf-8");

require_once(__DIR__ . './../config/database.php');
require_once(__DIR__ . './../objects/usuario.php');

$database = new Database();
$db = $database->connect();

$usuario = new Usuario($db);

?>