import {Injectable, computed, signal} from '@angular/core';

type Filter = 'all' | 'active' | 'completed';

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

@Injectable()
export class TodoSignalState {
  private readonly _todos = signal<Todo[]>([]);
  private readonly _filter = signal<Filter>('all');

  readonly todos = this._todos.asReadonly();
  readonly filter = this._filter.asReadonly();

  readonly visibleTodos = computed(() => {
    const filter = this._filter();

    if (filter === 'active') {
      return this._todos().filter((todo) => !todo.completed);
    }

    if (filter === 'completed') {
      return this._todos().filter((todo) => todo.completed);
    }

    return this._todos();
  });

  add(todo: Todo) {
    this._todos.update((todos) => [...todos, todo]);
  }

  setFilter(filter: Filter) {
    this._filter.set(filter);
  }
}

