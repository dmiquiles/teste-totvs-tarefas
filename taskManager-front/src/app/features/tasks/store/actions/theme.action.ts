import { createAction, props } from '@ngrx/store';

export const toggleDarkMode = createAction('[Theme] Toggle Dark Mode');
export const setDarkMode = createAction(
  '[Theme] Set Dark Mode',
  props<{ darkMode: boolean }>()
);