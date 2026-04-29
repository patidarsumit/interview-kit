import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home-page.component').then((m) => m.HomePageComponent),
  },
  {
    path: 'users',
    loadChildren: () => import('./users.routes').then((m) => m.userRoutes),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./not-found.component').then((m) => m.NotFoundComponent),
  },
];

