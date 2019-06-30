import { UsuarioService } from 'src/app/services/usuario.service';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
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
  editado = false;

  constructor(public modal: ModalController,
              public usuario: UsuarioService,
              public alert: AlertController,
              public http: HTTP) {
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
      retorno: this.achado
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

    this.urlRequest = this.url + '/post/deletar/'+this.post.id;
    
    // this.input = '{"id": "'+this.post.id+'","titulo": "'+this.post.titulo+'","lugar": "'+this.post.lugar+'","descricao": "'+this.post.descricao+'","donopost" : "' + this.post.donopost + '"}';
    
    // console.log(this.input)
    //this.input = '{"id": "'+this.post.id +'"}'

    // console.log(this.input)
    // console.log(this.post.id)

    // this.input = JSON.parse(this.input);

    let erro = false;

    // await this.axios.delete(this.urlRequest, {data: this.input})
    // .then(function (resposta) {
    //   console.log(resposta.data)
    // })
    // .catch(function (error) {
    //   console.log(error)
    //   erro = true;
    // });

    //this.http.setDataSerializer('json')
    await this.http.delete(this.urlRequest, { }, { })
    .then((result) => {
    })
    .catch((error) => {
      erro = true;
    })

    var alerta: any;
    if(!erro){
      alerta = await this.alert.create({
        header: "Sucesso!",
        message: "Post removido com sucesso.",
        buttons: ["OK"]
      });
      await alerta.present();
      this.editado = true;
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

  async achado() {
    const msg = await this.alert.create({
      animated: true,
      header: "O objeto foi realmente devolvido?",
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
          this.setAchado();
        }
      }]
    });
    await msg.present();
  }

  async setAchado(){
    this.urlRequest = this.url + '/post/atualizar/';
    this.post.achado = 1;
    //this.input = '{"id": "'+this.post.id+'","titulo": "'+this.post.titulo+'","lugar": "'+this.post.lugar+'","descricao": "'+this.post.descricao+'","donopost" : "' + this.post.ra + '","foto": "'+this.post.foto+'","achado": "1"}';
    this.input = this.post;
    //this.input = JSON.parse(this.input);

    let erro = false;

    this.http.setDataSerializer('json')
    await this.http.put(this.urlRequest, this.input, { 'Content-Type': 'application/json' })
    .then((result) => {
    })
    .catch((error) => {
      erro = true;
    })

    var alerta: any;
    if(!erro){
      alerta = await this.alert.create({
        header: "Sucesso!",
        message: "Post finalizado com sucesso.",
        buttons: ["OK"]
      });
      await alerta.present();
      this.editado = true;
      this.voltar();
    }else{
      alerta = await this.alert.create({
        header: "Erro!",
        message: "Não foi possível finalizar o post.",
        buttons: ["OK"]
      });
      await alerta.present();
    }
  }
}