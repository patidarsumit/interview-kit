# JavaScript Concepts Cheat Sheet

Use this for interview revision. The goal is to remember the concept, say it clearly, and write a small example fast.

## Variables: var, let, const

`var` is function scoped.

`let` and `const` are block scoped.

Use `const` by default. Use `let` when the value changes.

```js
var a = 10;
let b = 20;
const c = 30;
```

```js
if (true) {
  let x = 1;
}

// console.log(x); // ReferenceError
```

## Hoisting

Hoisting means JavaScript moves declarations to the top of their scope during execution.

```js
console.log(a); // undefined
var a = 10;
```

With `let` and `const`, the variable is hoisted but cannot be used before declaration.

```js
// console.log(b); // ReferenceError
let b = 20;
```

Interview line:

> `var` is hoisted and initialized with undefined. `let` and `const` are hoisted but stay in the temporal dead zone until declaration.

## Data Types

Primitive types:

- `string`
- `number`
- `boolean`
- `undefined`
- `null`
- `bigint`
- `symbol`

Reference types:

- `object`
- `array`
- `function`

```js
console.log(typeof 'hello'); // string
console.log(typeof 10); // number
console.log(typeof null); // object, historical JS bug
console.log(typeof []); // object
console.log(Array.isArray([])); // true
```

## Primitive vs Reference

Primitive values are copied by value.

Objects and arrays are copied by reference.

```js
let a = 10;
let b = a;
b = 20;
console.log(a); // 10
```

```js
const obj1 = { name: 'Sumit' };
const obj2 = obj1;
obj2.name = 'Amit';
console.log(obj1.name); // Amit
```

## Equality: == vs ===

`==` checks value after type conversion.

`===` checks value and type.

Use `===` in interviews and real code.

```js
console.log(5 == '5'); // true
console.log(5 === '5'); // false
```

## Truthy and Falsy

Falsy values:

- `false`
- `0`
- `''`
- `null`
- `undefined`
- `NaN`

Everything else is truthy.

```js
if ('hello') {
  console.log('truthy');
}

if (!0) {
  console.log('0 is falsy');
}
```

## Functions

Function declaration:

```js
function add(a, b) {
  return a + b;
}
```

Function expression:

```js
const add = function (a, b) {
  return a + b;
};
```

Arrow function:

```js
const add = (a, b) => a + b;
```

## this Keyword

`this` depends on how a function is called.

```js
const user = {
  name: 'Sumit',
  greet() {
    console.log(this.name);
  },
};

user.greet(); // Sumit
```

Arrow functions do not have their own `this`.

```js
const user = {
  name: 'Sumit',
  greet: () => {
    console.log(this.name);
  },
};

user.greet(); // undefined in many environments
```

Interview line:

> Normal functions get `this` from the call site. Arrow functions capture `this` from the surrounding scope.

## call, apply, bind

Use these to control `this`.

```js
function greet(city) {
  console.log(`${this.name} from ${city}`);
}

const user = { name: 'Sumit' };

greet.call(user, 'Pune'); // Sumit from Pune
greet.apply(user, ['Mumbai']); // Sumit from Mumbai

const boundGreet = greet.bind(user);
boundGreet('Delhi'); // Sumit from Delhi
```

## Closure

A closure is when an inner function remembers variables from its outer function even after the outer function has finished.

```js
function outer() {
  let count = 0;

  return function inner() {
    count++;
    return count;
  };
}

const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2
```

Used in:

- private variables
- memoization
- debounce
- throttle

## Scope

Scope decides where a variable is accessible.

```js
function test() {
  const name = 'Sumit';
  console.log(name);
}

// console.log(name); // ReferenceError
```

Types:

- global scope
- function scope
- block scope

## Lexical Scope

Lexical scope means a function can access variables from where it was written.

```js
function outer() {
  const message = 'hello';

  function inner() {
    console.log(message);
  }

  inner();
}

outer(); // hello
```

## Event Loop

JavaScript is single-threaded, but async work is handled using the event loop.

Order:

