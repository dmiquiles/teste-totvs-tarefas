import { createAction, props } from '@ngrx/store';

export const showErrorModal = createAction(
  '[Error] Show Error Modal',
  props<{ errorMessage: string }>()
);

export const closeErrorModal = createAction('[Error] Close Error Modal');