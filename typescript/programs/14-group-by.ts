function groupBy<T, K extends PropertyKey>(
  items: readonly T[],
  getKey: (item: T) => K,
): Record<K, T[]> {
  return items.reduce(
    (groups, item) => {
      const key = getKey(item);
      groups[key] ??= [];
      groups[key].push(item);
      return groups;
    },
    {} as Record<K, T[]>,
  );
}

const employees = [
  { id: 1, department: 'engineering' },
  { id: 2, department: 'sales' },
  { id: 3, department: 'engineering' },
] as const;

console.log(groupBy(employees, (employee) => employee.department));

