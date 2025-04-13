import { createReducer, on } from '@ngrx/store';
import { initialTaskState } from '../models/task.state';
import { 
  createTaskSuccess, 
  deleteTaskSuccess, 
  loadTasksSuccess, 
  toggleTaskCompleteSuccess, 
  updateTaskSuccess 
} from '../actions/task.action';

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
    tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
  })),
  on(deleteTaskSuccess, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.filter((task) => task.id !== Number(taskId)),
  })),
  on(toggleTaskCompleteSuccess, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
  }))
);