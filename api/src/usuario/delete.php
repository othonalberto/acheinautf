<?php

require_once(__DIR__ . '/header.php');

$usuario = new Usuario($db);

$dadosEntradas = json_decode(file_get_contents("php://input"));

if (!empty($dadosEntradas->id)) {
    $usuario->setId($dadosEntradas->id);

    if ($usuario->delete()) {
        http_response_code(200);
        echo json_encode(array("mensagem" => "Usuario deletado."));
    } else {
        http_response_code(503);
        echo json_encode(array("mensagem" => "Não foi possível deletar usuário."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("mensagem" => "Não foi possível deletar usuário. Dado(s) de entrada incompletos."));
}


?>