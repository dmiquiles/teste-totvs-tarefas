import { Routes } from '@angular/router';

export const TASK_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/task-page/task-page.component').then(c => c.TaskPageComponent)
    },
    {
        path: 'new',
        loadComponent: () => import('./pages/create-task-page/create-task-page.component').then(c => c.CreateTaskPageComponent)
    },

];
