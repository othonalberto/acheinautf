import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ModalController, AlertController } from '@ionic/angular';
import { PostInfoPage } from '../post-info/post-info.page';
import { EditaPostPage } from '../edita-post/edita-post.page';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment.prod';

declare var require: any

@Component({
  selector: 'app-meus-posts',
  templateUrl: './meus-posts.page.html',
  styleUrls: ['./meus-posts.page.scss'],
})
export class MeusPostsPage implements OnInit {

  public posts = [];
  public ra;

  // Variáveis para conexão com a API.
  input;
  axios = require('axios');
  url = environment.baseapi
  urlRequest = this.url + '/usuario/';

  constructor(public usuario: UsuarioService,
              public modal: ModalController,
              public alert: AlertController,
              public route: Router) {
  }

  ionViewWillEnter() {
    this.usuario.getUser().subscribe(user => {
      this.ra = user.email.split("@")[0];

      this.getMeusPosts()
      .then((result) => {
        this.posts = result;
      })
      .catch((erro) => {
        console.log("erro");
      });
    });
  }

  ngOnInit() {
  }

  voltar() {
    this.route.navigateByUrl("/tabs");
  }

  getMeusPosts(): Promise<Array<Object>>{
    return new Promise((resolve, reject) => {
      this.urlRequest = this.url + '/post/usuario/' + this.ra;
      this.axios.get(this.urlRequest)
      .then( function (resposta) {
        resolve(resposta.data.respostas);
        })
      .catch(function (error) {
        reject("ERRO");
      });
    })
  }

  async showPostInfo(post) {
    const showInfo = await this.modal.create({
      component: PostInfoPage,
      componentProps: {post: post}
    });
    await showInfo.present();
    const{data} = await showInfo.onDidDismiss(); 

    if(data.retorno) location.reload();
  }

  async editarPost(post) {
    const showInfo = await this.modal.create({
      component: EditaPostPage,
      componentProps: {post: post}
    });
    await showInfo.present();
    const{data} = await showInfo.onDidDismiss(); 

    if(data.retorno) location.reload();
  }

  verMapa(post) {
    console.log("Em desenvolvimento");
  }

}
