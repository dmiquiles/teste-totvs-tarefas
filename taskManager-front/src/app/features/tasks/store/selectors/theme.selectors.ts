import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ThemeState } from '../models/theme.state';

export const selectThemeState = createFeatureSelector<ThemeState>('theme');

export const selectDarkMode = createSelector(
  selectThemeState,
  (state) => state.darkMode
);