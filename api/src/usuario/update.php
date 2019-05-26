<?php

require_once(__DIR__ . '/header.php');

$dadosEntradas = json_decode(file_get_contents("php://input"));

if (!empty($dadosEntradas->id) && !empty($dadosEntradas->nome) && !empty($dadosEntradas->contato) &&
    !empty($dadosEntradas->campus) && !empty($dadosEntradas->senha)) {
    $usuario->setId($dadosEntradas->id);
    $usuario->setNome($dadosEntradas->nome);
    $usuario->setContato($dadosEntradas->contato);
    $usuario->setCampus($dadosEntradas->campus);
    $usuario->setSenha($dadosEntradas->senha);

    if ($usuario->update()) {
        http_response_code(201);
        echo json_encode(array("mensagem" => "Usuario atualizado."));
    } else {
        http_response_code(503);
        echo json_encode(array("mensagem" => "Não foi possível atualizar usuário."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("mensagem" => "Não foi possível atualizar usuário. Dado(s) de entrada incompletos."));
}


?>