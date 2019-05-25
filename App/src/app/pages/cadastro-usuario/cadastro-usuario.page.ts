import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.page.html',
  styleUrls: ['./cadastro-usuario.page.scss'],
})
export class CadastroUsuarioPage implements OnInit {

  constructor(public router: Router) { }

  ra; nome; contato; campus; senha; dados;

  public listaCampus = ['Apucarana', 'Campo Mourão', 'Cornélio Procópio', 'Curitiba', 'Dois Vizinhos', 'Francisco Beltrão', 
              'Guarapuava', 'Londrina', 'Medianeira', 'Pato Branco', 'Ponta Grossa', 'Santa Helena', 'Toledo'];

  ngOnInit() {
  }

  validaDados(){
    console.log("Dados válidos")

    this.dados = true;

    if(this.dados){
      this.router.navigateByUrl('/home')
    }
  }

}
