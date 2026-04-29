import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

type User = {
  id: string;
  name: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private readonly userSubject = new BehaviorSubject<User | null>(null);

  readonly user$ = this.userSubject.asObservable();

  setUser(user: User | null) {
    this.userSubject.next(user);
  }

  getSnapshot() {
    return this.userSubject.value;
  }
}

