import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DicaSenhaPage } from './dica-senha.page';

const routes: Routes = [
  {
    path: '',
    component: DicaSenhaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DicaSenhaPage]
})
export class DicaSenhaPageModule {}
