import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./features/tasks/task.routes').then(r => r.TASK_ROUTES)
    }
];
