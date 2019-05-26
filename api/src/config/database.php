<?php
class Database {
    private $GLOBAL_DB = "prod";
    
    private $prod = ["host" => "localhost",
                    "dbname" => "acheinautf",
                    "username" => "root",
                    "password" => ''
    ];

    private $teste = ["host" => "localhost",
                    "dbname" => "acheinautf_teste",
                    "username" => "root",
                    "password" => ''
    ];




    public function connect($banco = "null") {
        if ($banco == "teste") {
            $host     = $this->teste["host"];
            $dbname   = $this->teste["dbname"];
            $username = $this->teste["username"];
            $password = $this->teste["password"];
        } else {
            $host     = $this->prod["host"];
            $dbname   = $this->prod["dbname"];
            $username = $this->prod["username"];
            $password = $this->prod["password"];

        }
        
        
        try {
            $pdo = new PDO("mysql:host={$host};dbname={$dbname};", $username, $password,
                        array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
            return $pdo;
            
        } catch (PDOException $e) {
            die($e->getMessage());      
        }
    }
}
?>