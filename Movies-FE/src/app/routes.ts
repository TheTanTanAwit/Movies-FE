import { Routes } from '@angular/router'
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MoviePlayerComponent } from './movie-player/movie-player.component';
import { InputFormComponent } from './input-form/input-form.component';
import { Input } from '@angular/core';

const routeConfig: Routes = [
    {
      path: '',
      component: LandingPageComponent,
      title: 'Home page',
    },
    {
      path: 'player/:id',
      title: 'Movie Player',
      component: MoviePlayerComponent
    },
    {
      path: 'add',
      component: InputFormComponent,
      title: 'Add Movie',
    },
    {
      path: 'add/:id',
      component: InputFormComponent,
      title: 'Edit Movie'
    }
  ];

  export default routeConfig;