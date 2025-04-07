import { Injectable } from '@angular/core';
import { Movielisting } from './movielisting';
import axios, { AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor() {}

  // Method to fetch all movies from the backend
  async getAllMovies(): Promise<Movielisting[]> {
    const movieList: Movielisting[] = [];

    try {
      const response: AxiosResponse<any> = await axios.get('http://127.0.0.1:8000/movies/', {
        headers: { 'Content-Type': 'application/json' },
      });

      // Transform response data into the desired format
      for (const responseObject of response.data) {
        const movie: Movielisting = {
          id: responseObject.id,
          title: responseObject.title,
          movie_file: responseObject.movie_file,
          description: responseObject.description,
          date_added: new Date(responseObject.date_added),
        };
        movieList.push(movie);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Error fetching movies:', err.message);
      } else {
        console.error('Unknown error:', err);
      }
    }

    return movieList;
  }
}