# JavaScript Output-Based Questions

Use this file like a quiz. First guess the output, then check the answer.

Note: These are common interview patterns, rewritten as practice questions. In real interviews, the same concepts appear with small changes.

## Hoisting, Scope, and TDZ

### Q1. var hoisting

```js
console.log(a);
var a = 10;
```

Answer:

```txt
undefined
```

Why: `var a` is hoisted, but assignment happens later.

### Q2. let temporal dead zone

```js
console.log(a);
let a = 10;
```

Answer:

```txt
ReferenceError
```

Why: `let` is hoisted but cannot be accessed before declaration.

### Q3. const temporal dead zone

```js
console.log(a);
const a = 10;
```

Answer:

```txt
ReferenceError
```

Why: Same TDZ behavior as `let`.

### Q4. Function declaration hoisting

```js
sayHi();

function sayHi() {
  console.log('Hi');
}
```

Answer:

```txt
Hi
```

Why: Function declarations are hoisted with their body.

### Q5. Function expression hoisting

```js
sayHi();

var sayHi = function () {
  console.log('Hi');
};
```

Answer:

```txt
TypeError: sayHi is not a function
```

Why: `var sayHi` is hoisted as `undefined`, not the function value.

### Q6. let function expression

```js
sayHi();

let sayHi = function () {
  console.log('Hi');
};
```

Answer:

```txt
ReferenceError
```

Why: `sayHi` is in the temporal dead zone.

### Q7. var inside function

```js
var x = 10;

function test() {
  console.log(x);
  var x = 20;
}

test();
```

Answer:

```txt
undefined
```

Why: Local `var x` is hoisted inside `test`, shadowing global `x`.

### Q8. let block scope

```js
let x = 10;

if (true) {
  let x = 20;
  console.log(x);
}

console.log(x);
```

Answer:

```txt
20
10
```

Why: `let` is block scoped.

### Q9. var block scope

```js
var x = 10;

if (true) {
  var x = 20;
  console.log(x);
}

console.log(x);
```

Answer:

```txt
20
20
```

Why: `var` is function scoped, not block scoped.

### Q10. const object mutation

```js
const user = { name: 'A' };
user.name = 'B';
console.log(user.name);
```

Answer:

```txt
B
```

Why: `const` prevents reassignment, not object mutation.

### Q11. const reassignment

```js
const user = { name: 'A' };
user = { name: 'B' };
console.log(user.name);
```

Answer:

```txt
TypeError
```

Why: A `const` variable cannot be reassigned.

### Q12. Function parameter shadowing

```js
var x = 1;

function test(x) {
  console.log(x);
}

test(5);
```

Answer:

```txt
5
```

Why: The parameter `x` shadows the global `x`.

## Closures

### Q13. Basic closure

```js
function outer() {
  let count = 0;

  return function inner() {
    count++;
    console.log(count);
  };
}

const counter = outer();
counter();
counter();
```

Answer:

```txt
1
2
```

Why: `inner` remembers `count`.

### Q14. Two independent closures

```js
function createCounter() {
  let count = 0;
  return () => ++count;
}

const a = createCounter();
const b = createCounter();

console.log(a());
console.log(a());
console.log(b());
```

Answer:

```txt
1
2
1
```

Why: Each call to `createCounter` creates a new closure.

### Q15. var in loop with setTimeout

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
```

Answer:

```txt
3
3
3
```

Why: `var` has one shared `i`.

### Q16. let in loop with setTimeout

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
```

Answer:

```txt
0
1
2
```

Why: `let` creates a new binding for each loop iteration.

### Q17. IIFE captures value

```js
for (var i = 0; i < 3; i++) {
  (function (x) {
    setTimeout(() => console.log(x), 0);
  })(i);
}
```

Answer:

```txt
0
1
2
```

Why: The IIFE receives the current value as `x`.

### Q18. Closure with outer variable changed

```js
let value = 1;

function getValue() {
  return value;
}

value = 2;

console.log(getValue());
```

Answer:

```txt
2
```

Why: Closures remember variables, not old values.

### Q19. Closure with parameter copy

```js
let value = 1;

const getValue = (function (x) {
  return function () {
    return x;
  };
})(value);

value = 2;

console.log(getValue());
```

Answer:

```txt
1
```

Why: The IIFE parameter `x` received `1`.

## this, Arrow Functions, call, apply, bind

### Q20. Method call

```js
const user = {
  name: 'Sumit',
  getName() {
    return this.name;
  },
};

console.log(user.getName());
```

Answer:

```txt
Sumit
```

