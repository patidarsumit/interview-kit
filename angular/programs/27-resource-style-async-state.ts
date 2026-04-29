import {Component, resource, signal} from '@angular/core';

type User = {
  id: string;
  name: string;
};

@Component({
  selector: 'app-user-detail',
  standalone: true,
  template: `
    @if (user.isLoading()) {
      <p>Loading...</p>
    } @else if (user.error()) {
      <p>Could not load user.</p>
    } @else if (user.value(); as loadedUser) {
      <h1>{{ loadedUser.name }}</h1>
    }
  `,
})
export class UserDetailComponent {
  userId = signal('u1');

  user = resource<User, {id: string}>({
    params: () => ({id: this.userId()}),
    loader: async ({params}) => {
      const response = await fetch(`/api/users/${params.id}`);

      if (!response.ok) {
        throw new Error('Failed to load user');
      }

      return response.json();
    },
  });
}

