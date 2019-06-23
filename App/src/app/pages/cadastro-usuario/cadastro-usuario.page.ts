import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertController } from '@ionic/angular';
declare var require: any

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.page.html',
  styleUrls: ['./cadastro-usuario.page.scss'],
})
export class CadastroUsuarioPage implements OnInit {

  constructor(private usuario: UsuarioService, 
              public router: Router, 
              public alert: AlertController) { }

  // Variáveis de preenchimeto do usuário.
  ra; email; nome; contato; campus; senha; dicaSenha;
  
  // Lista com todos os campus da UTFPR até o momento.
  public listaCampus = ['Apucarana', 'Campo Mourão', 'Cornélio Procópio', 'Curitiba', 'Dois Vizinhos', 'Francisco Beltrão', 
                        'Guarapuava', 'Londrina', 'Medianeira', 'Pato Branco', 'Ponta Grossa', 'Santa Helena', 'Toledo'];

  // Variáveis que mostram um label na tela caso algum erro ocorra.
  senhaInvalida     = false; 
  camposInvalidos   = false;
  usuarioCadastrado = false;
  raInvalido        = false;

  // Variáveis para conexão com a API.
  input;
  axios = require('axios');
  url = 'http://127.0.0.1:8080';
  urlRequest = this.url + '/usuario/';

  ngOnInit() {
  } 

  public voltar() {
    this.router.navigateByUrl("/home");
  }

  public async validaDados(){
    
    // Se algum campo for deixado em branco mostra um aviso ao usuário e não continua.
    if(this.ra       == undefined ||
      this.nome      == undefined ||
      this.contato   == undefined ||
      this.campus    == undefined ||
      this.senha     == undefined ||
      this.dicaSenha == undefined){

     this.senhaInvalida     = false; 
     this.camposInvalidos   = true ;
     this.usuarioCadastrado = false;
     this.raInvalido        = false;
     return;
    }

    if(isNaN(this.ra)){
      this.raInvalido        = true;
      this.senhaInvalida     = false; 
      this.camposInvalidos   = false;
      this.usuarioCadastrado = false;
      return;
    }
    
    // Manipulação com a API.
    this.urlRequest = this.url + '/usuario/criar/';

    this.input = '{"id": "'+this.ra+'","nome": "'+this.nome+'","campus": "'+this.campus+'","contato": "'+this.contato+'","senha": "'+this.senha+'","dicasenha": "'+this.dicaSenha+'"}';
    this.input = JSON.parse(this.input);

    let erro = false;
    await this.axios.post(this.urlRequest, this.input)
    .then(function (resposta) {
    })
    .catch(function (error) {
      //console.log('Erro: ' + error)
      erro = true;
    });

    // Firebase só aceita email, então adiciona-se um email padrão a todos os R.A.
    this.email = this.ra + '@utfapp.com';

    // Registra o usuário no Firebase e limpa todos os campos.
    try {
      await this.usuario.registar(this.email, this.senha);
      
      this.router.navigateByUrl('/tabs');

      this.ra                = undefined;
      this.nome              = undefined;
      this.contato           = undefined;
      this.campus            = undefined;
      this.senha             = undefined;
      this.dicaSenha         = undefined;
      this.senhaInvalida     = false; 
      this.camposInvalidos   = false;
      this.usuarioCadastrado = false;
      this.raInvalido        = false;
    } catch (erro) {
      // Trata possíveis erros detectados em testes.
      if (erro == 'Error: The email address is already in use by another account.'){
        this.senhaInvalida     = false; 
        this.camposInvalidos   = false;
        this.usuarioCadastrado = true ;
        this.raInvalido        = false;
      } else if (erro == 'Error: Password should be at least 6 characters' ||
                 erro ==  'Error: createUserWithEmailAndPassword failed: Second argument "password" must be a valid string.'){

        this.senhaInvalida     = true ; 
        this.camposInvalidos   = false;
        this.usuarioCadastrado = false;
        this.raInvalido        = false;
      }
      //console.log(erro);
    }
    let alerta;
    if(!erro){
      alerta = await this.alert.create({
        header: "Bem vindo.",
        message: "Usuário cadastrado com sucesso!",
        buttons: ["OK"]
      });
      await alerta.present();
    }else{
      alerta = await this.alert.create({
        header: "Erro!",
        message: "Não foi possível cadastrar.",
        buttons: ["OK"]
      });
      await alerta.present();
      return;
    }
  }

}
