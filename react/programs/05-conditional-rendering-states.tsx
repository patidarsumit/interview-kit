type AsyncState<T> =
  | {status: 'loading'}
  | {status: 'error'; message: string}
  | {status: 'success'; data: T[]};

export function UsersPanel({state}: {state: AsyncState<string>}) {
  if (state.status === 'loading') {
    return <p>Loading users...</p>;
  }

  if (state.status === 'error') {
    return <p role="alert">{state.message}</p>;
  }

  if (state.data.length === 0) {
    return <p>No users found.</p>;
  }

  return (
    <ul>
      {state.data.map((name) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  );
}

