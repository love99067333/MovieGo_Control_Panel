import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MoviePage } from './movie.page';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {
    path: '',
    component: MoviePage
  },
  {
    path:':id',
    component:DetailsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MoviePage,DetailsComponent]
})
export class MoviePageModule {}
