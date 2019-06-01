import { ModalController, AlertController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
declare var require: any

@Component({
  selector: 'app-edita-post',
  templateUrl: './edita-post.page.html',
  styleUrls: ['./edita-post.page.scss'],
})
export class EditaPostPage implements OnInit {

  constructor(public usuario: UsuarioService, 
              public modal: ModalController,
              public router: Router,
              public alert: AlertController) {
    this.usuario.getUser().subscribe(user => {
      this.ra = user.email.split("@")[0]
    });
    this.post = this.post_info;
  }

  post;

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

  @Input() post_info: any;

  ngOnInit() {
  }

  public voltar() {
    this.modal.dismiss({
      retorno: null
    })
  }

  public async validaDados() {
    if(this.post.titulo   == undefined ||
      this.post.descricao == undefined ||
      this.post.lugar     == undefined) {

     this.senhaInvalida     = false; 
     this.camposInvalidos   = true ;
     this.usuarioCadastrado = false;
     return;
    }

    this.urlRequest = this.url + '/post/atualizar/';
    
    this.input = '{"id": "'+this.post.id+'",{"titulo": "'+this.post.titulo+'","lugar": "'+this.post.lugar+'","descricao": "'+this.post.descricao+'","donopost" : "' + this.post.donopost + '"}';
    
    this.input = JSON.parse(this.input);

    let erro = false;

    await this.axios.put(this.urlRequest, this.input)
    .then(function (resposta) {
      
    })
    .catch(function (error) {
      erro = true;
    });

    var alerta: any;
    if(!erro){
      alerta = await this.alert.create({
        header: "Sucesso!",
        message: "Post atualizado com sucesso.",
        buttons: ["OK"]
      });

      this.modal.dismiss();
    }else{
      alerta = await this.alert.create({
        header: "Erro!",
        message: "Não foi possível atualizar o post.",
        buttons: ["OK"]
      });
    }

    await alerta.present();
  }

}
