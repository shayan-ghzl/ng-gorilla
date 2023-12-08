import { Router, Routes } from '@angular/router';
import { OverviewComponent } from './pages/overview/overview.component';
import { ExampleComponent } from './pages/example/example.component';
import { SidenavComponent } from './pages/sidenav/sidenav.component';
import { ViewerComponent } from './pages/viewer/viewer.component';
import { CategoryComponent } from './pages/category/category.component';
import { CanActivateFn } from '@angular/router';
import { SECTIONS } from './shared/services/documentation-items/documentation-items';
import { inject } from '@angular/core';

export const canActivateDocs: CanActivateFn = (route) => {
    const router = inject(Router);
    
    if (Object.keys(SECTIONS).some((s => s.toLowerCase() === route.url[0].path.toLowerCase()))) {
        return true;
    }

    router.navigateByUrl('/');
    return false;
};

export const routes: Routes = [
    { path: 'categories', redirectTo: '/components/categories' },
    { path: 'components', pathMatch: 'full', redirectTo: '/components/categories' },
    {
        path: '404',
        loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
    },
    {
        path: ':section',
        component: SidenavComponent,
        canActivate: [canActivateDocs],
        children: [
            { path: 'category', redirectTo: 'categories', pathMatch: 'full' },
            {
                path: 'categories',
                children: [
                    { path: '', component: CategoryComponent },
                ],
            },
            {
                path: ':id',
                component: ViewerComponent,
                children: [
                    { path: '', redirectTo: 'overview', pathMatch: 'full' },
                    { path: 'overview', component: OverviewComponent, pathMatch: 'full' },
                    { path: 'examples', component: ExampleComponent, pathMatch: 'full' }
                ],
            },
            { path: '**', redirectTo: '/404' }
        ]
    },
    { path: '**', redirectTo: '404' }
];

