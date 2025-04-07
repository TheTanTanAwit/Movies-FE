import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { LandingPageComponent } from './app/landing-page/landing-page.component';
import routeConfig from './app/routes';
import {provideRouter} from '@angular/router';
import { MoviePlayerComponent } from './app/movie-player/movie-player.component';

bootstrapApplication(AppComponent, {
  providers: [provideProtractorTestingSupport(), provideRouter(routeConfig)],
}).catch((err) => console.error(err));

  // bootstrapApplication(MoviePlayerComponent, {
  //   providers: [provideProtractorTestingSupport(), provideRouter(routeConfig)],
  // }).catch((err) => console.error(err));
  