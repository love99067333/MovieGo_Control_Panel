import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'account', loadChildren: './account/account.module#AccountPageModule' },
  { path: 'cinema', loadChildren: './cinema/cinema.module#CinemaPageModule' },
  {
    path: 'movie', loadChildren: './movie/movie.module#MoviePageModule',

  },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'profile/setting', loadChildren: './setting/setting.module#SettingPageModule' },
  { path: 'change-password', loadChildren: './change-password/change-password.module#ChangePasswordPageModule' },

  /*
  { path: 'setting', loadChildren: './setting/setting.module#SettingPageModule' },*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