1. Call stack
2. Microtask queue
3. Callback/macrotask queue

```js
console.log('A');

setTimeout(() => console.log('B'), 0);

Promise.resolve().then(() => console.log('C'));

console.log('D');

// A
// D
// C
// B
```

Interview line:

> Promises run in the microtask queue, which is processed before setTimeout callbacks.

## Promise

A Promise represents a future value.

States:

- pending
- fulfilled
- rejected

```js
const promise = new Promise((resolve, reject) => {
  resolve('Done');
});

promise.then(console.log).catch(console.error);
```

## async and await

`async/await` is cleaner syntax for promises.

```js
async function getData() {
  try {
    const result = await Promise.resolve('Data');
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

getData();
```

## Promise.all

Runs promises in parallel. Resolves when all finish. Rejects if any one rejects.

```js
Promise.all([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3),
]).then(console.log); // [1, 2, 3]
```

## Promise.allSettled

Waits for all promises, whether they pass or fail.

```js
Promise.allSettled([
  Promise.resolve('ok'),
  Promise.reject('fail'),
]).then(console.log);
```

## Promise.race

Returns the first promise that settles.

```js
Promise.race([
  new Promise(resolve => setTimeout(() => resolve('slow'), 1000)),
  new Promise(resolve => setTimeout(() => resolve('fast'), 100)),
]).then(console.log); // fast
```

## Array Basics

```js
const nums = [1, 2, 3];

nums.push(4); // add end
nums.pop(); // remove end
nums.unshift(0); // add start
nums.shift(); // remove start
```

## map

Returns a new array.

```js
const nums = [1, 2, 3];
const doubled = nums.map(num => num * 2);
console.log(doubled); // [2, 4, 6]
```

## filter

Returns items that match a condition.

```js
const nums = [1, 2, 3, 4];
const even = nums.filter(num => num % 2 === 0);
console.log(even); // [2, 4]
```

## reduce

Reduces array to one value.

```js
const nums = [1, 2, 3, 4];
const sum = nums.reduce((acc, num) => acc + num, 0);
console.log(sum); // 10
```

## forEach

Loops over array but does not return a new array.

```js
[1, 2, 3].forEach(num => console.log(num));
```

## find

Returns first matching item.

```js
const users = [{ id: 1 }, { id: 2 }];
const user = users.find(item => item.id === 2);
console.log(user); // { id: 2 }
```

## Array slice

`slice` returns a copy of part of an array.

It does not change the original array.

```js
const nums = [10, 20, 30, 40, 50];

console.log(nums.slice(1, 4)); // [20, 30, 40]
console.log(nums); // [10, 20, 30, 40, 50]
```

Syntax:

```js
array.slice(startIndex, endIndex);
```

Important:

- `startIndex` is included
- `endIndex` is not included
- original array is not changed

```js
console.log(nums.slice(2)); // [30, 40, 50]
console.log(nums.slice(-2)); // [40, 50]
```

## Array splice

`splice` adds, removes, or replaces items in the original array.

It changes the original array.

```js
const nums = [10, 20, 30, 40, 50];

const removed = nums.splice(1, 2);

console.log(removed); // [20, 30]
console.log(nums); // [10, 40, 50]
```

Syntax:

```js
array.splice(startIndex, deleteCount, item1, item2);
```

Remove items:

```js
const arr = [1, 2, 3, 4];
arr.splice(1, 2);
console.log(arr); // [1, 4]
```

Add items:

```js
const arr = [1, 4];
arr.splice(1, 0, 2, 3);
console.log(arr); // [1, 2, 3, 4]
```

Replace items:

```js
const arr = [1, 2, 99, 4];
arr.splice(2, 1, 3);
console.log(arr); // [1, 2, 3, 4]
```

Interview line:

> `slice` copies part of an array and does not mutate. `splice` changes the original array by adding, removing, or replacing items.

## some and every

`some` returns true if at least one item matches.

`every` returns true if all items match.

```js
const nums = [2, 4, 6];

console.log(nums.some(num => num > 5)); // true
console.log(nums.every(num => num % 2 === 0)); // true
```

