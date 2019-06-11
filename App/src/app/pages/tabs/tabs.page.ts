import { CadastroPostPage } from './../cadastro-post/cadastro-post.page';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(public modal: ModalController,
              public route: Router) { }

  ngOnInit() {
  }

  criado = false;

  async showCadastroPost(){
    //this.route.navigateByUrl("/cadastro-post");
    const cadastro = await this.modal.create({
      component: CadastroPostPage
    });
    await cadastro.present();

    const{data} = await cadastro.onDidDismiss();

    if(data.retorno) {
      location.reload();
    }

  } 
}