Why: `this` points to `user` because of method call syntax.

### Q21. Lost this

```js
const user = {
  name: 'Sumit',
  getName() {
    return this.name;
  },
};

const fn = user.getName;
console.log(fn());
```

Answer:

```txt
undefined
```

Why: The function is called without `user`. In strict mode, `this` would be `undefined`.

### Q22. bind

```js
const user = {
  name: 'Sumit',
  getName() {
    return this.name;
  },
};

const fn = user.getName.bind(user);
console.log(fn());
```

Answer:

```txt
Sumit
```

Why: `bind` permanently sets `this`.

### Q23. Arrow function as method

```js
const user = {
  name: 'Sumit',
  getName: () => this.name,
};

console.log(user.getName());
```

Answer:

```txt
undefined
```

Why: Arrow functions do not get `this` from the object.

### Q24. Nested normal function

```js
const user = {
  name: 'Sumit',
  getName() {
    function inner() {
      return this.name;
    }

    return inner();
  },
};

console.log(user.getName());
```

Answer:

```txt
undefined
```

Why: `inner` is called as a plain function.

### Q25. Nested arrow function

```js
const user = {
  name: 'Sumit',
  getName() {
    const inner = () => this.name;
    return inner();
  },
};

console.log(user.getName());
```

Answer:

```txt
Sumit
```

Why: Arrow `inner` captures `this` from `getName`.

### Q26. call

```js
function greet(city) {
  console.log(`${this.name} from ${city}`);
}

greet.call({ name: 'Sumit' }, 'Pune');
```

Answer:

```txt
Sumit from Pune
```

Why: `call` passes `this` and arguments one by one.

### Q27. apply

```js
function greet(city, country) {
  console.log(`${this.name} from ${city}, ${country}`);
}

greet.apply({ name: 'Sumit' }, ['Pune', 'India']);
```

Answer:

```txt
Sumit from Pune, India
```

Why: `apply` passes arguments as an array.

## Type Coercion and Equality

### Q28. String plus number

```js
console.log(1 + '2' + 3);
```

Answer:

```txt
123
```

Why: `+` with string performs string concatenation.

### Q29. Number before string

```js
console.log(1 + 2 + '3');
```

Answer:

```txt
33
```

Why: `1 + 2` is `3`, then `'3'` makes string concatenation.

### Q30. Subtraction converts to number

```js
console.log('5' - 2);
```

Answer:

```txt
3
```

Why: `-` converts strings to numbers.

### Q31. Multiplication converts to number

```js
console.log('5' * '2');
```

Answer:

```txt
10
```

Why: `*` performs numeric conversion.

### Q32. Invalid numeric conversion

```js
console.log('hello' - 1);
```

Answer:

```txt
NaN
```

Why: `'hello'` cannot become a valid number.

### Q33. Loose equality

```js
console.log(0 == false);
console.log(0 === false);
```

Answer:

```txt
true
false
```

Why: `==` converts types. `===` does not.

### Q34. null and undefined

```js
console.log(null == undefined);
console.log(null === undefined);
```

Answer:

```txt
true
false
```

Why: `null` loosely equals `undefined`, but types differ.

### Q35. NaN

```js
console.log(NaN === NaN);
console.log(Number.isNaN(NaN));
```

Answer:

```txt
false
true
```

Why: `NaN` is not equal to itself.

### Q36. Boolean conversion

```js
console.log(Boolean('false'));
console.log(Boolean(''));
```

Answer:

```txt
true
false
```

Why: Non-empty strings are truthy.

### Q37. Array to string

```js
console.log([1, 2] + [3, 4]);
```

Answer:

```txt
1,23,4
```

Why: Arrays convert to strings: `'1,2' + '3,4'`.

### Q38. Object to string

```js
console.log({} + []);
```

Answer:

```txt
[object Object]
```

Why: Object converts to `"[object Object]"`, array converts to `""`.

### Q39. Empty array equality

```js
console.log([] == false);
console.log([] === false);
```

Answer:

```txt
true
false
```

Why: `[]` becomes `''`, then `0`; `false` also becomes `0`.

### Q40. typeof null

```js
console.log(typeof null);
```

Answer:

```txt
object
```

Why: This is a historical JavaScript bug.

### Q41. typeof function and array

```js
console.log(typeof []);
console.log(typeof function () {});
```

Answer:

```txt
object
function
```

Why: Arrays are objects. Functions have special `typeof` result.

### Q42. parseInt

```js
console.log(parseInt('10px'));
console.log(Number('10px'));
```

Answer:

```txt
10
NaN
```

