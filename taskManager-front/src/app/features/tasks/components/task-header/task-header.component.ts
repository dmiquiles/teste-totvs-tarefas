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
import { closeModal, openModal } from '../../store/actions/modal.action';
import { selectModalOpen } from '../../store/selectors/modal.selectors';

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

  isModalOpen$: Observable<boolean>;

  
  constructor(private store: Store, private dialog: MatDialog) {
    this.isModalOpen$ = this.store.select(selectModalOpen);
    this.darkMode$ = this.store.select(selectDarkMode);
  }

  openModal() {
    this.store.dispatch(openModal({task: null}));
  }

  closeModal() {
    this.store.dispatch(closeModal());
  }

  toggleDarkMode() {
    this.store.dispatch(toggleDarkMode());
  }

  addTask() {}

}
