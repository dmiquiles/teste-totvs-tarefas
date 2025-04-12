import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SearchState } from '../models/search.state';
import { ModalState } from '../models/modal.state';

export const selectModalState = createFeatureSelector<ModalState>('modal');

export const selectModalOpen = createSelector(
    selectModalState,
    (state) => state.isOpen
);

export const selectModalTask = createSelector(
    selectModalState,
    (state) => state.task
);

export const selectIsDeleteModalOpen = createSelector(
    selectModalState,
    (state) => state.isDeleteModalOpen
);

export const selectTaskIdForDeletion = createSelector(
    selectModalState,
    (state) => state.taskId
);