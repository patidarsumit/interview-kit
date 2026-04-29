import {Injectable} from '@angular/core';
import {BehaviorSubject, map} from 'rxjs';

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class TodoStateService {
  private readonly todosSubject = new BehaviorSubject<Todo[]>([]);

  readonly todos$ = this.todosSubject.asObservable();
  readonly completedCount$ = this.todos$.pipe(
    map((todos) => todos.filter((todo) => todo.completed).length),
  );

  add(todo: Todo) {
    this.todosSubject.next([...this.todosSubject.value, todo]);
  }

  toggle(id: string) {
    this.todosSubject.next(
      this.todosSubject.value.map((todo) =>
        todo.id === id ? {...todo, completed: !todo.completed} : todo,
      ),
    );
  }
}

