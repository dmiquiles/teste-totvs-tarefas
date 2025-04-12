import { createReducer, on } from '@ngrx/store';
import { initialModalState } from '../models/modal.state';
import { closeModal, openModal } from '../actions/modal.action';

export const modalReducer = createReducer(
  initialModalState,
  on(openModal, (state, { task }) => ({
    ...state,
    isOpen: true,
    task,
  })),
  on(closeModal, (state) => ({
    ...state,
    isOpen: false,
    task: null,
  }))
);