import { MeusPostsPage } from './../meus-posts/meus-posts.page';
import { PostInfoPage } from './../post-info/post-info.page';
import { EditaUsuarioPage } from './../edita-usuario/edita-usuario.page';
import { ModalController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EditaPostPage } from '../edita-post/edita-post.page';
import { HTTP } from '@ionic-native/http/ngx';

import { environment } from '../../../environments/environment.prod';

declare var require: any;

@Component({
  selector: 'app-minha-conta',
  templateUrl: './minha-conta.page.html',
  styleUrls: ['./minha-conta.page.scss'],
})
export class MinhaContaPage implements OnInit {

  public user_info;
  public ra;

  constructor(public usuario: UsuarioService,
              public modal: ModalController,
              public route: Router,
              public http: HTTP) { 

    this.usuario.getUser().subscribe(async user => {
      this.ra = user.email.split("@")[0];

      await this.getMyInfo()
      .then((result) => {
        this.user_info = result;
      })
      .catch((erro) => {
        console.log("erro aqui");
      });
    });

  }

  ngOnInit() {
  }

  logout(){
    this.usuario.logout();
    this.route.navigateByUrl("/home");
  }

  // Variáveis para conexão com a API.
  input;
  axios = require('axios');
  url = environment.baseapi
  urlRequest = this.url + '/usuario/';

  public getMyInfo(): Promise<{id: number, nome: string, campus: string, contato: any}> {
    return new Promise(async (resolve, reject) => {

      this.urlRequest = this.url + '/usuario/' + this.ra;

      // await this.http.get(this.urlRequest, {}, { 'Content-Type': 'application/json' })
      // .then((resposta) => {
      //   // resolve(resposta.data.respostas[0]);
      //   console.log(resposta.data)
      // })
      // .catch((error) => {
      //   reject("ERRO");
      //   console.log(error)
      // })

      await this.axios.get(this.urlRequest)
      .then( function (resposta) {
        resolve(resposta.data.respostas[0]);
      })
      .catch(function (error) {
        console.log('Erro: ' + error);
        reject("ERRO");
      });
    })
  }

  public async showEditaUsuario (user) {
    const editar = await this.modal.create({
      component: EditaUsuarioPage,
      componentProps: {user_info: user}
    });
    await editar.present();
    const{data} = await editar.onDidDismiss(); 

    if(data.retorno) location.reload();

  }

  public async showMeusPosts() {
    this.route.navigateByUrl("/meus-posts");
    /*const meusPosts = await this.modal.create({
      component: MeusPostsPage
    });
    await meusPosts.present();*/
  }

}
