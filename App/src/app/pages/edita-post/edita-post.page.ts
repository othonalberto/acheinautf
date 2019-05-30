import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edita-post',
  templateUrl: './edita-post.page.html',
  styleUrls: ['./edita-post.page.scss'],
})
export class EditaPostPage implements OnInit {

  constructor(public modal: ModalController) { }

  ngOnInit() {
  }

  public voltar() {
    this.modal.dismiss({
      retorno: null
    })
  }

}