Why: `parseInt` reads until invalid character. `Number` needs the whole string to be numeric.

## Arrays and Objects

### Q43. Object reference

```js
const a = { x: 1 };
const b = a;
b.x = 2;

console.log(a.x);
```

Answer:

```txt
2
```

Why: Both variables point to the same object.

### Q44. Object comparison

```js
console.log({} === {});
console.log([] === []);
```

Answer:

```txt
false
false
```

Why: Objects and arrays compare by reference.

### Q45. Shallow copy

```js
const a = { nested: { x: 1 } };
const b = { ...a };

b.nested.x = 2;

console.log(a.nested.x);
```

Answer:

```txt
2
```

Why: Spread creates a shallow copy.

### Q46. Array push return value

```js
const arr = [1, 2];
console.log(arr.push(3));
console.log(arr);
```

Answer:

```txt
3
[1, 2, 3]
```

Why: `push` returns the new length.

### Q47. Array pop return value

```js
const arr = [1, 2, 3];
console.log(arr.pop());
console.log(arr);
```

Answer:

```txt
3
[1, 2]
```

Why: `pop` returns the removed item.

### Q48. slice does not mutate

```js
const arr = [1, 2, 3, 4];
console.log(arr.slice(1, 3));
console.log(arr);
```

Answer:

```txt
[2, 3]
[1, 2, 3, 4]
```

Why: `slice` returns a copy.

### Q49. splice mutates

```js
const arr = [1, 2, 3, 4];
console.log(arr.splice(1, 2));
console.log(arr);
```

Answer:

```txt
[2, 3]
[1, 4]
```

Why: `splice` removes from the original array.

### Q50. map return

```js
const arr = [1, 2, 3];
const result = arr.map(num => num * 2);

console.log(result);
console.log(arr);
```

Answer:

```txt
[2, 4, 6]
[1, 2, 3]
```

Why: `map` returns a new array.

### Q51. forEach return

```js
const arr = [1, 2, 3];
const result = arr.forEach(num => num * 2);

console.log(result);
```

Answer:

```txt
undefined
```

Why: `forEach` does not return a new array.

### Q52. filter

```js
const arr = [1, 2, 3, 4];
console.log(arr.filter(num => num % 2 === 0));
```

Answer:

```txt
[2, 4]
```

Why: `filter` keeps items that return true.

### Q53. reduce

```js
const arr = [1, 2, 3, 4];
console.log(arr.reduce((sum, num) => sum + num, 0));
```

Answer:

```txt
10
```

Why: `reduce` accumulates into one value.

### Q54. sort default

```js
const arr = [10, 2, 5];
arr.sort();
console.log(arr);
```

Answer:

```txt
[10, 2, 5]
```

Why: Default sort converts items to strings.

### Q55. numeric sort

```js
const arr = [10, 2, 5];
arr.sort((a, b) => a - b);
console.log(arr);
```

Answer:

```txt
[2, 5, 10]
```

Why: Comparator sorts numerically.

### Q56. delete array item

```js
const arr = [1, 2, 3];
delete arr[1];

console.log(arr);
console.log(arr.length);
```

Answer:

```txt
[1, empty, 3]
3
```

Why: `delete` creates a hole; it does not shrink the array.

### Q57. Object keys order

```js
const obj = {
  b: 1,
  a: 2,
};

console.log(Object.keys(obj));
```

Answer:

```txt
['b', 'a']
```

Why: Normal string keys keep insertion order.

### Q58. Integer-like object keys

```js
const obj = {
  2: 'b',
  1: 'a',
  name: 'sumit',
};

console.log(Object.keys(obj));
```

Answer:

```txt
['1', '2', 'name']
```

Why: Integer-like keys are ordered first.

## Strings

### Q59. String immutability

```js
let str = 'hello';
str[0] = 'H';

console.log(str);
```

Answer:

```txt
hello
```

Why: Strings are immutable.

### Q60. slice with negative index

```js
const str = 'JavaScript';
console.log(str.slice(-6));
```

Answer:

```txt
Script
```

Why: Negative index counts from the end.

### Q61. substring negative index

```js
const str = 'JavaScript';
console.log(str.substring(-6));
```

Answer:

```txt
JavaScript
```

Why: `substring` treats negative values as `0`.

### Q62. split and join

```js
const str = 'hello';
console.log(str.split('').reverse().join(''));
```

Answer:

```txt
olleh
```

Why: Convert to array, reverse, convert back.

### Q63. replace first only

```js
console.log('banana'.replace('a', 'x'));
```

Answer:

```txt
bxnana
```

