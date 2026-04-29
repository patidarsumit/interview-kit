function uniqueBy<T, K extends PropertyKey>(
  items: readonly T[],
  getKey: (item: T) => K,
): T[] {
  const seen = new Set<K>();
  const result: T[] = [];

  for (const item of items) {
    const key = getKey(item);

    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  }

  return result;
}

const employees = [
  { id: 1, name: 'Amit' },
  { id: 1, name: 'Amit Duplicate' },
  { id: 2, name: 'Sumit' },
];

console.log(uniqueBy(employees, (employee) => employee.id));

