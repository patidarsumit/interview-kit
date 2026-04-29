import {Subject, startWith, switchMap} from 'rxjs';

class UsersApiService {
  getUsers() {
    return ['Amit', 'Sumit'];
  }
}

const refresh$ = new Subject<void>();
const api = new UsersApiService();

const users$ = refresh$.pipe(
  startWith(undefined),
  switchMap(() => [api.getUsers()]),
);

users$.subscribe((users) => console.log(users));

refresh$.next();

