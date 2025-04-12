import { createAction, props } from '@ngrx/store';
import { Task } from '../../models/task.model';

export const closeModal = createAction('[Modal] Close Modal');
export const openModal = createAction('[Modal] Open Modal', props<{ task: Task | null }>());