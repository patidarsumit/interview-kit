function deepClone<T>(value: T): T {
  if (value === null || typeof value !== 'object') {
    return value;
  }

  if (value instanceof Date) {
    return new Date(value.getTime()) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => deepClone(item)) as T;
  }

  const result: Record<PropertyKey, unknown> = {};

  for (const key of Reflect.ownKeys(value)) {
    result[key] = deepClone((value as Record<PropertyKey, unknown>)[key]);
  }

  return result as T;
}

const original = {
  id: 'u1',
  profile: {
    name: 'Sumit',
  },
  createdAt: new Date('2026-01-01'),
};

const cloned = deepClone(original);

console.log(cloned);
console.log(cloned.profile !== original.profile);

