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

  async showCadastroPost(){
    this.route.navigateByUrl("/cadastro-post");
  }
}
