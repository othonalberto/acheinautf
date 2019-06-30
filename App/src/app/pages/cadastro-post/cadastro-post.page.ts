import { ModalController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Camera } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { environment } from '../../../environments/environment.prod';
import { HTTP } from '@ionic-native/http/ngx';

if (environment.production) {
  enableProdMode();
}

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
              public alert: AlertController,
              public camera: Camera,
              public http: HTTP,
              public imagePicker: ImagePicker) {
    this.usuario.getUser().subscribe(user => {
      this.ra = user.email.split("@")[0]
    });
  }

  // Variáveis de preenchimeto do usuário.
  titulo; lugar; descricao; ra;

  criado = false;
  public foto = '';

  // Variáveis que mostram um label na tela caso algum erro ocorra.
  senhaInvalida     = false; 
  camposInvalidos   = false;
  usuarioCadastrado = false;

  // Variáveis para conexão com a API.
  input;
  axios = require('axios');
  url = environment.baseapi
  urlRequest = this.url + '/usuario/';

  ngOnInit() {
  } 

  public voltar() {
    this.modal.dismiss({
      retorno: this.criado
    })
  }

  public async validaDados(){
    
    if(this.titulo   == undefined ||
      this.descricao == undefined ||
      this.lugar     == undefined) {

     this.senhaInvalida     = false; 
     this.camposInvalidos   = true ;
     this.usuarioCadastrado = false;

     return;
    }

    this.urlRequest = this.url + '/post/criar/';

    this.input = '{"titulo": "'+this.titulo+'","lugar": "'+this.lugar+'","descricao": "'+this.descricao+'","donopost" : "' + this.ra + '","foto": "'+this.foto+'"}';
    
    this.input = JSON.parse(this.input);
    
    let erro = false;

    this.http.setDataSerializer('json')
    await this.http.post(this.urlRequest, this.input, { 'Content-Type': 'application/json' })
    .then((result) => {
    })
    .catch((error) => {
      erro = true;
    })

    // await this.axios.post(this.urlRequest, this.input)
    // .then(function (resposta) {
      
    // })
    // .catch(function (error) {
    //   erro = true;
    // });

    var alerta: any;
    if(!erro){
      alerta = await this.alert.create({
        header: "Sucesso!",
        message: "Post criado com sucesso.",
        buttons: ["OK"]
      });
      await alerta.present();
      this.criado = true;
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

  async tirarFoto(){
    let opcoes = {
      quality: 95,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    let captura = await this.camera.getPicture(opcoes);
    this.foto = 'data:image/jpeg;base64,' + captura;
  }

  async getFoto(){
    let opcoes = {
      maximumImagesCount: 1,
      width: 500,
      height: 500,
      outputType: 1,
      quality: 95
    }
    this.imagePicker.getPictures(opcoes).then((results) => {
      for (var i = 0; i < results.length; i++) {
          this.foto = 'data:image/jpeg;base64,' + results[i];
      }
    }, (err) => { });
  }

}
