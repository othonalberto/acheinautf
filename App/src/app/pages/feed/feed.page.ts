import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { PostInfoPage } from '../post-info/post-info.page';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { EditaPostPage } from '../edita-post/edita-post.page';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx'
import { environment } from '../../../environments/environment.prod';

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
  ehtelefone = true;
  axios = require('axios');
  url = environment.baseapi
  urlRequest = this.url + '/usuario/';

  constructor(public usuario: UsuarioService,
              public modal: ModalController,
              public alert: AlertController,
              public contacts: Contacts,
              public email: EmailComposer) {}

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.usuario.getUser().subscribe(async user => {
      this.ra = user.email.split("@")[0];

      await this.getPosts()
      .then((result) => {
        this.objetos = result;
      })
      .catch((erro) => {
        console.log("erro");
      });
    }); 
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
      componentProps: {post_info: post}
    });
    await showInfo.present();
    const{data} = await showInfo.onDidDismiss(); 

    if(data.retorno) location.reload();

  }

  async contactar(post) {

    let user_info = null;
    this.urlRequest = this.url + '/usuario/' + post.donopost;

    // await this.http.get(this.urlRequest, {}, {})
    // .then((result) => {
    //   user_info = result.data.respostas[0];
    //   console.log(result)
    // })
    // .catch((error) => {
    //   console.log(error)
    // })

    await this.axios.get(this.urlRequest)
    .then( function (result) {
      user_info = result.data.respostas[0];
    })
    .catch(function (error) {
      console.log("ERRO");
    });

    if((/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user_info.contato))){
      this.ehtelefone = false
    } else {
      this.ehtelefone = true
    }

    if(user_info != null){
      if(this.ehtelefone){
        let contact: Contact = this.contacts.create();
        const contato = await this.alert.create({
          header: 'Contato de ' + user_info.nome,
          message: user_info.contato,
          buttons: [{
            text: 'Salvar contato',
            handler: async (form) => {
              contact.name = new ContactName(null, '', user_info.nome);
              contact.phoneNumbers = [new ContactField('mobile', user_info.contato)];
              contact.save().then(
                () => console.log('Contato salvo!', contact),
                (error: any) => console.error('Erro ao salvar contato :(', error)
              );
            }
          },{
            text: 'Cancelar'
          }]
        });
        await contato.present();
      } else {
        const contato = await this.alert.create({
          header: 'Contato de ' + user_info.nome,
          message: user_info.contato,
          buttons: [{
            text: 'Enviar email',
            handler: async (form) => {
              const conteudo = {
                to: user_info.contato,
                subject: 'Item encontrado',
                body: 'Olá, este item é meu!'
              };
              this.email.open(conteudo)
            }
          },{
            text: 'Cancelar'
          }]
        });
        await contato.present();
      }
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
  
      // await this.http.get(this.urlRequest, {}, {})
      // .then((resposta) => {
      //   resolve(resposta.data.respostas);
      //   console.log(resposta.data)
      //   console.log(resposta.data.respostas)
      // })
      // .catch((error) => {
      //   reject("ERRO");
      //   console.log(error)
      // })

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