## Set

Stores unique values.

```js
const set = new Set([1, 2, 2, 3]);
console.log([...set]); // [1, 2, 3]
```

Common use:

```js
const unique = [...new Set([1, 1, 2, 3])];
console.log(unique); // [1, 2, 3]
```

## Map

Stores key-value pairs.

```js
const map = new Map();
map.set('name', 'Sumit');
console.log(map.get('name')); // Sumit
console.log(map.has('name')); // true
map.delete('name');
```

Use `Map` when keys can be any type or when doing interview frequency/count problems.

## Object

```js
const user = {
  name: 'Sumit',
  age: 30,
};

console.log(user.name);
console.log(user['age']);
```

Useful methods:

```js
console.log(Object.keys(user)); // ['name', 'age']
console.log(Object.values(user)); // ['Sumit', 30]
console.log(Object.entries(user)); // [['name', 'Sumit'], ['age', 30]]
```

## Spread Operator

Used for copying or merging.

```js
const nums = [1, 2, 3];
const copy = [...nums];

const user = { name: 'Sumit' };
const updated = { ...user, city: 'Pune' };
```

This is shallow copy, not deep copy.

## Rest Parameter

Collects multiple arguments into an array.

```js
function sum(...nums) {
  return nums.reduce((acc, num) => acc + num, 0);
}

console.log(sum(1, 2, 3)); // 6
```

## Destructuring

```js
const arr = [1, 2];
const [a, b] = arr;

const user = { name: 'Sumit', city: 'Pune' };
const { name, city } = user;
```

## Optional Chaining

Prevents errors when a property may not exist.

```js
const user = {};
console.log(user.address?.city); // undefined
```

## Nullish Coalescing

Returns right side only when left side is `null` or `undefined`.

```js
const count = 0;
console.log(count ?? 10); // 0
```

Different from `||`:

```js
console.log(0 || 10); // 10
console.log(0 ?? 10); // 0
```

## Debounce

Runs a function only after calls stop for a given delay.

```js
function debounce(fn, delay) {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), delay);
  };
}
```

Use case: search input.

## Throttle

Runs a function at most once in a given time window.

```js
function throttle(fn, limit) {
  let canRun = true;

  return function (...args) {
    if (!canRun) return;

    fn.apply(this, args);
    canRun = false;

    setTimeout(() => {
      canRun = true;
    }, limit);
  };
}
```

Use case: scroll event, resize event.

## Shallow Copy vs Deep Copy

Shallow copy copies only the first level.

```js
const obj = { a: 1, nested: { b: 2 } };
const copy = { ...obj };

copy.nested.b = 99;
console.log(obj.nested.b); // 99
```

Deep copy copies nested objects too.

```js
const deepCopy = structuredClone(obj);
```

For interview, know how to write a recursive deep clone.

## String Methods

Strings are immutable. Methods return a new string.

```js
const str = 'JavaScript';
```

## length

```js
console.log(str.length); // 10
```

## charAt

Gets character at index.

```js
console.log(str.charAt(0)); // J
```

You can also use bracket access:

```js
console.log(str[0]); // J
```

## at

Supports negative index.

```js
console.log(str.at(0)); // J
console.log(str.at(-1)); // t
```

## indexOf

Returns first index or `-1`.

```js
console.log(str.indexOf('Script')); // 4
console.log(str.indexOf('x')); // -1
```

## lastIndexOf

Returns last matching index.

```js
console.log('banana'.lastIndexOf('a')); // 5
```

## includes

Checks if substring exists.

```js
console.log(str.includes('Java')); // true
```

## startsWith

```js
console.log(str.startsWith('Java')); // true
```

## endsWith

```js
console.log(str.endsWith('Script')); // true
```

## slice

Gets part of a string.

```js
console.log(str.slice(0, 4)); // Java
console.log(str.slice(4)); // Script
console.log(str.slice(-6)); // Script
```

## substring

Similar to `slice`, but does not support negative indexes the same way.

