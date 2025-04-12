import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SearchState } from '../models/search.state';

export const selectSearchState = createFeatureSelector<SearchState>('search');

export const selectSearchTerm = createSelector(
  selectSearchState,
  (state) => state.term
);