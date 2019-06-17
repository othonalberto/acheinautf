import { ModalController, AlertController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';
import * as firebase from 'firebase';
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
              public router: Router) {}

  // Variáveis de preenchimeto do usuário.
  ra; email; nome; contato; campus; senha; dicaSenha; currentUser;
  
  // Lista com todos os campus da UTFPR até o momento.
  public listaCampus = ['Apucarana', 'Campo Mourão', 'Cornélio Procópio', 'Curitiba', 'Dois Vizinhos', 'Francisco Beltrão', 
                        'Guarapuava', 'Londrina', 'Medianeira', 'Pato Branco', 'Ponta Grossa', 'Santa Helena', 'Toledo'];

  // Variáveis que mostram um label na tela caso algum erro ocorra.
  senhaInvalida     = false; 
  camposInvalidos   = false;
  usuarioCadastrado = false;

  // Variáveis para conexão com a API.
  input;
  axios = require('axios');
  url = 'http://127.0.0.1:8080';
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

      this.senhaInvalida     = false; 
      this.camposInvalidos   = true ;
      this.usuarioCadastrado = false;
      return;
    }
    
    // Manipulação com a API.
    this.urlRequest = this.url + '/usuario/atualizar/';

    this.input = '{"id": "'+this.user.id+'","nome": "'+this.user.nome+'","campus": "'+this.user.campus+'","contato": "'+this.user.contato+'","senha": "'+this.user.senha+'","dicasenha": "'+this.user.dicasenha+'"}';
    this.input = JSON.parse(this.input);

    var erro = false;

    await this.axios.put(this.urlRequest, this.input)
    .then(function (resposta) {
    })
    .catch(function (error) {
      erro = true;
    });

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
    console.log(this.user.senha)

    var newPassword;
    newPassword = await this.alert.create({
      header: "Alterar senha",
      inputs:[{
        name: 'anterior',
        type: 'password',
        placeholder: 'senha anterior...'
      },
      {
        name: 'nova',
        type: 'password',
        placeholder: 'nova senha...'
      }],
      buttons: [{
        text: 'Salvar',
        handler: async (form) => {
          currentPassword = md5.appendStr(form.anterior).end();
          if(currentPassword == this.user.senha){
            console.log('iguais');

            var email = this.user.id + '@utfapp.com'

            const credential = firebase.auth.EmailAuthProvider.credential(
              email, 
              form.anterior
            );

            await this.currentUser.reauthenticateWithCredential(credential).then(function() {
              console.log('credenciou')
            }).catch(function(error) {
              console.log('erro no credenciar')
              console.log(error)
            });

            await this.currentUser.updatePassword(form.nova).then(function() {
              console.log('deu certo');
            }).catch(function(error) {
              console.log('erro no update');
              console.log(error);
            });

            this.user.senha = form.nova;

          } else {
            console.log('não iguais');
          }
        }
      },{
        text: 'Cancelar'
      }]
    });
    await newPassword.present();
  }
}
