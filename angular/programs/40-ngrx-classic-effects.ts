import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, of, switchMap} from 'rxjs';
import {UsersApiService} from './10-http-service-crud';
import {UsersActions} from './37-ngrx-classic-actions';

@Injectable()
export class UsersEffects {
  private readonly actions$ = inject(Actions);
  private readonly usersApi = inject(UsersApiService);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      switchMap(() =>
        this.usersApi.getUsers().pipe(
          map((users) => UsersActions.loadUsersSuccess({users})),
          catchError(() =>
            of(UsersActions.loadUsersFailure({error: 'Could not load users'})),
          ),
        ),
      ),
    ),
  );
}

