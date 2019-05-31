import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-post-info',
  templateUrl: './post-info.page.html',
  styleUrls: ['./post-info.page.scss'],
})
export class PostInfoPage implements OnInit {

  constructor(public modal: ModalController) { }


  @Input() post_info : Object;

  post = {
    titulo: '',
    lugar: '',
    descricao: ''
  }

  ngOnInit() {
    console.log(this.post_info);
    //this.post = this.post_info;
  }

  

  voltar() {
    this.modal.dismiss({
      retorno: null
    });  
  }
}