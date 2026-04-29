import {useQuery} from '@tanstack/react-query';

type User = {
  id: string;
  name: string;
};

async function fetchUsers() {
  const response = await fetch('/api/users');

  if (!response.ok) {
    throw new Error('Could not load users');
  }

  return response.json() as Promise<User[]>;
}

export function UsersQuery() {
  const query = useQuery({queryKey: ['users'], queryFn: fetchUsers});

  if (query.isLoading) {
    return <p>Loading...</p>;
  }

  if (query.isError) {
    return <p role="alert">Could not load users</p>;
  }

  return <p>Users: {query.data.length}</p>;
}

