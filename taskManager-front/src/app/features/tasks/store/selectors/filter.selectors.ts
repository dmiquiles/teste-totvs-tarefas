import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FilterState } from '../models/filter.state';

export const selectFilterState = createFeatureSelector<FilterState>('filter');

export const selectCurrentFilter = createSelector(
  selectFilterState,
  (state) => state.filter
);