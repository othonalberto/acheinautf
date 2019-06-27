import { UsuarioService } from 'src/app/services/usuario.service';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

import { environment } from '../../../environments/environment.prod';

declare var require: any

@Component({
  selector: 'app-post-info',
  templateUrl: './post-info.page.html',
  styleUrls: ['./post-info.page.scss'],
})
export class PostInfoPage implements OnInit {

  ra;
  post;

  constructor(public modal: ModalController,
              public usuario: UsuarioService,
              public alert: AlertController) {
    this.usuario.getUser().subscribe(user => {
      this.ra = user.email.split("@")[0];
    });
    this.post = this.post_info;
   }

   // Variáveis para conexão com a API.
  input;
  axios = require('axios');
  url = environment.baseapi;
  urlRequest = this.url + '/usuario/';


  @Input() post_info : any;

  ngOnInit() {
  }

  voltar() {
    this.modal.dismiss({
      retorno: null
    });  
  }

  async removePost() {
    const msg = await this.alert.create({
      animated: true,
      header: "Deseja deletar o post " + (this.post.titulo) + "?",
      buttons: [{
        text: 'Não',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          return;
        }
      }, {
        text: 'Sim',
        handler: () => {
          this.remove();
        }
      }]
    });

    await msg.present();
  }

  async remove() {

    this.urlRequest = this.url + '/post/deletar/';
    
    // this.input = '{"id": "'+this.post.id+'","titulo": "'+this.post.titulo+'","lugar": "'+this.post.lugar+'","descricao": "'+this.post.descricao+'","donopost" : "' + this.post.donopost + '"}';
    
    // console.log(this.input)
    this.input = '{"id": "'+this.post.id +'"}'
    this.input = JSON.parse(this.input);

    let erro = false;

    await this.axios.delete(this.urlRequest, {data: this.input})
    .then(function (resposta) {
      console.log(resposta.data)
    })
    .catch(function (error) {
      console.log(error)
      erro = true;
    });

    var alerta: any;
    if(!erro){
      alerta = await this.alert.create({
        header: "Sucesso!",
        message: "Post removido com sucesso.",
        buttons: ["OK"]
      });
      await alerta.present();
      this.voltar();
    }else{
      alerta = await this.alert.create({
        header: "Erro!",
        message: "Post não foi removido.",
        buttons: ["OK"]
      });
      await alerta.present();
    }
  }
}