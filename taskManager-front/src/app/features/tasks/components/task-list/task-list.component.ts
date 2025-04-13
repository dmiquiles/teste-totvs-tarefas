import { Component, Input, SimpleChanges } from '@angular/core';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { openDeleteModal, openModal } from '../../store/actions/modal.action';
import { FormsModule } from '@angular/forms';
import { toggleTaskComplete } from '../../store/actions/task.action';
import { selectCurrentFilter } from '../../store/selectors/filter.selectors';
import { selectSearchTerm } from '../../store/selectors/search.selectors';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {

  @Input() tasks!: Task[] | null;
  filteredTasks$: Observable<any[]> = new Observable();

  constructor(private store: Store) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tasks'] && this.tasks) {
      this.filteredTasks$ = combineLatest([
        this.store.select(selectCurrentFilter),
        this.store.select(selectSearchTerm)
      ]).pipe(
        map(([filter, searchTerm]) => {
          if (!this.tasks) return [];

          let filteredTasks = this.tasks;
          if (filter === 'Ativas') {
            filteredTasks = filteredTasks.filter((task) => !task.completed);
          } else if (filter === 'Concluídas') {
            filteredTasks = filteredTasks.filter((task) => task.completed);
          }

          return filteredTasks.filter((task) =>
            task.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
        })
      );
    }
  }

  toggleComplete(task: Task) {
    this.store.dispatch(toggleTaskComplete({ task }));
  }

  editTask(task: Task) {
    this.store.dispatch(openModal({ task }));
  }

  normalizePriority(task: Task): string {
    return task.priority.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  }

  deleteTask(taskId: string) {
    this.store.dispatch(openDeleteModal({ taskId }));
  }

}