Why: `replace` replaces only the first string match.

### Q64. replaceAll

```js
console.log('banana'.replaceAll('a', 'x'));
```

Answer:

```txt
bxnxnx
```

Why: `replaceAll` replaces every match.

### Q65. trim

```js
console.log('  hi  '.trim().length);
```

Answer:

```txt
2
```

Why: `trim` removes spaces from both ends.

### Q66. includes

```js
console.log('JavaScript'.includes('Script'));
console.log('JavaScript'.includes('script'));
```

Answer:

```txt
true
false
```

Why: `includes` is case-sensitive.

## Event Loop and Promises

### Q67. setTimeout

```js
console.log('A');

setTimeout(() => console.log('B'), 0);

console.log('C');
```

Answer:

```txt
A
C
B
```

Why: Synchronous code runs before timer callbacks.

### Q68. Promise before setTimeout

```js
console.log('A');

setTimeout(() => console.log('B'), 0);

Promise.resolve().then(() => console.log('C'));

console.log('D');
```

Answer:

```txt
A
D
C
B
```

Why: Microtasks from promises run before macrotasks like `setTimeout`.

### Q69. Promise executor is sync

```js
console.log('A');

new Promise(resolve => {
  console.log('B');
  resolve();
}).then(() => console.log('C'));

console.log('D');
```

Answer:

```txt
A
B
D
C
```

Why: Promise executor runs synchronously. `.then` runs later as a microtask.

### Q70. then argument mistake

```js
console.log('A');

Promise.resolve()
  .then(() => console.log('B'))
  .then(console.log('C'));

console.log('D');
```

Answer:

```txt
A
C
D
B
```

Why: `console.log('C')` runs immediately. `.then` expects a function.

### Q71. Promise chain

```js
Promise.resolve(1)
  .then(value => value + 1)
  .then(value => console.log(value));
```

Answer:

```txt
2
```

Why: Returned value becomes input to the next `.then`.

### Q72. Promise catch recovery

```js
Promise.reject('fail')
  .catch(error => {
    console.log(error);
    return 'recovered';
  })
  .then(value => console.log(value));
```

Answer:

```txt
fail
recovered
```

Why: Returning from `catch` recovers the chain.

### Q73. async function return

```js
async function test() {
  return 5;
}

console.log(test());
```

Answer:

```txt
Promise { 5 }
```

Why: `async` functions always return a Promise.

Exact console display may vary by environment.

### Q74. await order

```js
async function test() {
  console.log('A');
  await Promise.resolve();
  console.log('B');
}

console.log('C');
test();
console.log('D');
```

Answer:

```txt
C
A
D
B
```

Why: Code after `await` continues in a microtask.

### Q75. async throw

```js
async function test() {
  throw new Error('fail');
}

test().catch(error => console.log(error.message));
```

Answer:

```txt
fail
```

Why: Throwing inside `async` rejects the returned Promise.

## Classes, Prototypes, and Constructors

### Q76. Class method

```js
class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return this.name;
  }
}

const user = new User('Sumit');
console.log(user.greet());
```

Answer:

```txt
Sumit
```

Why: Constructor sets instance property.

### Q77. static method

```js
class User {
  static role() {
    return 'admin';
  }
}

const user = new User();
console.log(User.role());
console.log(user.role());
```

Answer:

```txt
admin
TypeError: user.role is not a function
```

Why: Static methods belong to the class, not instances.

### Q78. Prototype method

```js
function User(name) {
  this.name = name;
}

User.prototype.getName = function () {
  return this.name;
};

const user = new User('Sumit');
console.log(user.getName());
```

Answer:

```txt
Sumit
```

Why: Instance can access methods from prototype.

### Q79. new keyword missing

```js
function User(name) {
  this.name = name;
}

const user = User('Sumit');
console.log(user);
```

Answer:

```txt
undefined
```

Why: Constructor returns `undefined` if called without `new`. In strict mode, assigning to `this.name` can throw.

## Destructuring, Spread, Rest

### Q80. Array destructuring

```js
const [a, , b] = [1, 2, 3];
console.log(a, b);
```

Answer:

```txt
1 3
```

Why: The middle item is skipped.

### Q81. Object destructuring default

```js
const { name = 'Guest' } = {};
console.log(name);
```

Answer:

```txt
Guest
```

Why: Default value is used when property is `undefined`.

### Q82. Spread shallow copy

```js
const a = [1, 2];
const b = [...a, 3];

console.log(b);
console.log(a);
```

Answer:

```txt
[1, 2, 3]
[1, 2]
```

