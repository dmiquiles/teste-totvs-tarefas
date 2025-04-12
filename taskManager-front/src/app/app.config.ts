import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { themeReducer } from './features/tasks/store/reducers/theme.reducer';
import { searchReducer } from './features/tasks/store/reducers/search.reducer';
import { provideHttpClient } from '@angular/common/http';
import { taskReducer } from './features/tasks/store/reducers/task.reducer';
import { provideEffects } from '@ngrx/effects';
import { TaskEffects } from './features/tasks/store/effects/task.effects';
import { modalReducer } from './features/tasks/store/reducers/modal.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      theme: themeReducer,
      search: searchReducer,
      tasks: taskReducer,
      modal: modalReducer
    }),
    provideEffects([TaskEffects])
  ]
};
