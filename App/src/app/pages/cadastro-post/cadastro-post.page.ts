import { ModalController, AlertController } from '@ionic/angular';
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

  constructor(public usuario: UsuarioService, 
              public modal: ModalController,
              public router: Router,
              public alert: AlertController) {
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

  public voltar() {
    this.router.navigateByUrl("/tabs");
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

    this.urlRequest = this.url + '/post/criar/';
    this.input = '{"titulo": "'+this.titulo+'","lugar": "'+this.lugar+'","descricao": "'+this.descricao+'","donopost" : "' + this.ra + '"}';
    
    this.input = JSON.parse(this.input);
    
    let erro = false;

    await this.axios.post(this.urlRequest, this.input)
    .then(function (resposta) {
      
    })
    .catch(function (error) {
      erro = true;
    });

    var alerta: any;
    if(!erro){
      alerta = await this.alert.create({
        header: "Sucesso!",
        message: "Post criado com sucesso.",
        buttons: ["OK"]
      });
      await alerta.present();
      this.voltar();
    }else{
      alerta = await this.alert.create({
        header: "Erro!",
        message: "Post não foi criado com sucesso.",
        buttons: ["OK"]
      });
      await alerta.present();
    }
}

}
