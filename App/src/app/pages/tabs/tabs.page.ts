import { CadastroPostPage } from './../cadastro-post/cadastro-post.page';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(public modal: ModalController) { }

  ngOnInit() {
  }

  async showCadastroPost(){
    const cadastro = await this.modal.create({
      component: CadastroPostPage
    });
    await cadastro.present();
  }
}
