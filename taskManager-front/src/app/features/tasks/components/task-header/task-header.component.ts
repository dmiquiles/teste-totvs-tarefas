import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectDarkMode } from '../../store/selectors/theme.selectors';
import { toggleDarkMode } from '../../store/actions/theme.action';
import { CommonModule } from '@angular/common';
import { closeModal, openModal } from '../../store/actions/modal.action';

@Component({
  selector: 'app-task-header',
  imports: [
    CommonModule,
  ],
  templateUrl: './task-header.component.html',
  styleUrl: './task-header.component.scss'
})
export class TaskHeaderComponent {

  darkMode$: Observable<boolean>;

  constructor(private store: Store) {
    this.darkMode$ = this.store.select(selectDarkMode);
  }

  openModal() {
    this.store.dispatch(openModal({ task: null }));
  }

  closeModal() {
    this.store.dispatch(closeModal());
  }

  toggleDarkMode() {
    this.store.dispatch(toggleDarkMode());
  }

}
