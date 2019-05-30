import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
declare var require: any

@Component({
  selector: 'app-dica-senha',
  templateUrl: './dica-senha.page.html',
  styleUrls: ['./dica-senha.page.scss'],
})
export class DicaSenhaPage implements OnInit {

  constructor(public alert: AlertController) { }

  ngOnInit() {
  }

  ra = undefined;
  raInvalido = false;

  // Variáveis para conexão com a API.
  input;
  axios = require('axios');
  url = 'http://127.0.0.1:8080';
  urlRequest = this.url + '/usuario/';

  async mostrar(){
    if(this.ra == undefined){
      this.raInvalido = true;
      return;
    }
    var dicaSenha;

    this.urlRequest = this.url + '/usuario/'+this.ra;
    await this.axios.get(this.urlRequest)
    .then(function (resposta) {
      dicaSenha = resposta.data.respostas[0]["dicasenha"];
    })
    .catch(function (error) {
      console.log('Erro: ' + error)
    })

    const dica = await this.alert.create({
      header: 'Dica de Senha',
      subHeader: 'Sua dica é: ',
      message: dicaSenha,
      buttons: ['OK']
    });
    await dica.present();
  }

}
