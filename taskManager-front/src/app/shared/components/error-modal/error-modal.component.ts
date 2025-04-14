import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { closeErrorModal } from '../../../core/error/error/store/actions/error.action';
import { ErrorState } from '../../../core/error/error/store/models/error.state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-modal',
  imports: [
    CommonModule
  ],
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss'],
})
export class ErrorModalComponent {
  showModal$: Observable<boolean>;
  errorMessage$: Observable<string | null>;

  constructor(private store: Store<{ error: ErrorState }>) {
    this.showModal$ = this.store.select((state) => state.error.showModal);
    this.errorMessage$ = this.store.select((state) => state.error.errorMessage);
  }

  close(): void {
    this.store.dispatch(closeErrorModal());
  }
}