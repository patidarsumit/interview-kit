import {useEffect, useState} from 'react';

type User = {
  id: string;
  name: string;
};

export function UsersWithAbort() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/users', {signal: controller.signal})
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not load users');
        }

        return response.json() as Promise<User[]>;
      })
      .then(setUsers)
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') {
          setError('Could not load users');
        }
      });

    return () => controller.abort();
  }, []);

  if (error) {
    return <p role="alert">{error}</p>;
  }

  return <p>Users loaded: {users.length}</p>;
}

