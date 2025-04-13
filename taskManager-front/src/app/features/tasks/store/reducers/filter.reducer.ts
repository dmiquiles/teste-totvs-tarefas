import { createReducer, on } from '@ngrx/store';
import { setFilter } from '../actions/filter.action';
import { initialFilterState } from '../models/filter.state';

export const filterReducer = createReducer(
  initialFilterState,
  on(setFilter, (state, { filter }) => ({
    ...state,
    filter,
  }))
);