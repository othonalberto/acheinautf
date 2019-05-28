<?php

require_once(__DIR__ . '/header.php');

$array_resposta = [];
$array_resposta["respostas"] = array();
$query = $post->readByUserId($id);

while ($p = $query->fetchObject("Post")) {

    $item = array(
        "id"            => $p->getId(),
        "titulo"        => $p->getTitulo(),
        "lugar"         => $p->getLugar(),
        "descricao"     => $p->getDescricao(),
        "datahorapost"  => $p->getDataHoraPost(),
        "achado"        => $p->getAchado(),
        "foto"          => $p->getFoto(),
        "donopost"      => $p->getDonoPost()
    );

    array_push($array_resposta["respostas"], $item);
}

if (empty($array_resposta["respostas"])) {
    http_response_code(404);
    echo json_encode(
        array("mensagem" => "Não há posts cadastrados.")
    );
} else {
    http_response_code(200);
    echo json_encode($array_resposta);
}
?>