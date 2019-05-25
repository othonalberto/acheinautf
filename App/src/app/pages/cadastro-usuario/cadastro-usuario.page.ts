import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.page.html',
  styleUrls: ['./cadastro-usuario.page.scss'],
})
export class CadastroUsuarioPage implements OnInit {

  constructor(private firebase: FirebaseService,
              private usuario: UsuarioService,
              private alert: AlertController,
              public router: Router) { }

  ra; email; nome; contato; campus; senha;

  public listaCampus = ['Apucarana', 'Campo Mourão', 'Cornélio Procópio', 'Curitiba', 'Dois Vizinhos', 'Francisco Beltrão', 
              'Guarapuava', 'Londrina', 'Medianeira', 'Pato Branco', 'Ponta Grossa', 'Santa Helena', 'Toledo'];

  ngOnInit() {
  } 

  public async validaDados(){
    this.email = this.ra + '@utfapp.com';
    try {
      await this.usuario.registar(this.email, this.senha);
      // AQUI PRECISA TROCAR O 'logado' PARA O NOME DA PÁGINA PRINCIPAL DO APLICATIVO E RETIRAR O console.log()
      console.log("Usuario registrado com sucesso!!");
      //this.router.navigateByUrl('/logado');
    } catch (erro) {
      console.log(erro);
    }
  }

}
