import { Component, inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Movielisting } from '../movielisting';
import { AxiosResponse } from 'axios';
import axios from 'axios';
import { Base64VideoPlayerComponent } from '../base64-video-player/base64-video-player.component';

@Component({
  standalone: true,
  selector: 'app-movie-player',
  imports: [CommonModule, Base64VideoPlayerComponent],
  templateUrl: './movie-player.component.html',
  styleUrl: './movie-player.component.css'
})
export class MoviePlayerComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  movieId = -1;

  // Correct declaration as a class property
  movie: Movielisting = {
    id: 1,
    date_added: new Date(),
    description: 'movie.description',
    movie_file: '',
    title: 'movie.title',
  };

  constructor() {
    this.movieId = Number(this.route.snapshot.params['id']);
  }

  async ngOnInit(): Promise<void> {
    this.movie = await this.getMovie();
    console.log('oninit' + this.movie.movie_file);
  }

  public async getMovie(): Promise<Movielisting> {
    try {
      const response: AxiosResponse<any> = await axios.get(
        'http://127.0.0.1:8000/movies/' + this.movieId,
        { headers: { 'Content-Type': 'application/json' } }
      );
      const movie = response.data;
      console.log(movie);

      const mov: Movielisting = {
        id: movie.id,
        date_added: new Date(movie.date_added),
        description: movie.description,
        movie_file: movie.movie_file_base64,
        title: movie.title,
      };

      return mov;
    } catch (err: any) {
      console.error(err);
      throw err; // or return a default value if preferred
    }
  }
}