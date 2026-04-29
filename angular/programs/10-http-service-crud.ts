import {HttpClient} from '@angular/common/http';
import {Injectable, inject} from '@angular/core';

type User = {
  id: string;
  name: string;
  email: string;
};

type CreateUserRequest = {
  name: string;
  email: string;
};

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private readonly http = inject(HttpClient);

  getUsers() {
    return this.http.get<User[]>('/api/users');
  }

  getUser(id: string) {
    return this.http.get<User>(`/api/users/${id}`);
  }

  createUser(request: CreateUserRequest) {
    return this.http.post<User>('/api/users', request);
  }

  deleteUser(id: string) {
    return this.http.delete<void>(`/api/users/${id}`);
  }
}

