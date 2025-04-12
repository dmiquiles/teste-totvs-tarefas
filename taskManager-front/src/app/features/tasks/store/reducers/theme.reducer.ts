import { createReducer, on } from '@ngrx/store';
import { initialThemeState } from '../models/theme.state';
import { setDarkMode, toggleDarkMode } from '../actions/theme.action';

export const themeReducer = createReducer(
  initialThemeState,
  on(toggleDarkMode, (state) => ({
    ...state,
    darkMode: !state.darkMode,
  })),
  on(setDarkMode, (state, { darkMode }) => ({
    ...state,
    darkMode,
  }))
);