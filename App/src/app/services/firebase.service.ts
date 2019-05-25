import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() {
    const config = {
      apiKey: "AIzaSyDu9vj35kXjR25hOUQknVYh0_q5TMh5kf8",
      authDomain: "teste-login-dda3d.firebaseapp.com",
      databaseURL: "https://teste-login-dda3d.firebaseio.com",
      projectId: "teste-login-dda3d",
      storageBucket: "teste-login-dda3d.appspot.com",
      messagingSenderId: "1073249846496",
      appId: "1:1073249846496:web:a101a851b53c9f46"
    };
    firebase.initializeApp(config);
  }

  db(){
    return firebase.firestore();
  }

  auth(){
    return firebase.auth();
  }
}
