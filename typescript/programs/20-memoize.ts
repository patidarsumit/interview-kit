function memoize<TArgs extends unknown[], TResult>(
  callback: (...args: TArgs) => TResult,
  getKey: (...args: TArgs) => string = (...args) => JSON.stringify(args),
): (...args: TArgs) => TResult {
  const cache = new Map<string, TResult>();

  return (...args: TArgs) => {
    const key = getKey(...args);

    if (cache.has(key)) {
      return cache.get(key) as TResult;
    }

    const result = callback(...args);
    cache.set(key, result);
    return result;
  };
}

const add = memoize((a: number, b: number) => a + b);

console.log(add(1, 2));
console.log(add(1, 2));

