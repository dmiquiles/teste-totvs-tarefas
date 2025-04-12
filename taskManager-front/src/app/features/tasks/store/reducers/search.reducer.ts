import { createReducer, on } from '@ngrx/store';
import { initialSearchState } from '../models/search.state';
import { setSearchTerm } from '../actions/search.action';

export const searchReducer = createReducer(
  initialSearchState,
  on(setSearchTerm, (state, { term }) => ({
    ...state,
    term,
  }))
);