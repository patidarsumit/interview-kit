# 09. Coding And JavaScript Round Prep

Even in final rounds, interviewers may ask small coding or JavaScript output questions.

Public reports mention JavaScript basics and code output questions.

## JavaScript Must Revise

- `var` vs `let` vs `const`
- hoisting
- closures
- promises
- async/await
- event loop
- `this`
- arrow functions
- shallow copy vs deep copy
- array methods
- object manipulation
- debouncing/throttling

## Output Question: Promise And Timeout

```js
console.log('A');

setTimeout(() => console.log('B'), 0);

Promise.resolve().then(() => console.log('C'));

console.log('D');
```

Output:

```text
A
D
C
B
```

Why:

- sync first
- promise microtask
- timer macrotask

## Coding Task: Extract And Modify Object Data

Example:

```js
const users = [
  {id: 1, name: 'A', role: 'admin'},
  {id: 2, name: 'B', role: 'user'},
];

const adminNames = users
  .filter((user) => user.role === 'admin')
  .map((user) => user.name);
```

## Coding Task: Remove Duplicates

```js
const values = [1, 2, 2, 3];
const unique = [...new Set(values)];
```

For objects:

```js
const uniqueById = Array.from(
  new Map(users.map((user) => [user.id, user])).values(),
);
```

## Coding Task: Debounce

```js
function debounce(callback, delay) {
  let timerId;

  return (...args) => {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
```

Angular use:

Use RxJS `debounceTime` for form/search streams.

## Coding Task: Deep Clone

Simple:

```js
const cloned = structuredClone(value);
```

Older/simple JSON-safe:

```js
const cloned = JSON.parse(JSON.stringify(value));
```

Mention limitations:

- functions lost
- Date becomes string in JSON method
- circular references fail

## Angular Coding Tasks

Prepare to write:

- auth guard
- HTTP interceptor
- reactive form validator
- custom pipe
- search with `switchMap`
- reusable component with input/output
- dynamic component with `NgComponentOutlet`

## HTML/CSS Basics

Revise:

- semantic HTML
- flexbox
- grid
- specificity
- box model
- responsive design
- accessibility labels
- SCSS nesting/mixins variables

## Final Tip

When solving code:

1. Clarify input/output.
2. Mention edge cases.
3. Write simple solution.
4. Explain time complexity if relevant.
5. Mention how it would be used in Angular project.

