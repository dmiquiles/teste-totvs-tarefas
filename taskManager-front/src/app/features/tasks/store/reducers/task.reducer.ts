import { createReducer, on } from '@ngrx/store';
import { initialTaskState } from '../models/task.state';
import { createTaskSuccess, loadTasksSuccess, updateTaskSuccess } from '../actions/task.action';

export const taskReducer = createReducer(
  initialTaskState,
  on(loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks,
  })),
  on(createTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
  })),
  on(updateTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map((t) => (t.id === task.id ? task : t)), // Atualiza a tarefa no estado
  }))
);