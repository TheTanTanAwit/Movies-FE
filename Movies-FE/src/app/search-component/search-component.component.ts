import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-component',
  imports: [],
  templateUrl: './search-component.component.html',
  styleUrl: './search-component.component.css'
})
export class SearchComponentComponent {

  @Output() searchQuery = new EventEmitter<string>();

  onButtonClick(query: string) {
    this.searchQuery.emit(query);
  }
}
