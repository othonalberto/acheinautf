<?php
class Usuario {
    private $tabela = "usuarios";
    private $conn;
    
    private $id;
    private $nome;
    private $campus;
    private $contato;
    private $senha;
    private $dicasenha;

    public function __construct($db = null) {
        $this->conn = $db;
    }

    public function read($id) {
        $query = null;

        if ($id == 'all') {
            $query = $this->conn->prepare("SELECT * from {$this->tabela}");
        } else {
            $query = $this->conn->prepare("SELECT * from {$this->tabela} where id=:id");
            $query->bindParam(':id', $id);
        }

        $query->execute();

        return $query;
    }

    public function create() {
        $query = $this->conn->prepare("INSERT INTO usuarios(id, nome, campus, contato, senha, dicasenha) VALUES(:id, :nome, :campus, :contato, :senha, :dicasenha)");

        $query->bindParam(':id',        $this->id);
        $query->bindParam(':nome',      $this->nome);
        $query->bindParam(':campus',    $this->campus);
        $query->bindParam(':contato',   $this->contato);
        $query->bindParam(':senha',     $this->senha);
        $query->bindParam(':dicasenha', $this->dicasenha);

        $query->execute();

        return $query->rowCount();
    }

    public function update() {
        $query = $this->conn->prepare("UPDATE usuarios SET id=:id, nome=:nome, campus=:campus, contato=:contato, senha=:senha, dicasenha=:dicasenha WHERE id=:id");
        $query->bindParam(':id',        $this->id);
        $query->bindParam(':nome',      $this->nome);
        $query->bindParam(':campus',    $this->campus);
        $query->bindParam(':contato',   $this->contato);
        $query->bindParam(':senha',     $this->senha);
        $query->bindParam(':dicasenha', $this->dicasenha);
        
        $query->execute();

        return $query->rowCount();
    }

    public function delete() {
        $query = $this->conn->prepare("DELETE from {$this->tabela} WHERE id=:id");
        $query->bindParam(':id', $this->id);
        
        $query->execute();

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
     * Get the value of nome
     */ 
    public function getNome()
    {
        return $this->nome;
    }

    /**
     * Set the value of nome
     *
     * @return  self
     */ 
    public function setNome($nome)
    {
        $this->nome = $nome;

        return $this;
    }

    /**
     * Get the value of campus
     */ 
    public function getCampus()
    {
        return $this->campus;
    }

    /**
     * Set the value of campus
     *
     * @return  self
     */ 
    public function setCampus($campus)
    {
        $this->campus = $campus;

        return $this;
    }

    /**
     * Get the value of contato
     */ 
    public function getContato()
    {
        return $this->contato;
    }

    /**
     * Set the value of contato
     *
     * @return  self
     */ 
    public function setContato($contato)
    {
        $this->contato = $contato;

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



    /**
     * Get the value of db
     */ 
    public function getDb()
    {
        return $this->db;
    }

    /**
     * Set the value of db
     *
     * @return  self
     */ 
    public function setDb($db)
    {
        $this->db = $db;

        return $this;
    }

    public function getDicaSenha()
    {
        return $this->dicasenha;
    }

    /**
     * Set the value of db
     *
     * @return  self
     */ 
    public function setDicaSenha($dicasenha)
    {
        $this->dicasenha = $dicasenha;

        return $this;
    }
}


?>