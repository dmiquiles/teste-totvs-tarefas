import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { closeDeleteModal } from '../../store/actions/modal.action';
import { deleteTask } from '../../store/actions/task.action';

@Component({
  selector: 'app-task-confirm-dialog',
  imports: [],
  templateUrl: './task-confirm-dialog.component.html',
  styleUrl: './task-confirm-dialog.component.scss'
})
export class TaskConfirmDialogComponent {

  taskId: string | null = null;

  constructor(private store: Store<{ modal: { taskId: string | null } }>) {
    this.store.select('modal').subscribe((modalState) => {
      this.taskId = modalState.taskId;
    });
  }

  confirmDelete(): void {
    if (this.taskId) {
      this.store.dispatch(deleteTask({ taskId: this.taskId }));
      this.store.dispatch(closeDeleteModal());
    }
  }

  close(): void {
    this.store.dispatch(closeDeleteModal());
  }

}
