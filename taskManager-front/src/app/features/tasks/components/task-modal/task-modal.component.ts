import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TaskFormComponent } from "../task-form/task-form.component";
import { Store } from '@ngrx/store';
import { closeModal } from '../../store/actions/modal.action';

@Component({
  selector: 'app-task-modal',
  imports: [MatDialogModule, MatButtonModule, MatIconModule, TaskFormComponent],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss'
})
export class TaskModalComponent {

  constructor(private store: Store) {}

  close() {
    this.store.dispatch(closeModal());
  }

}
