import { Component, EventEmitter, Output } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TaskFormComponent } from "../task-form/task-form.component";
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-modal',
  imports: [MatDialogModule, MatButtonModule, MatIconModule, TaskFormComponent],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss'
})
export class TaskModalComponent {

  @Output() fechar = new EventEmitter<void>();
  // @Output() criar = new EventEmitter<Task>();

}
