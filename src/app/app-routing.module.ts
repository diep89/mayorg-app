import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    canLoad: [AuthGuard],
    loadChildren: './home/home.module#HomePageModule'
  },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  {
    path: 'ranking',
    loadChildren: './ranking/ranking.module#RankingPageModule',
    canLoad: [AuthGuard]
  },
  {
    // Acá hay que cambiar el path a ':preguntaId'
    path: 'pregunta',
    loadChildren: './pregunta/pregunta.module#PreguntaPageModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'nuevaPartida',
    loadChildren: './nueva-partida/nueva-partida.module#NuevaPartidaPageModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'acercade',
    loadChildren: './acercade/acercade.module#AcercadePageModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'colaborar',
    loadChildren: './colaborar/colaborar.module#ColaborarPageModule',
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
