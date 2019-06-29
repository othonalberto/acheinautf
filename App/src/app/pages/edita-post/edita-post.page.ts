import { ModalController, AlertController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HTTP } from '@ionic-native/http/ngx';
import { environment } from '../../../environments/environment.prod';
import { Camera } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

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
              public alert: AlertController,
              public http: HTTP,
              public camera: Camera,
              public imagePicker: ImagePicker) {
    this.usuario.getUser().subscribe(user => {
      this.ra = user.email.split("@")[0]
    });
  }

  post;
  editado = false;
  public foto = '';

  // Variáveis de preenchimeto do usuário.
  titulo; lugar; descricao; ra;

  // Variáveis que mostram um label na tela caso algum erro ocorra.
  senhaInvalida     = false; 
  camposInvalidos   = false;
  usuarioCadastrado = false;

  // Variáveis para conexão com a API.
  input;
  axios = require('axios');
  url = environment.baseapi
  urlRequest = this.url + '/usuario/';

  @Input() post_info: any;

  ngOnInit() {
    this.post = {... this.post_info};
  }

  public voltar() {
    this.modal.dismiss({
      retorno: this.editado
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
    this.input = '{"titulo": "'+this.post.titulo+'","lugar": "'+this.post.lugar+'","descricao": "'+this.post.descricao+'","donopost" : "' + this.post.ra + '","foto": "'+this.post.foto+'"}';
    
    this.input = JSON.parse(this.input);

    let erro = false;

    this.http.setDataSerializer('json')
    await this.http.put(this.urlRequest, this.input, { 'Content-Type': 'application/json' })
    .then((result) => {
    })
    .catch((error) => {
      console.log(error)
      erro = true;
    })

    // await this.axios.put(this.urlRequest, this.input)
    // .then(function (resposta) {
    //   console.log(resposta.data)
    // })
    // .catch(function (error) {
    //   erro = true;
    //   console.log(error)
    // });

    var alerta: any;
    if(!erro){
      alerta = await this.alert.create({
        header: "Sucesso!",
        message: "Post atualizado com sucesso.",
        buttons: ["OK"]
      });
      this.editado = true;
      this.voltar();
    }else{
      alerta = await this.alert.create({
        header: "Erro!",
        message: "Não foi possível atualizar o post.",
        buttons: ["OK"]
      });
    }

    await alerta.present();
  }

  async tirarFoto(){
    let opcoes = {
      quality: 95,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    let captura = await this.camera.getPicture(opcoes);
    this.post.foto = 'data:image/jpeg;base64,' + captura;
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
          this.post.foto = 'data:image/jpeg;base64,' + results[i];
      }
    }, (err) => { });
  }

}