```js
console.log(str.substring(0, 4)); // Java
```

Prefer `slice` in interviews.

## substr

Old method. Avoid in new code.

```js
console.log(str.substr(4, 6)); // Script
```

## toLowerCase

```js
console.log('HELLO'.toLowerCase()); // hello
```

## toUpperCase

```js
console.log('hello'.toUpperCase()); // HELLO
```

## trim

Removes spaces from both ends.

```js
console.log('  hello  '.trim()); // hello
```

## trimStart

```js
console.log('  hello'.trimStart()); // hello
```

## trimEnd

```js
console.log('hello  '.trimEnd()); // hello
```

## split

Converts string to array.

```js
console.log('a,b,c'.split(',')); // ['a', 'b', 'c']
console.log('hello'.split('')); // ['h', 'e', 'l', 'l', 'o']
```

## replace

Replaces first match.

```js
console.log('hello world'.replace('world', 'JS')); // hello JS
console.log('banana'.replace('a', 'x')); // bxnana
```

## replaceAll

Replaces all matches.

```js
console.log('banana'.replaceAll('a', 'x')); // bxnxnx
```

## match

Finds matches using regex.

```js
console.log('abc123'.match(/\d+/)); // ['123']
```

## matchAll

Returns all regex matches with details.

```js
const matches = 'a1 b2 c3'.matchAll(/\w(\d)/g);

for (const match of matches) {
  console.log(match[1]);
}
// 1
// 2
// 3
```

## search

Returns index of regex match or `-1`.

```js
console.log('abc123'.search(/\d/)); // 3
```

## concat

Joins strings.

```js
console.log('hello'.concat(' ', 'world')); // hello world
```

Most people use `+` or template literals.

```js
const name = 'Sumit';
console.log(`Hello, ${name}`);
```

## repeat

Repeats string.

```js
console.log('ha'.repeat(3)); // hahaha
```

## padStart

Pads from start.

```js
console.log('5'.padStart(3, '0')); // 005
```

## padEnd

Pads from end.

```js
console.log('5'.padEnd(3, '0')); // 500
```

## localeCompare

Compares strings for sorting.

```js
const names = ['zara', 'amit', 'sumit'];
names.sort((a, b) => a.localeCompare(b));
console.log(names); // ['amit', 'sumit', 'zara']
```

## String.raw

Keeps backslashes as raw text.

```js
console.log(String.raw`C:\Users\name`);
```

## Common String Interview Patterns

Reverse string:

```js
function reverseString(s) {
  return s.split('').reverse().join('');
}
```

Palindrome:

```js
function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  return clean === clean.split('').reverse().join('');
}
```

Character frequency:

```js
function frequency(s) {
  const map = new Map();

  for (const char of s) {
    map.set(char, (map.get(char) || 0) + 1);
  }

  return map;
}
```

Anagram:

```js
function isAnagram(a, b) {
  if (a.length !== b.length) return false;

  return a.split('').sort().join('') === b.split('').sort().join('');
}
```

First non-repeating character:

```js
function firstUnique(s) {
  const count = new Map();

  for (const char of s) {
    count.set(char, (count.get(char) || 0) + 1);
  }

  for (const char of s) {
    if (count.get(char) === 1) return char;
  }

  return null;
}
```

## Common Interview Explanations

Closure:

> A closure is when a function remembers variables from its outer scope even after that outer function has returned.

Promise:

> A Promise represents a value that may be available now, later, or never if it rejects.

Event loop:

> JavaScript runs synchronous code first, then microtasks like promises, then macrotasks like setTimeout.

Debounce:

> Debounce waits until the user stops triggering an event before running the function.

Throttle:

> Throttle allows a function to run at most once during a fixed time interval.

Map:

> Map stores key-value pairs and is useful for frequency counting, lookup, and preserving insertion order.

Set:

> Set stores unique values and is useful for duplicate checks.

Shallow copy:

> A shallow copy copies only the first level. Nested objects are still shared by reference.

Deep copy:

> A deep copy recursively copies nested objects so changes do not affect the original.
