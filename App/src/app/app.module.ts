import { MeusPostsPage } from './pages/meus-posts/meus-posts.page';
import { CadastroPostPage } from './pages/cadastro-post/cadastro-post.page';
import { PostInfoPage } from './pages/post-info/post-info.page';
import { EditaUsuarioPage } from './pages/edita-usuario/edita-usuario.page';
import { EditaPostPage } from './pages/edita-post/edita-post.page';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx'
import { HTTP } from '@ionic-native/http/ngx';

@NgModule({
  declarations: [AppComponent, EditaPostPage, EditaUsuarioPage, 
                 PostInfoPage, CadastroPostPage],
  entryComponents: [EditaPostPage, EditaUsuarioPage, PostInfoPage, CadastroPostPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule],
  providers: [
    StatusBar,
    SplashScreen,
    Contacts,
    Contact,
    HTTP,
    EmailComposer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
