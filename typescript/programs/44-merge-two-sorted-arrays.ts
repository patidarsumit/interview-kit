function mergeSortedArrays<T>(
  left: readonly T[],
  right: readonly T[],
  compare: (a: T, b: T) => number,
): T[] {
  const result: T[] = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (compare(left[i], right[j]) <= 0) {
      result.push(left[i]);
      i += 1;
    } else {
      result.push(right[j]);
      j += 1;
    }
  }

  return result.concat(left.slice(i), right.slice(j));
}

console.log(mergeSortedArrays([1, 3], [2, 4], (a, b) => a - b));

