import {useMemo, useState} from 'react';

type User = {
  id: string;
  name: string;
  role: string;
};

export function UsersTable({users}: {users: User[]}) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [sortKey, setSortKey] = useState<keyof User>('name');

  const pageSize = 10;

  const visibleUsers = useMemo(() => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase()),
    );

    const sorted = [...filtered].sort((a, b) =>
      String(a[sortKey]).localeCompare(String(b[sortKey])),
    );

    return sorted.slice(page * pageSize, page * pageSize + pageSize);
  }, [page, query, sortKey, users]);

  return (
    <section>
      <input
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setPage(0);
        }}
        aria-label="Filter users"
      />
      <button type="button" onClick={() => setSortKey('name')}>
        Sort by name
      </button>
      <button type="button" onClick={() => setSortKey('role')}>
        Sort by role
      </button>
      <ul>
        {visibleUsers.map((user) => (
          <li key={user.id}>
            {user.name} - {user.role}
          </li>
        ))}
      </ul>
    </section>
  );
}

