import { Component } from '@angular/core';
import axios from 'axios';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.css'
})
export class InputFormComponent {

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
      const response = await axios.post('http://127.0.0.1:8000/movies/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload Success:', response.data);
      this.dialogMessage = 'Success'
      this.showDialog = true;
    } catch (err: any) {
      console.error('Upload Failed:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Unknown error';
      this.dialogMessage = 'Failed to Upload: ' + errorMessage;
      this.showDialog = true;
    }
  }

  closeDialog() {
    this.showDialog = false;
  }
}
