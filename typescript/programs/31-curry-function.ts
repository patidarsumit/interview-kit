function curry<A, B, C>(callback: (a: A, b: B) => C): (a: A) => (b: B) => C {
  return (a: A) => (b: B) => callback(a, b);
}

const addNumbers = curry((a: number, b: number) => a + b);
const addTen = addNumbers(10);

console.log(addTen(5));

