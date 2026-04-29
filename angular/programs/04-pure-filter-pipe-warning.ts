import {Pipe, PipeTransform} from '@angular/core';

type User = {
  id: string;
  name: string;
};

@Pipe({
  name: 'filterUsers',
  standalone: true,
})
export class FilterUsersPipe implements PipeTransform {
  transform(users: readonly User[], query: string): User[] {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return [...users];
    }

    return users.filter((user) =>
      user.name.toLowerCase().includes(normalizedQuery),
    );
  }
}

