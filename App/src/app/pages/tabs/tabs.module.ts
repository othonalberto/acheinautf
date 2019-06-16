import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'minha-conta',
        loadChildren: '../minha-conta/minha-conta.module#MinhaContaPageModule'
      },
      {
        path: 'feed',
        loadChildren: '../feed/feed.module#FeedPageModule'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/feed',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
