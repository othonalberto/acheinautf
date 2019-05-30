import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutenticacaoGuard } from './guards/autenticacao.guard';

// Aqui no path da pagina principal do app deve ser criado um guard adicionando 'canActivate: [AutenticacaoGuard]'
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'cadastro-usuario', loadChildren: './pages/cadastro-usuario/cadastro-usuario.module#CadastroUsuarioPageModule' },
  { path: 'cadastro-post', loadChildren: './pages/cadastro-post/cadastro-post.module#CadastroPostPageModule', canActivate: [AutenticacaoGuard] },
  { path: 'dica-senha', loadChildren: './pages/dica-senha/dica-senha.module#DicaSenhaPageModule' },
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule', canActivate: [AutenticacaoGuard]},
  { path: 'feed', loadChildren: './pages/feed/feed.module#FeedPageModule', canActivate: [AutenticacaoGuard] },
  { path: 'minha-conta', loadChildren: './pages/minha-conta/minha-conta.module#MinhaContaPageModule', canActivate: [AutenticacaoGuard] },
  { path: 'post-info', loadChildren: './pages/post-info/post-info.module#PostInfoPageModule', canActivate: [AutenticacaoGuard] },
  { path: 'edita-post', loadChildren: './pages/edita-post/edita-post.module#EditaPostPageModule', canActivate: [AutenticacaoGuard] },
  { path: 'edita-usuario', loadChildren: './pages/edita-usuario/edita-usuario.module#EditaUsuarioPageModule', canActivate: [AutenticacaoGuard] },
  { path: 'meus-posts', loadChildren: './pages/meus-posts/meus-posts.module#MeusPostsPageModule', canActivate: [AutenticacaoGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
