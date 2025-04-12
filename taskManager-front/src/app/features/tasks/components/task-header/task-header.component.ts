import { Component, HostBinding, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectDarkMode } from '../../store/selectors/theme.selectors';
import { toggleDarkMode } from '../../store/actions/theme.action';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskFormComponent } from "../task-form/task-form.component";
import { MatDialog } from '@angular/material/dialog';
import { TaskModalComponent } from '../task-modal/task-modal.component';

@Component({
  selector: 'app-task-header',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    TaskFormComponent,
    TaskModalComponent
],
  templateUrl: './task-header.component.html',
  styleUrl: './task-header.component.scss'
})
export class TaskHeaderComponent {

  darkMode$: Observable<boolean>;

  showModal = false;

  constructor(private store: Store, private dialog: MatDialog) {
    this.darkMode$ = this.store.select(selectDarkMode);
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  toggleDarkMode() {
    this.store.dispatch(toggleDarkMode());
  }

  addTask() {}

}