Why: Spread creates a new top-level array.

### Q83. Rest parameter

```js
function sum(a, ...rest) {
  console.log(a);
  console.log(rest);
}

sum(1, 2, 3, 4);
```

Answer:

```txt
1
[2, 3, 4]
```

Why: Rest collects remaining arguments.

## Map, Set, WeakMap

### Q84. Set unique values

```js
const set = new Set([1, 2, 2, 3]);
console.log([...set]);
```

Answer:

```txt
[1, 2, 3]
```

Why: `Set` stores unique values.

### Q85. Set with objects

```js
const set = new Set();
set.add({});
set.add({});

console.log(set.size);
```

Answer:

```txt
2
```

Why: The two objects are different references.

### Q86. Map keys

```js
const map = new Map();
const key = {};

map.set(key, 'value');

console.log(map.get(key));
console.log(map.get({}));
```

Answer:

```txt
value
undefined
```

Why: Object keys are matched by reference.

## Operators

### Q87. Logical OR

```js
console.log(0 || 'default');
console.log('hello' || 'default');
```

Answer:

```txt
default
hello
```

Why: `||` returns the first truthy value.

### Q88. Logical AND

```js
console.log(1 && 'ok');
console.log(0 && 'ok');
```

Answer:

```txt
ok
0
```

Why: `&&` returns first falsy value, otherwise last value.

### Q89. Nullish coalescing

```js
console.log(0 ?? 'default');
console.log(null ?? 'default');
console.log(undefined ?? 'default');
```

Answer:

```txt
0
default
default
```

Why: `??` only falls back for `null` or `undefined`.

### Q90. Optional chaining

```js
const user = {};
console.log(user.address?.city);
```

Answer:

```txt
undefined
```

Why: Optional chaining stops before throwing an error.

### Q91. Post increment

```js
let x = 1;
console.log(x++);
console.log(x);
```

Answer:

```txt
1
2
```

Why: Post-increment returns old value, then increments.

### Q92. Pre increment

```js
let x = 1;
console.log(++x);
console.log(x);
```

Answer:

```txt
2
2
```

Why: Pre-increment increments first, then returns new value.

### Q93. Comma operator

```js
let x = (1, 2, 3);
console.log(x);
```

Answer:

```txt
3
```

Why: Comma operator returns the last expression.

## JSON and Dates

### Q94. JSON stringify removes undefined

```js
const obj = {
  a: 1,
  b: undefined,
  c: function () {},
};

console.log(JSON.stringify(obj));
```

Answer:

```txt
{"a":1}
```

Why: `undefined` and functions are skipped in objects.

### Q95. JSON stringify array undefined

```js
console.log(JSON.stringify([1, undefined, 3]));
```

Answer:

```txt
[1,null,3]
```

Why: `undefined` in arrays becomes `null`.

### Q96. Date comparison

```js
const a = new Date('2024-01-01');
const b = new Date('2024-01-01');

console.log(a === b);
console.log(a.getTime() === b.getTime());
```

Answer:

```txt
false
true
```

Why: Date objects are different references, but timestamps match.

## Error Handling

### Q97. try catch finally

```js
try {
  console.log('try');
  throw new Error('fail');
} catch (error) {
  console.log('catch');
} finally {
  console.log('finally');
}
```

Answer:

```txt
try
catch
finally
```

Why: `finally` always runs.

### Q98. finally with return

```js
function test() {
  try {
    return 1;
  } finally {
    return 2;
  }
}

console.log(test());
```

Answer:

```txt
2
```

Why: A return in `finally` overrides the return from `try`.

## Mixed Practice

### Q99. Mixed event loop

```js
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve()
  .then(() => console.log('3'))
  .then(() => console.log('4'));

console.log('5');
```

Answer:

```txt
1
5
3
4
2
```

Why: Sync first, then promise microtasks, then timer macrotask.

### Q100. Mixed closure and var

```js
function createFunctions() {
  var result = [];

  for (var i = 0; i < 3; i++) {
    result.push(function () {
      return i;
    });
  }

  return result;
}

const functions = createFunctions();

console.log(functions[0]());
console.log(functions[1]());
console.log(functions[2]());
```

Answer:

```txt
3
3
3
```

Why: All functions close over the same `var i`.

## Quick Final Memory

```txt
var = hoisted with undefined
let/const = TDZ before declaration
function declaration = fully hoisted
arrow function = no own this
normal method call = this is left-side object
object/array compare by reference
slice = copy
splice = mutate
Promise.then = microtask
setTimeout = macrotask
async always returns Promise
strings are immutable
```
