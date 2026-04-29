function binarySearch<T>(
  items: readonly T[],
  target: T,
  compare: (a: T, b: T) => number,
): number {
  let left = 0;
  let right = items.length - 1;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    const comparison = compare(items[middle], target);

    if (comparison === 0) {
      return middle;
    }

    if (comparison < 0) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return -1;
}

console.log(binarySearch([1, 3, 5, 7], 5, (a, b) => a - b));

