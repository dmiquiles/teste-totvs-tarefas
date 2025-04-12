import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { openModal } from '../../store/actions/modal.action';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {

  @Input() tasks!: Task[] | null;
  @Output() taskCompleted = new EventEmitter<Task>();
  filteredTasks$: Observable<any[]> = new Observable();
  private searchTerm$ = new BehaviorSubject<string>('');

  constructor(private store: Store<{ search: { term: string } }>) {
    this.store.select('search').subscribe((state) => {
      this.searchTerm$.next(state.term.toLowerCase());
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tasks'] && this.tasks) {
      this.filteredTasks$ = this.searchTerm$.pipe(
        map((term) =>
          (this.tasks || []).filter((task) =>
            task.title.toLowerCase().includes(term)
          )
        )
      );
    }
  }

  toggleComplete(task: Task) {
    task.completed = !task.completed;
    this.taskCompleted.emit(task);
  }

  editTask(task: Task) {
    this.store.dispatch(openModal({ task })); // Dispara a ação para abrir o modal com a tarefa
  }

  normalizePriority(task: Task): string {
    return task.priority.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  }

}
