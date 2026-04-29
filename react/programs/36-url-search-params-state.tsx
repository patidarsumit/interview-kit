import {useSearchParams} from 'react-router-dom';

export function UsersFilterFromUrl() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';

  return (
    <input
      type="search"
      value={query}
      onChange={(event) => {
        setSearchParams({q: event.target.value});
      }}
      aria-label="Search users"
    />
  );
}

