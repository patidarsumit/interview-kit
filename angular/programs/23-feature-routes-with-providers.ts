import {Routes} from '@angular/router';

class UsersFeatureState {}

export const userRoutes: Routes = [
  {
    path: '',
    providers: [UsersFeatureState],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./users-list.component').then((m) => m.UsersListComponent),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./user-detail.component').then((m) => m.UserDetailComponent),
      },
    ],
  },
];

