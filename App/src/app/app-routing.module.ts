import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// Aqui no path da pagina principal do app deve ser criado um guard adicionando 'canActivate: [AutenticacaoGuard]'
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'cadastro-usuario', loadChildren: './pages/cadastro-usuario/cadastro-usuario.module#CadastroUsuarioPageModule' },
  { path: 'cadastro-post', loadChildren: './pages/cadastro-post/cadastro-post.module#CadastroPostPageModule' },
  { path: 'dica-senha', loadChildren: './pages/dica-senha/dica-senha.module#DicaSenhaPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
