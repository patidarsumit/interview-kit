import {useState} from 'react';

type Todo = {
  id: string;
  title: string;
};

async function deleteTodo(id: string) {
  if (!id) {
    throw new Error('Invalid todo');
  }
}

export function TodoListWithRollback({initialTodos}: {initialTodos: Todo[]}) {
  const [todos, setTodos] = useState(initialTodos);
  const [error, setError] = useState<string | null>(null);

  async function removeTodo(todo: Todo) {
    const previous = todos;
    setTodos((items) => items.filter((item) => item.id !== todo.id));

    try {
      await deleteTodo(todo.id);
    } catch {
      setTodos(previous);
      setError('Could not delete todo');
    }
  }

  return (
    <section>
      {error && <p role="alert">{error}</p>}
      {todos.map((todo) => (
        <button key={todo.id} type="button" onClick={() => removeTodo(todo)}>
          Delete {todo.title}
        </button>
      ))}
    </section>
  );
}

