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
      apiKey: "AIzaSyBrZYUIJiu9qVzSwVyHAapZeaKXBdDS8dk",
      authDomain: "acheinautf.firebaseapp.com",
      databaseURL: "https://acheinautf.firebaseio.com",
      projectId: "acheinautf",
      storageBucket: "acheinautf.appspot.com",
      messagingSenderId: "875345256004",
      appId: "1:875345256004:web:c85fd6de3d864000"
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
