import { Component, Input, OnInit } from '@angular/core';
import axios from 'axios';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-input-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.css'
})
export class InputFormComponent implements OnInit {
@Input() movieId: number | null = null;


constructor(private route: ActivatedRoute){}

  showDialog = false;
  dialogMessage = '';

  newMovie = {
    title: '',
    description: '',
    movie_file: null as File | null,
  };

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.newMovie.movie_file = file;
  }

  async submitMovie(event: Event) {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('title', this.newMovie.title);
    formData.append('description', this.newMovie.description);
    if (this.newMovie.movie_file) {
      formData.append('movie_file', this.newMovie.movie_file);
    }
  
    try {
      let response;
  
      if (this.movieId !== null) {
        // PUT request (edit)
        response = await axios.put(`http://127.0.0.1:8000/movies/${this.movieId}/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        this.dialogMessage = 'Successfully Updated Movie!';
      } else {
        // POST request (create)
        response = await axios.post('http://127.0.0.1:8000/movies/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        this.dialogMessage = 'Successfully Uploaded Movie!';
      }
  
      console.log('Response:', response.data);
      this.showDialog = true;
  
    } catch (err: any) {
      console.error('Submit Failed:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Unknown error';
      this.dialogMessage = 'Failed to Submit: ' + errorMessage;
      this.showDialog = true;
    }
  }

  closeDialog() {
    this.showDialog = false;
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id')
    this.movieId = idParam ? +idParam : null;

    if (this.movieId !== null) {
      this.fetchMovieForEditing(this.movieId);
    }
  }

  async fetchMovieForEditing(id: number) {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/movies/${id}/`);
      const movie = response.data;
      this.newMovie.title = movie.title;
      this.newMovie.description = movie.description;
      this.newMovie.movie_file = movie.movie_file_base64;
      console.log(this.newMovie.movie_file);
    } catch (err) {
      console.error('Failed to load movie:', err);
    }
  }
}
