import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario = {};

  constructor(public firebase: FirebaseService, public router: Router) { 
    this.getUser().subscribe();
  }

  getUser(): Observable<any> {
    return Observable.create(observer => {
      this.firebase.auth().onAuthStateChanged(user => {
        if(user){
          this.usuario = {id: user.uid, email: user.email, isOnline: true };
        } else {
          this.usuario = {id: null, email: null, isOnline: false };
        }
        observer.next(this.usuario);
      });
    });
  }

  async login(email, senha){
    try {
      await this.firebase.auth().signInWithEmailAndPassword(email, senha);
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        throw new Error('A senha é inválida');
      } else {
        throw new Error(error.message);
      }
    }
  }

  async registar(email, senha){
    try {
      await this.firebase.auth().createUserWithEmailAndPassword(email, senha);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  logout(){
    this.firebase.auth().signOut();
    this.router.navigateByUrl('/home');
  }
}
