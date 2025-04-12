import { createAction, props } from '@ngrx/store';
import { Task } from '../../models/task.model';

export const closeModal = createAction('[Modal] Close Modal');
export const openModal = createAction('[Modal] Open Modal', props<{ task: Task | null }>());

export const openDeleteModal = createAction('[Modal] Open Delete Modal', props<{ taskId: string }>());
export const closeDeleteModal = createAction('[Modal] Close Delete Modal');