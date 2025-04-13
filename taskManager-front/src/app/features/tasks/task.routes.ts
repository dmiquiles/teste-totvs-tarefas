import { Routes } from '@angular/router';

export const TASK_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/task-page/task-page.component').then(c => c.TaskPageComponent)
    }

];
