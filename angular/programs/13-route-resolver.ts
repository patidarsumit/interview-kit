import {inject} from '@angular/core';
import {ResolveFn} from '@angular/router';
import {Observable, of} from 'rxjs';

type User = {
  id: string;
  name: string;
};

class UsersApiService {
  getUser(id: string): Observable<User> {
    return of({id, name: 'Sumit'});
  }
}

export const userResolver: ResolveFn<User> = (route) => {
  const usersApi = inject(UsersApiService);
  const id = route.paramMap.get('id');

  if (!id) {
    throw new Error('Missing user id');
  }

  return usersApi.getUser(id);
};

