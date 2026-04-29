function compose<A, B, C>(
  first: (value: A) => B,
  second: (value: B) => C,
): (value: A) => C {
  return (value: A) => second(first(value));
}

const trimAndLength = compose(
  (value: string) => value.trim(),
  (value: string) => value.length,
);

console.log(trimAndLength(' hello '));

