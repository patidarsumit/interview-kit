function identity<T>(value: T): T {
  return value;
}

const numberValue = identity(10);
const stringValue = identity('hello');

console.log(numberValue, stringValue);

