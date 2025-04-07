import { Component, OnInit, Input } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';
import { SearchComponentComponent } from '../search-component/search-component.component';
import { Movielisting } from '../movielisting';
import axios from 'axios';
import { AxiosResponse } from 'axios';
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router';
import { MovieService } from '../movie-service.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
  imports: [ListItemComponent, SearchComponentComponent, CommonModule, RouterModule]
})

export class LandingPageComponent implements OnInit {
  title = 'NotFlix';
  movieListing: Movielisting[] = [];

  constructor(private movieService: MovieService) {} // Inject the MovieService

  async ngOnInit(): Promise<void> {
    this.movieListing = await this.movieService.getAllMovies(); // Use the service to fetch movies
    console.log(this.movieListing);
  }

  onMovieDeleted(movieId: number): void {
    // Filter out the deleted movie from the list
    this.movieListing = this.movieListing.filter((movie) => movie.id !== movieId);
  }
}