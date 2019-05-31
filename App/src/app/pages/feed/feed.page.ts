import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { PostInfoPage } from '../post-info/post-info.page';
import { ModalController, AlertController } from '@ionic/angular';
import { EditaPostPage } from '../edita-post/edita-post.page';
declare var require: any

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  public objetos = [];
  public ra;

  // Variáveis para conexão com a API.
  input;
  axios = require('axios');
  url = 'http://127.0.0.1:8080';
  urlRequest = this.url + '/usuario/';

  constructor(public usuario: UsuarioService,
              public modal: ModalController,
              public alert: AlertController) {

                this.usuario.getUser().subscribe(user => {
                  this.ra = user.email.split("@")[0];

                  this.getPosts()
                  .then((result) => {
                    this.objetos = result;
                  })
                  .catch((erro) => {
                    console.log("erro");
                  });
                });                
              }

  ngOnInit() {
  }

  async showPostInfo(post) {
    const showInfo = await this.modal.create({
      component: PostInfoPage,
      componentProps: {post: post}
    });
    await showInfo.present();
  }

  async editarPost(post) {
    const showInfo = await this.modal.create({
      component: EditaPostPage,
      componentProps: {post: post}
    });
    await showInfo.present();
  }

  async contactar(post) {

    let user_info = null;

    this.urlRequest = this.url + '/usuario/' + post.donopost;
    await this.axios.get(this.urlRequest)
    .then( function (result) {
      user_info = result.data.respostas[0];
    })
    .catch(function (error) {
      console.log("ERRO");
    });

    if(user_info != null){
      const contato = await this.alert.create({
        header: 'Contato de ' + user_info.nome,
        message: user_info.contato,
        buttons: ['OK']
      });
      await contato.present();
    }else{
      const contato = await this.alert.create({
        header: 'Erro',
        message: 'Não foi possível obter as informações de contato.',
        buttons: ['OK']
      });
      await contato.present();
    }
  }

  verMapa(post) {
    console.log("Em desenvolvimento");
  }

  getPosts(): Promise<Array<Object>>{
    return new Promise((resolve, reject) => {
      this.urlRequest = this.url + '/post';
      this.axios.get(this.urlRequest)
      .then( function (resposta) {
        resolve(resposta.data.respostas);
        })
      .catch(function (error) {
        reject("ERRO");
      });
    })
  }
  
}
