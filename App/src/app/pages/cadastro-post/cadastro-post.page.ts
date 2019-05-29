import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
declare var require: any

@Component({
  selector: 'app-cadastro-post',
  templateUrl: './cadastro-post.page.html',
  styleUrls: ['./cadastro-post.page.scss'],
})

export class CadastroPostPage implements OnInit {

  constructor(public usuario: UsuarioService, public router: Router) {
    this.usuario.getUser().subscribe(user => {
      this.ra = user.email.split("@")[0]
    });
  }

  // Variáveis de preenchimeto do usuário.
  titulo; lugar; descricao; ra;

  // Variáveis que mostram um label na tela caso algum erro ocorra.
  senhaInvalida     = false; 
  camposInvalidos   = false;
  usuarioCadastrado = false;

  // Variáveis para conexão com a API.
  input;
  axios = require('axios');
  url = 'http://127.0.0.1:8080';
  urlRequest = this.url + '/usuario/';

  ngOnInit() {
  } 

  public async validaDados(){
    
    if(this.titulo  == undefined ||
      this.descricao     == undefined ||
      this.lugar    == undefined) {

     this.senhaInvalida     = false; 
     this.camposInvalidos   = true ;
     this.usuarioCadastrado = false;
     return;
    }
    
    

    console.log(this.ra)

    this.urlRequest = this.url + '/post/criar/';
    this.input = '{"titulo": "'+this.titulo+'","lugar": "'+this.lugar+'","descricao": "'+this.descricao+'","donopost" : "' + this.ra + '"}';
    console.log(this.input)
    this.input = JSON.parse(this.input);
    console.log(this.input)
    

    this.axios.post(this.urlRequest, this.input)
    .then(function (resposta) {
      console.log(resposta.data)
    })
    .catch(function (error) {
      console.log('Erro: ' + error)
    });

}

}
