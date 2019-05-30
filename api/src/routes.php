<?php
use Pecee\SimpleRouter\SimpleRouter;
use function GuzzleHttp\json_encode;

SimpleRouter::get('/', function() {
    echo "API Achei na UTF - ON";
});

SimpleRouter::get('/usuario/{id?}', function($id = 'all') {
    require('usuario/read.php');
});


SimpleRouter::post('/usuario/criar/', function() {
    require('usuario/create.php');
});


SimpleRouter::delete('/usuario/deletar/', function() {
    require('usuario/delete.php');
});


SimpleRouter::put('/usuario/atualizar/', function() {
    require('usuario/update.php');
});


SimpleRouter::get('/post/{id?}', function($id = 'all') {
    require('post/read.php');
});

SimpleRouter::get('/post/usuario/{id?}', function($id) {
    require('post/readByUserId.php');
});

SimpleRouter::post('/post/criar/', function() {
    require('post/create.php');
});


SimpleRouter::delete('/post/deletar/', function() {
    require('post/delete.php');
});


SimpleRouter::put('/post/atualizar/', function() {
    require('post/update.php');
});


SimpleRouter::get('/post/buscar/{texto}', function($texto) {
    require('post/search.php');
});


SimpleRouter::put('/post/devolver/', function() {
    require('post/found.php');
});

SimpleRouter::get('/erro', function() {
    echo "API Achei na UTF - Rota inválida.";
});


SimpleRouter::error(function() {
    SimpleRouter::response()->redirect('/erro');
    
});



?>