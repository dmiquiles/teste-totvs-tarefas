import { ApplicationConfig, ErrorHandler, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { themeReducer } from './features/tasks/store/reducers/theme.reducer';
import { searchReducer } from './features/tasks/store/reducers/search.reducer';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { taskReducer } from './features/tasks/store/reducers/task.reducer';
import { provideEffects } from '@ngrx/effects';
import { TaskEffects } from './features/tasks/store/effects/task.effects';
import { modalReducer } from './features/tasks/store/reducers/modal.reducer';
import { filterReducer } from './features/tasks/store/reducers/filter.reducer';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { AppErrorHandler } from './core/error/app-error-handler';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { errorReducer } from './core/error/error/store/reducers/error.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptorsFromDi(),
    ),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: AppErrorHandler},
    provideStore({
      theme: themeReducer,
      search: searchReducer,
      tasks: taskReducer,
      modal: modalReducer,
      filter: filterReducer,
      error: errorReducer
    }),
    provideEffects([TaskEffects])
  ]
};