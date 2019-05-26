<?php

require_once(__DIR__ . '/header.php');

$dadosEntradas = json_decode(file_get_contents("php://input"));

if (!empty($dadosEntradas->id) && !empty($dadosEntradas->nome) && !empty($dadosEntradas->contato) &&
    !empty($dadosEntradas->campus) && !empty($dadosEntradas->senha)) {
    $usuario->setId($dadosEntradas->id);
    $usuario->setNome($dadosEntradas->nome);
    $usuario->setContato($dadosEntradas->contato);
    $usuario->setCampus($dadosEntradas->campus);
    $usuario->setSenha(md5($dadosEntradas->senha));

    if ($usuario->create()) {
        http_response_code(201);
        echo json_encode(array("mensagem" => "Usuario criado."));
    } else {
        http_response_code(503);
        echo json_encode(array("mensagem" => "Não foi possível criar usuário."));
    }
} else {
    http_response_code(400);
    var_dump($dadosEntradas);
    echo json_encode(array("mensagem" => "Não foi possível criar usuário. Dados de entrada incompletos."));
}


?>