<?php
class Post {
    private $tabela = "posts";
    private $conn;
    
    private $id;
    private $titulo;
    private $lugar;
    private $descricao;
    private $datahorapost;
    private $achado = false;
    private $foto = null;
    private $donopost;

    public function __construct($db = null) {
        $this->conn = $db;
    }

    public function read($id) {
        $query = null;

        if ($id == 'all') {
            $query = $this->conn->prepare("SELECT * from posts WHERE achado=0");
        } else {
            $query = $this->conn->prepare("SELECT * from posts WHERE id=:id AND achado=0");
            $query->bindParam(':id',        $id);
        }

        $query->execute();

        return $query;
    }

    public function readByUserID($userId) {
        $query = null;

        $query = $this->conn->prepare("SELECT * from posts WHERE id=:id AND achado=0");
        $query->bindParam(':id',        $userId);

        $query->execute();

        return $query;
    }

    public function create() {
        $query = $this->conn->prepare("INSERT INTO posts(titulo, lugar, descricao, datahorapost, achado, foto, donopost) VALUES(:titulo, :lugar, :descricao, :datahorapost, :achado, :foto, :donopost)");
        
        $this->achado = 0;

        $this->datahorapost = date('Y-m-d H:i:s');

        
        $query->bindParam(':titulo',        $this->titulo);
        $query->bindParam(':lugar',         $this->lugar);
        $query->bindParam(':descricao',     $this->descricao);
        $query->bindParam(':datahorapost',  $this->datahorapost);
        $query->bindParam(':achado',        $this->achado);
        $query->bindParam(':foto',          $this->foto);
        $query->bindParam(':donopost',      $this->donopost);

        $query->execute();

        return $query->rowCount();
    }

    public function update() {
        $query = $this->conn->prepare("UPDATE posts SET titulo=:titulo, lugar=:lugar, descricao=:descricao, datahorapost=:datahorapost, achado=:achado, foto=:foto, donopost=:donopost WHERE id=:id");
        
        if ($this->foto == "null") {
            $this->foto = NULL;
        }

        if ($this->datahorapost == 'null')
            $this->datahorapost = date('Y-m-d H:i:s');

        $query->bindParam("id",             $this->id);
        $query->bindParam(':titulo',        $this->titulo);
        $query->bindParam(':lugar',         $this->lugar);
        $query->bindParam(':descricao',     $this->descricao);
        $query->bindParam(':datahorapost',  $this->datahorapost);
        $query->bindParam(':achado',        $this->achado);
        $query->bindParam(':foto',          $this->foto);
        $query->bindParam(':donopost',      $this->donopost);

        $query->execute();

        return $query->rowCount();
    }

    public function delete() {
        $query = $this->conn->prepare("DELETE from {$this->tabela} WHERE id=:id");
        $query->bindParam(':id', $this->id);
        
        echo $this->id;
        $query->execute();

        return $query->rowCount();

    }

    public function search($texto) {
        $query = $this->conn->prepare("SELECT * from {$this->tabela} WHERE (titulo LIKE '%$texto%' OR descricao LIKE '%$texto%') AND achado=0");

        $query->execute();

        return $query;
    }


    public function found($id) {
        $p = $this->read($id);

        // var_dump($p);

        if ($p->fetchObject("Post")) {
            $p->conn = $this->conn;

            $p->setAchado("1");

            return $p->update();
        }

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

    /**
     * Get the value of titulo
     */ 
    public function getTitulo()
    {
        return $this->titulo;
    }

    /**
     * Set the value of titulo
     *
     * @return  self
     */ 
    public function setTitulo($titulo)
    {
        $this->titulo = $titulo;

        return $this;
    }

    /**
     * Get the value of local
     */ 

    /**
     * Get the value of descricao
     */ 
    public function getDescricao()
    {
        return $this->descricao;
    }

    /**
     * Set the value of descricao
     *
     * @return  self
     */ 
    public function setDescricao($descricao)
    {
        $this->descricao = $descricao;

        return $this;
    }

    /**
     * Get the value of datahorapost
     */ 
    public function getDatahorapost()
    {
        return $this->datahorapost;
    }

    /**
     * Set the value of datahorapost
     *
     * @return  self
     */ 
    public function setDatahorapost($datahorapost)
    {
        $this->datahorapost = $datahorapost;

        return $this;
    }

    /**
     * Get the value of achado
     */ 
    public function getAchado()
    {
        return $this->achado;
    }

    /**
     * Set the value of achado
     *
     * @return  self
     */ 
    public function setAchado($achado)
    {
        $this->achado = $achado;

        return $this;
    }

    /**
     * Get the value of foto
     */ 
    public function getFoto()
    {
        return $this->foto;
    }

    /**
     * Set the value of foto
     *
     * @return  self
     */ 
    public function setFoto($foto)
    {
        $this->foto = $foto;

        return $this;
    }

    /**
     * Get the value of donopost
     */ 
    public function getDonopost()
    {
        return $this->donopost;
    }

    /**
     * Set the value of donopost
     *
     * @return  self
     */ 
    public function setDonopost($donopost)
    {
        $this->donopost = $donopost;

        return $this;
    }

    /**
     * Get the value of lugar
     */ 
    public function getLugar()
    {
        return $this->lugar;
    }

    /**
     * Set the value of lugar
     *
     * @return  self
     */ 
    public function setLugar($lugar)
    {
        $this->lugar = $lugar;

        return $this;
    }
}


?>