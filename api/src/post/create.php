<?php

date_default_timezone_set('America/Sao_Paulo');

require_once(__DIR__ . '/header.php');

$dadosEntradas = json_decode(file_get_contents("php://input"));

if (!empty($dadosEntradas->titulo) && !empty($dadosEntradas->lugar) && !empty($dadosEntradas->donopost)) {
    $desc = (empty($dadosEntradas->descricao)) ? "null" : ($dadosEntradas->descricao);
    $foto = (empty($dadosEntradas->setFoto)) ? "null" : ($dadosEntradas->setFoto);

    $post->setTitulo($dadosEntradas->titulo);
    $post->setLugar($dadosEntradas->lugar);
    $post->setDonoPost($dadosEntradas->donopost);

    $post->setDescricao($desc);
    $post->setFoto($foto);

    $post->setDatahorapost(date('Y-m-d H:i:s'));
    $post->setAchado("0");
    
    if ($post->create()) {
        http_response_code(201);
        echo json_encode(array("mensagem" => "Post criado."));
    } else {
        http_response_code(503);
        echo json_encode(array("mensagem" => "Não foi possível criar post."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("mensagem" => "Não foi possível criar post. Dado(s) de entrada incompletos."));
}


?>