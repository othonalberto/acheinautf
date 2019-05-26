<?php

require_once(__DIR__ . '/header.php');

$dadosEntradas = json_decode(file_get_contents("php://input"));

if (!empty($dadosEntradas->id)) {
    $post->setId($dadosEntradas->id);

    if ($post->delete()) {
        http_response_code(200);
        echo json_encode(array("mensagem" => "Post deletado."));
    } else {
        http_response_code(503);
        echo json_encode(array("mensagem" => "Não foi possível deletar o post."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("mensagem" => "Não foi possível deletar post. Dado(s) de entrada incompletos."));
}

?>