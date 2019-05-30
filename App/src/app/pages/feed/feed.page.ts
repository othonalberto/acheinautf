import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { PostInfoPage } from '../post-info/post-info.page';
import { ModalController, AlertController } from '@ionic/angular';
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
              public showInfoPage: ModalController,
              public meusPosts: ModalController,
              public alert: AlertController) {

                this.usuario.getUser().subscribe(user => {
                  this.ra = user.email.split("@")[0];

                  this.getPosts()
                  .then((result) => {
                    this.objetos = result;
                    console.log("posts", this.objetos);
                  })
                  .catch((erro) => {
                    console.log("erro");
                  });
                });

                
              }

  ngOnInit() {
  }

  async showPostInfo(item) {
    const showInfo = await this.showInfoPage.create({
      component: PostInfoPage,
      componentProps: {item: item}
    });
    await showInfo.present();
  }

  async contactar(item) {

    let user_info = null;

    this.urlRequest = this.url + '/usuario/' + item.donopost;
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

  verMapa(item) {
    console.log("Em desenvolvimento");
  }

  voltar() {
    this.meusPosts.dismiss({
      retorno: null
    });
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
