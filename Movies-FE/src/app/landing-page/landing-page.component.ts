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
  filteredMovies: Movielisting[] = [];
  constructor(private movieService: MovieService) {
    
  } // Inject the MovieService

  async ngOnInit(): Promise<void> {
    this.movieListing = await this.movieService.getAllMovies(); // Use the service to fetch movies
    this.filterResults("");
  }

  onMovieDeleted(movieId: number): void {
    // Filter out the deleted movie from the list
    this.filteredMovies = this.filteredMovies.filter((movie) => movie.id !== movieId);
    console.log("deleted" + movieId);
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredMovies = this.movieListing
      return;
    }

    this.filteredMovies = this.movieListing.filter((movie) =>
      movie?.title.toLowerCase().includes(text.toLowerCase()),
    )
    // this.filteredMovies.forEach(element => {
    //   console.log(element)
    // });
  }
}