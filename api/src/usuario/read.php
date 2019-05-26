<?php

require_once(__DIR__ . '/header.php');

$array_resposta = [];
$array_resposta["respostas"] = array();
$query = $usuario->read($id);

while ($u = $query->fetchObject("Usuario")) {
    $item = array(
        "id"        => $u->getId(),
        "nome"      => $u->getNome(),
        "campus"    => $u->getCampus(),
        "contato"   => $u->getContato(),
        "senha"     => $u->getSenha()
    );

    array_push($array_resposta["respostas"], $item);
}

if (empty($array_resposta["respostas"])) {
    http_response_code(404);
    echo json_encode(
        array("mensagem" => "Não há usuários cadastrados."), JSON_UNESCAPED_UNICODE
    );
} else {
    http_response_code(200);
    echo json_encode($array_resposta);
}

?>