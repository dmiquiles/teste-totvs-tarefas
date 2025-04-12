import { Component, inject, OnInit } from '@angular/core';
import { TaskListComponent } from "../../components/task-list/task-list.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TaskHeaderComponent } from "../../components/task-header/task-header.component";
import { ContainerComponent } from '../../../../shared/components/container/container.component';
import { TaskSearchComponent } from "../../components/task-search/task-search.component";
import { TaskFilterComponent } from "../../components/task-filter/task-filter.component";
import { Task } from '../../models/task.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllTasks } from '../../store/selectors/task.selectors';
import { CommonModule } from '@angular/common';
import { loadTasks } from '../../store/actions/task.action';
import { selectIsDeleteModalOpen, selectModalOpen } from '../../store/selectors/modal.selectors';
import { TaskConfirmDialogComponent } from '../../components/task-confirm-dialog/task-confirm-dialog.component';
import { TaskModalComponent } from '../../components/task-modal/task-modal.component';

@Component({
  selector: 'app-task-page',
  imports: [
    CommonModule,
    ContainerComponent,
    TaskListComponent,
    TaskHeaderComponent,
    TaskSearchComponent,
    TaskFilterComponent,
    TaskConfirmDialogComponent,
    TaskModalComponent
],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.scss'
})
export class TaskPageComponent implements OnInit {
  
  tasks$!: Observable<Task[]>;
  isDeleteModalOpen$!: Observable<boolean>;
  isModalOpen$!: Observable<boolean>;
  
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadTasks());
    this.tasks$ = this.store.select(selectAllTasks);
    this.isDeleteModalOpen$ = this.store.select(selectIsDeleteModalOpen);
    this.isModalOpen$ = this.store.select(selectModalOpen);
  }

  toggleComplete(task: Task) {
    task.completed = !task.completed;
  }

}
