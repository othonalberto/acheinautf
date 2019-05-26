<?php
class Login {
    private $tabela = "login";
    private $conn;
    
    private $id;
    private $usuario;
    private $senha;

    public function __construct($db = null) {
        $this->conn = $db;
    }


    public function confereLogin() {
        $query = $this->conn->prepare("SELECT * from {$this->tabela} WHERE usuario=:u AND senha=:s");
        
        $s = md5($this->senha);

        $query->bindParam(':u', $this->usuario);
        $query->bindParam(':s', $s);

        $query->execute();

        return $query->rowCount();
    }

    public function cadastrarLogin() {
        $query = $this->conn->prepare("INSERT INTO login(usuario, senha) VALUES(:u, :s)");
        
        $s = md5($this->senha);

        $query->bindParam(':u', $this->usuario);
        $query->bindParam(':s', $s);

        

        echo $this->usuario;
        echo $s;

        
        
        $query->execute();

        var_dump($query);

        return $query->rowCount();

    }

    /**
     * Get the value of id
     */ 
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */ 
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * Get the value of usuario
     */ 
    public function getUsuario()
    {
        return $this->usuario;
    }

    /**
     * Set the value of usuario
     *
     * @return  self
     */ 
    public function setUsuario($usuario)
    {
        $this->usuario = $usuario;

        return $this;
    }

    /**
     * Get the value of senha
     */ 
    public function getSenha()
    {
        return $this->senha;
    }

    /**
     * Set the value of senha
     *
     * @return  self
     */ 
    public function setSenha($senha)
    {
        $this->senha = $senha;

        return $this;
    }
}
?>