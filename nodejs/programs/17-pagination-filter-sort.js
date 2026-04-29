export function listUsers(users, query) {
  const page = Number(query.page ?? 1);
  const pageSize = Math.min(Number(query.pageSize ?? 20), 100);
  const role = query.role;
  const sort = query.sort ?? 'createdAt:desc';

  const [sortKey, direction] = sort.split(':');

  const filtered = users.filter((user) => {
    return role ? user.role === role : true;
  });

  const sorted = [...filtered].sort((a, b) => {
    const result = String(a[sortKey]).localeCompare(String(b[sortKey]));
    return direction === 'asc' ? result : -result;
  });

  const start = (page - 1) * pageSize;

  return {
    data: sorted.slice(start, start + pageSize),
    page,
    pageSize,
    total: filtered.length,
  };
}

