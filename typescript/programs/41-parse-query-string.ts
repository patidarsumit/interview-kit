function parseQueryString(query: string): Record<string, string> {
  const params = new URLSearchParams(query.startsWith('?') ? query.slice(1) : query);
  const result: Record<string, string> = {};

  params.forEach((value, key) => {
    result[key] = value;
  });

  return result;
}

console.log(parseQueryString('?page=1&sort=asc'));

