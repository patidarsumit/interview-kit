import {useEffect, useState} from 'react';
import {useDebouncedValue} from './12-custom-hook-debounce';

type User = {
  id: string;
  name: string;
};

type SearchState =
  | {status: 'idle'; users: User[]}
  | {status: 'loading'; users: User[]}
  | {status: 'success'; users: User[]}
  | {status: 'empty'; users: User[]}
  | {status: 'error'; users: User[]; message: string};

export function DebouncedUserSearch() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query.trim(), 300);
  const [state, setState] = useState<SearchState>({status: 'idle', users: []});

  useEffect(() => {
    if (!debouncedQuery) {
      setState({status: 'idle', users: []});
      return;
    }

    const controller = new AbortController();
    setState({status: 'loading', users: []});

    fetch(`/api/users?q=${encodeURIComponent(debouncedQuery)}`, {
      signal: controller.signal,
    })
      .then((response) => response.json() as Promise<User[]>)
      .then((users) =>
        setState(users.length ? {status: 'success', users} : {status: 'empty', users: []}),
      )
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setState({status: 'error', users: [], message: 'Search failed'});
        }
      });

    return () => controller.abort();
  }, [debouncedQuery]);

  return (
    <section>
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        aria-label="Search users"
      />
      <p>Status: {state.status}</p>
    </section>
  );
}

