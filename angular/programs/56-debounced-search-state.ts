import {FormControl} from '@angular/forms';
import {
  Observable,
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  startWith,
  switchMap,
} from 'rxjs';

type User = {
  id: string;
  name: string;
};

type SearchState =
  | {status: 'idle'; users: User[]}
  | {status: 'loading'; users: User[]}
  | {status: 'success'; users: User[]}
  | {status: 'empty'; users: User[]}
  | {status: 'error'; users: User[]; message: string};

class UsersApi {
  search(query: string): Observable<User[]> {
    return of(query ? [{id: 'u1', name: 'Sumit'}] : []);
  }
}

const searchControl = new FormControl('', {nonNullable: true});
const api = new UsersApi();

export const searchState$ = searchControl.valueChanges.pipe(
  startWith(searchControl.value),
  debounceTime(300),
  map((query) => query.trim()),
  distinctUntilChanged(),
  switchMap((query): Observable<SearchState> => {
    if (!query) {
      return of({status: 'idle', users: []});
    }

    return api.search(query).pipe(
      map((users) =>
        users.length > 0
          ? ({status: 'success', users} as SearchState)
          : ({status: 'empty', users: []} as SearchState),
      ),
      startWith({status: 'loading', users: []} as SearchState),
      catchError(() =>
        of({
          status: 'error',
          users: [],
          message: 'Could not search users',
        } as SearchState),
      ),
    );
  }),
);

