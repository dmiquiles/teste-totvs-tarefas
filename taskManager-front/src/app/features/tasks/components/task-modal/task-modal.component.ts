import { Component } from '@angular/core';
import { TaskFormComponent } from "../task-form/task-form.component";
import { Store } from '@ngrx/store';
import { closeModal } from '../../store/actions/modal.action';

@Component({
  selector: 'app-task-modal',
  imports: [TaskFormComponent],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss'
})
export class TaskModalComponent {

  constructor(private store: Store) {}

  close() {
    this.store.dispatch(closeModal());
  }

}
