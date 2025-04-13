import { Component } from '@angular/core';
import { selectCurrentFilter } from '../../store/selectors/filter.selectors';
import { Store } from '@ngrx/store';
import { setFilter } from '../../store/actions/filter.action';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-filter',
  imports: [
    CommonModule
  ],
  templateUrl: './task-filter.component.html',
  styleUrl: './task-filter.component.scss'
})
export class TaskFilterComponent {

  filter: 'Todas' | 'Ativas' | 'Concluídas' = 'Todas';

  currentFilter$ = this.store.select(selectCurrentFilter);

  constructor(private store: Store) {}

  setFilter(filter: 'Todas' | 'Ativas' | 'Concluídas') {
    this.store.dispatch(setFilter({ filter }));
  }

}
