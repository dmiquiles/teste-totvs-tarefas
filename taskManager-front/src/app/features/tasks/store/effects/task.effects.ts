import { Injectable } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { 
  loadTasks, 
  loadTasksSuccess, 
  loadTasksFailure, 
  createTask, 
  createTaskFailure, 
  createTaskSuccess, 
  updateTask, 
  updateTaskSuccess, 
  updateTaskFailure, 
  deleteTask, 
  deleteTaskFailure, 
  deleteTaskSuccess,
  toggleTaskComplete,
  toggleTaskCompleteFailure,
  toggleTaskCompleteSuccess,
} from '../actions/task.action';
import { Store } from '@ngrx/store';
import { showErrorModal } from '../../../../core/error/error/store/actions/error.action';

@Injectable()
export class TaskEffects {
  constructor(
    private actions$: Actions,
    private taskService: TaskService,
    private store: Store
  ) {}

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTasks),
      map((action) => {
        return action;
      }),
      mergeMap(() => {
        const result = this.taskService.getAll();
        if (!result || typeof result.pipe !== 'function') {
          throw new Error('getAll() não retornou um Observable!');
        }

        return result.pipe(
          map((pageable) => loadTasksSuccess({ tasks: pageable.content })),
          catchError((error) => {
            this.store.dispatch(showErrorModal({ errorMessage: error.message }));
            return of(loadTasksFailure({ error }));
          })
        );
      })
    )
  );

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createTask),
      mergeMap(({ task }) =>
        this.taskService.create(task).pipe(
          map((createdTask) => createTaskSuccess({ task: createdTask })),
          catchError((error) => of(createTaskFailure({ error })))
        )
      )
    )
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTask),
      mergeMap(({ task }) =>
        this.taskService.update(task).pipe(
          map((updatedTask) => updateTaskSuccess({ task: updatedTask })),
          catchError((error) => of(updateTaskFailure({ error })))
        )
      )
    )
  );

  refreshTasksAfterUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTaskSuccess),
      map(() => loadTasks())
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTask),
      mergeMap(({ taskId }) =>
        this.taskService.delete(Number(taskId)).pipe(
          map(() => deleteTaskSuccess({ taskId })),
          catchError((error) => of(deleteTaskFailure({ error })))
        )
      )
    )
  );

  refreshTasksAfterDelete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTaskSuccess),
      map(() => loadTasks())
    )
  );

  toggleTaskComplete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(toggleTaskComplete),
      mergeMap(({ task }) =>
        this.taskService.update({ ...task, completed: !task.completed }).pipe(
          map((updatedTask) => toggleTaskCompleteSuccess({ task: updatedTask })),
          catchError((error) => of(toggleTaskCompleteFailure({ error })))
        )
      )
    )
  );


}