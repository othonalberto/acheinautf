import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public ra = '';
  public senha = '';
  public email = '';
  public checkingUser = true;
  public showLoading = false;
  public invalido = false;

  constructor(public usuario: UsuarioService, public router: Router) {
    this.usuario.getUser().subscribe(user => {
      
      (user.isOnline) ? this.router.navigateByUrl('/tabs') : this.checkingUser = false;
    });
  }

  async login(){
    this.email = this.ra + '@utfapp.com';
    try{
      this.showLoading = true;
      await this.usuario.login(this.email, this.senha);
      this.showLoading = true;
      
      this.router.navigateByUrl('/tabs');
    } catch (erro){
      this.showLoading = false;
      this.ra = '';
      this.email = '';
      this.senha = '';
      this.invalido = true;
      console.log(erro);
    }
  }

  registrar(){
    this.router.navigateByUrl('/cadastro-usuario');
  }

  esqueci(){
    this.router.navigateByUrl('/dica-senha');
  }

}
