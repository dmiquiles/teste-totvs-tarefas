import { createReducer, on } from '@ngrx/store';
import { showErrorModal, closeErrorModal } from '../actions/error.action';
import { initialErrorState } from '../models/error.state';

export const errorReducer = createReducer(
  initialErrorState,
  on(showErrorModal, (state, { errorMessage }) => ({
    ...state,
    showModal: true,
    errorMessage,
  })),
  on(closeErrorModal, (state) => ({
    ...state,
    showModal: false,
    errorMessage: null,
  }))
);