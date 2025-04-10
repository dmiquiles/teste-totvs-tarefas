import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { taskReducer } from './store/reducers/task.reducer';
import { TaskEffects } from './store/effects/task.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('tasks', taskReducer),  // Estado "tasks"
    EffectsModule.forFeature([TaskEffects]),      // Effects
  ],
})
export class TaskModule {}