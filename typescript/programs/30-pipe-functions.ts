function pipe<A, B, C>(
  value: A,
  first: (value: A) => B,
  second: (value: B) => C,
): C {
  return second(first(value));
}

const length = pipe(
  ' hello ',
  (value) => value.trim(),
  (value) => value.length,
);

console.log(length);

