<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once(__DIR__ . './../config/database.php');
require_once(__DIR__ . './../objects/post.php');

$database = new Database();
$db = $database->connect();

$post = new Post($db);

?>