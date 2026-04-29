type NestedArray<T> = Array<T | NestedArray<T>>;

function flatten<T>(items: NestedArray<T>): T[] {
  const result: T[] = [];

  for (const item of items) {
    if (Array.isArray(item)) {
      result.push(...flatten(item));
    } else {
      result.push(item);
    }
  }

  return result;
}

console.log(flatten([1, [2, [3]], 4]));

