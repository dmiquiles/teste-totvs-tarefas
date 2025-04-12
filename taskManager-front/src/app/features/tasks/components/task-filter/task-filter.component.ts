import { Component } from '@angular/core';

@Component({
  selector: 'app-task-filter',
  imports: [],
  templateUrl: './task-filter.component.html',
  styleUrl: './task-filter.component.scss'
})
export class TaskFilterComponent {

  filter: 'Todas' | 'Ativas' | 'Concluídas' = 'Todas';

  setFilter(f: 'Todas' | 'Ativas' | 'Concluídas') {
    this.filter = f;
  }

}
