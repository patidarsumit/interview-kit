import {FormControl} from '@angular/forms';
import {Observable, debounceTime, distinctUntilChanged, of, switchMap} from 'rxjs';

type User = {
  id: string;
  name: string;
};

class UsersApiService {
  search(query: string): Observable<User[]> {
    return of([{id: 'u1', name: query}]);
  }
}

const searchControl = new FormControl('', {nonNullable: true});
const api = new UsersApiService();

const results$ = searchControl.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap((query) => api.search(query)),
);

results$.subscribe((results) => console.log(results));

