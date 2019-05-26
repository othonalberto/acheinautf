<?php

require_once(__DIR__ . '/header.php');

$dadosEntradas = json_decode(file_get_contents("php://input"));

if (!empty($dadosEntradas->id)) {
    if ($post->found($dadosEntradas->id)) {
        http_response_code(201);
        echo json_encode(array("mensagem" => "Post marcado como entregue."));
    } else {
        http_response_code(503);
        echo json_encode(array("mensagem" => "Não foi possível marcar o post como devolvido."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("mensagem" => "Não foi possível atualizar o post. Dado(s) de entrada incompletos."));
}

?>