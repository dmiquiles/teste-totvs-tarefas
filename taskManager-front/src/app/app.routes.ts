import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

export const routes: Routes = [
  
  {
    path: '',
    loadChildren: () => import('./features/tasks/task.routes').then((r) => r.TASK_ROUTES),
    canActivate: [AuthGuard],
  },
  {
    path: 'error',
    loadChildren: () => import('./core/error/error.routes').then((r) => r.ERRO_ROUTES),
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];
