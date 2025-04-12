import { createAction, props } from '@ngrx/store';
import { Task } from '../../models/task.model';

export const loadTasks = createAction('[Task] Load Tasks');
export const loadTasksSuccess = createAction(
  '[Task] Load Tasks Success',
  props<{ tasks: Task[] }>()
);
export const loadTasksFailure = createAction(
  '[Task] Load Tasks Failure',
  props<{ error: any }>()
);

export const createTask = createAction(
  '[Task] Create Task',
  props<{ task: Task }>()
);
export const createTaskSuccess = createAction(
  '[Task] Create Task Success',
  props<{ task: Task }>()
);
export const createTaskFailure = createAction(
  '[Task] Create Task Failure',
  props<{ error: any }>()
);