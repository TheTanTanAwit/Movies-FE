import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movielisting } from '../movielisting';
import  axios, { AxiosResponse } from 'axios';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-item',
  imports: [CommonModule, RouterModule],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css'
})

export class ListItemComponent {
  @Input() movie: any;
  @Output() movieDeleted: EventEmitter<number> = new EventEmitter<number>();
  showMenu: boolean = false;
  showDialog = false;
  dialogMessage = '';

  toggleMenu(event: Event): void {
    // Prevent click event from propagating to avoid closing the menu instantly
    event.stopPropagation();
    this.showMenu = !this.showMenu;
  }


  editMovie(movieId: number): void {
    console.log('Editing movie with ID:', movieId);
    // Add your edit logic here
  }

  async deleteMovie(movieId: number): Promise<void> {
    try {
      const response: AxiosResponse<any> = await axios.delete(
        'http://127.0.0.1:8000/movies/' + movieId + '/',
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (response.status == 204) {
        console.log('Deleted');
        // Emit the movie ID back to the parent component
        this.movieDeleted.emit(movieId);
        this.dialogMessage = 'Success'
        this.showDialog = true;
      }
    } catch (err: any) {
        console.error('Upload Failed:', err);
        const errorMessage = err.response?.data?.message || err.message || 'Unknown error';
        this.dialogMessage = 'Failed to Upload: ' + errorMessage;
        this.showDialog = true;
    }
  }
  
  ngOnInit() {
    document.addEventListener('click', () => {
      this.showMenu = false;
    });
  }

  closeDialog() {
    this.showDialog = false;
  }
}
