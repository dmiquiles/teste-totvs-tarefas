import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { setSearchTerm } from '../../store/actions/search.action';

@Component({
  selector: 'app-task-search',
  imports: [
    FormsModule
  ],
  templateUrl: './task-search.component.html',
  styleUrl: './task-search.component.scss'
})
export class TaskSearchComponent {
  
  searchQuery = '';

  constructor(private store: Store) {}

  searchTasks(term: any) {
    if(term.length >= 3) {
      this.store.dispatch(setSearchTerm({ term }));
    } else {
      this.store.dispatch(setSearchTerm({ term: '' }));
    }
  }

}
