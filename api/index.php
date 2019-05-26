<?php

require "vendor/autoload.php";
use Pecee\SimpleRouter\SimpleRouter;

session_start();

require_once(__DIR__ . '/src/routes.php');

SimpleRouter::setDefaultNamespace('\Demo\Controllers');
SimpleRouter::start();

?>