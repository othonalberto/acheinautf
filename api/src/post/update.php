<?php

require_once(__DIR__ . '/header.php');

// $dadosEntradas = json_decode(file_get_contents("php://input"));
$dadosEntradas = json_decode(file_get_contents("php://input"));

var_dump($dadosEntradas);

// if (!empty($dadosEntradas->id) && !empty($dadosEntradas->titulo) && !empty($dadosEntradas->lugar) &&
//     !empty($dadosEntradas->descricao) && !empty($dadosEntradas->datahorapost) && !empty($dadosEntradas->achado) &&
//     !empty($dadosEntradas->foto) && !empty($dadosEntradas->donopost))
//     {
if (!empty($dadosEntradas->id) && !empty($dadosEntradas->titulo) && !empty($dadosEntradas->lugar) &&
    !empty($dadosEntradas->descricao) && !empty($dadosEntradas->datahorapost) && !empty($dadosEntradas->donopost))
    {
    $post->setId($dadosEntradas->id);
    $post->setTitulo($dadosEntradas->titulo);
    $post->setLugar($dadosEntradas->lugar);
    $post->setDescricao($dadosEntradas->descricao);
    $post->setDataHoraPost($dadosEntradas->datahorapost);
    $post->setAchado("0");
    $post->setFoto($dadosEntradas->foto);
    $post->setDonoPost($dadosEntradas->donopost);

    var_dump($post);

    if ($post->update()) {
        http_response_code(201);
        echo json_encode(array("mensagem" => "Post atualizado."));
    } else {
        http_response_code(503);
        echo json_encode(array("mensagem" => "Não foi possível atualizar o post."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("mensagem" => "Não foi possível atualizar o post. Dado(s) de entrada incompletos."));
}



?>