import { ModalController, AlertController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';
import { HTTP } from '@ionic-native/http/ngx';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { environment } from '../../../environments/environment.prod';

declare var require: any

@Component({
  selector: 'app-edita-usuario',
  templateUrl: './edita-usuario.page.html',
  styleUrls: ['./edita-usuario.page.scss'],
})
export class EditaUsuarioPage implements OnInit {

  @Input() user_info: any;

  user; editado = false;

  constructor(private usuario: UsuarioService, 
              public modal: ModalController,
              public alert: AlertController,
              public router: Router,
              public http: HTTP) {}

  // Variáveis de preenchimeto do usuário.
  ra; email; nome; contato; campus; senha; dicaSenha; currentUser;
  
  // Lista com todos os campus da UTFPR até o momento.
  public listaCampus = ['Apucarana', 'Campo Mourão', 'Cornélio Procópio', 'Curitiba', 'Dois Vizinhos', 'Francisco Beltrão', 
                        'Guarapuava', 'Londrina', 'Medianeira', 'Pato Branco', 'Ponta Grossa', 'Santa Helena', 'Toledo'];

  // Variáveis que mostram um label na tela caso algum erro ocorra.
  senhaInvalida = false; 
  senhaAlterada = false;
  senhaDiferete = false;

  // Variáveis para conexão com a API.
  input;
  axios = require('axios');
  url = environment.baseapi
  urlRequest = this.url + '/usuario/';

  ngOnInit() {
    this.user = {... this.user_info};
    this.currentUser = firebase.auth().currentUser;
  } 

  public voltar() {
    this.modal.dismiss({
      retorno: this.editado
    })
  }

  public async validaDados(){
    
    // Se algum campo for deixado em branco mostra um aviso ao usuário e não continua.
    if(this.user.id       == undefined ||
      this.user.nome      == undefined ||
      this.user.contato   == undefined ||
      this.user.campus    == undefined ||
      this.user.senha     == undefined ||
      this.user.dicasenha == undefined){

      this.senhaInvalida = false; 
      this.senhaDiferete = false;
      this.senhaAlterada = false;

      return;
    }
    
    // Manipulação com a API.
    this.urlRequest = this.url + '/usuario/atualizar/';

    this.input = '{"id": "'+this.user.id+'","nome": "'+this.user.nome+'","campus": "'+this.user.campus+'","contato": "'+this.user.contato+'","senha": "'+this.user.senha+'","dicasenha": "'+this.user.dicasenha+'"}';
    this.input = JSON.parse(this.input);

    var erro = false;


    this.http.setDataSerializer('json')
    await this.http.put(this.urlRequest, this.input, { 'Content-Type': 'application/json' })
    .then((result) => {
    })
    .catch((error) => {
      erro = true;
    })

    // await this.axios.put(this.urlRequest, this.input)
    // .then(function (resposta) {
    // })
    // .catch(function (error) {
    //   erro = true;
    // });

    var alerta: any;
    if(!erro){
      alerta = await this.alert.create({
        header: "Sucesso!",
        message: "Dados atualizados com sucesso.",
        buttons: ["OK"]
      });

      this.editado = true;
      this.voltar();
    }else{
      alerta = await this.alert.create({
        header: "Erro!",
        message: "Não foi possível atualizar os dados.",
        buttons: ["OK"]
      });
    }

    await alerta.present();
  }

  async alterarSenha(){
    const md5 = new Md5();
    var currentPassword;
    var newPassword;
    newPassword = await this.alert.create({
      header: "Alterar senha",
      inputs:[{
        name: 'anterior',
        type: 'password',
        placeholder: 'Senha anterior...'
      },
      {
        name: 'nova',
        type: 'password',
        placeholder: 'Nova senha...'
      }],
      buttons: [{
        text: 'Salvar',
        handler: async (form) => {
          currentPassword = md5.appendStr(form.anterior).end();
          if(currentPassword == this.user.senha){
            var email = this.user.id + '@utfapp.com'

            const credential = firebase.auth.EmailAuthProvider.credential(
              email, 
              form.anterior
            );

            await this.currentUser.reauthenticateWithCredential(credential).then(function() {
            }).catch(function(error) {
            });

            var flag1 = false;
            var flag2 = false;

            await this.currentUser.updatePassword(form.nova).then(function() {
              flag1 = true;
            }).catch(function(error) {
              flag2 = true;
              return;
            });
            
            if(flag1){
              this.senhaInvalida = false;
              this.senhaAlterada = true ;
              this.senhaDiferete = false;
              this.user.senha = form.nova;
            } else if (flag2){
              this.senhaInvalida = true ;
              this.senhaAlterada = false;
              this.senhaDiferete = false;
            }

          } else {
            this.senhaInvalida = false;
            this.senhaAlterada = false;
            this.senhaDiferete = true ;
          }
        }
      },{
        text: 'Cancelar'
      }]
    });
    await newPassword.present();
  }
}
