function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Example usage:
function slowSquare(n) {
  console.log('Calculating...');
  return n * n;
}

const memoizedSquare = memoize(slowSquare);

console.log(memoizedSquare(5)); // Calculating... 25
console.log(memoizedSquare(5)); // 25 (cached result)
console.log(memoizedSquare(6)); // Calculating... 36
console.log(memoizedSquare(6)); // 36 (cached result)
