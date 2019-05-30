import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-meus-posts',
  templateUrl: './meus-posts.page.html',
  styleUrls: ['./meus-posts.page.scss'],
})
export class MeusPostsPage implements OnInit {

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

      this.getMeusPosts()
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

  voltar() {
    this.modal.dismiss({
      retorno: null
    });
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

}
