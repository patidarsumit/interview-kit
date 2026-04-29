import {HttpClient} from '@angular/common/http';
import {Injectable, inject, makeStateKey, TransferState} from '@angular/core';
import {of} from 'rxjs';
import {tap} from 'rxjs/operators';

type User = {
  id: string;
  name: string;
};

const USERS_KEY = makeStateKey<User[]>('users');

@Injectable({providedIn: 'root'})
export class UsersTransferStateService {
  private readonly http = inject(HttpClient);
  private readonly transferState = inject(TransferState);

  getUsers() {
    const cached = this.transferState.get(USERS_KEY, null);

    if (cached) {
      this.transferState.remove(USERS_KEY);
      return of(cached);
    }

    return this.http.get<User[]>('/api/users').pipe(
      tap((users) => {
        this.transferState.set(USERS_KEY, users);
      }),
    );
  }
}
