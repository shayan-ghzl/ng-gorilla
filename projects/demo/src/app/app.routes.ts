import { Routes } from '@angular/router';
import { OverviewComponent } from './pages/overview/overview.component';
import { ExampleComponent } from './pages/example/example.component';
import { SidenavComponent } from './pages/sidenav/sidenav.component';

export const routes: Routes = [
    {
        path: '',
        component: SidenavComponent,
        children: [
            { path: '', redirectTo: 'overview', pathMatch: 'full' },
            { path: 'overview', component: OverviewComponent, pathMatch: 'full' },
            { path: 'examples', component: ExampleComponent, pathMatch: 'full' }
        ]
    },
    {
        path: '404',
        loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
    },
    { path: '**', redirectTo: '/404' }
];

