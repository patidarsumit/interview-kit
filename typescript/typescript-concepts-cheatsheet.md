# TypeScript Concepts Cheat Sheet

Use this for interview revision. TypeScript is JavaScript plus static typing.

The main goal of TypeScript is to catch mistakes before runtime.

## What Is TypeScript?

TypeScript is a superset of JavaScript.

Every valid JavaScript file is valid TypeScript, but TypeScript adds types.

```ts
let name: string = 'Sumit';
let age: number = 30;
```

TypeScript code is compiled to JavaScript before running.

## Why Use TypeScript?

- catches bugs early
- improves autocomplete
- documents code through types
- helps large teams maintain code
- makes refactoring safer

Interview line:

> TypeScript gives JavaScript static typing, so many errors can be caught during development instead of at runtime.

## Basic Types

```ts
let username: string = 'Sumit';
let age: number = 30;
let isActive: boolean = true;
let nothing: null = null;
let notDefined: undefined = undefined;
let big: bigint = 100n;
let id: symbol = Symbol('id');
```

## Type Inference

TypeScript can guess the type.

```ts
let name = 'Sumit';
// TypeScript knows name is string.
```

This will fail:

```ts
let name = 'Sumit';
// name = 10; // Error
```

Use explicit types when it improves clarity.

## any

`any` turns off type checking.

```ts
let value: any = 10;
value = 'hello';
value = true;
```

Avoid `any` unless absolutely needed.

Interview line:

> `any` removes TypeScript safety. It should be avoided because it behaves like plain JavaScript.

## unknown

`unknown` is safer than `any`.

You must check the type before using it.

```ts
let value: unknown = 'hello';

if (typeof value === 'string') {
  console.log(value.toUpperCase());
}
```

Interview line:

> `unknown` means we do not know the type yet, so TypeScript forces us to narrow it before using it.

## never

`never` means a value never exists.

Used for:

- functions that always throw
- functions that never finish
- exhaustive checks

```ts
function throwError(message: string): never {
  throw new Error(message);
}
```

## void

`void` means a function does not return a useful value.

```ts
function logMessage(message: string): void {
  console.log(message);
}
```

## Arrays

```ts
const nums: number[] = [1, 2, 3];
const names: Array<string> = ['A', 'B'];
```

Both styles are valid.

## Tuples

A tuple is an array with fixed length and fixed types.

```ts
const user: [string, number] = ['Sumit', 30];
```

Good for small fixed structures.

```ts
const response: [number, string] = [200, 'OK'];
```

## Enum

Enums define named constants.

```ts
enum Role {
  Admin,
  User,
  Guest,
}

const role: Role = Role.Admin;
```

String enum:

```ts
enum Status {
  Success = 'SUCCESS',
  Failed = 'FAILED',
}
```

In many modern TypeScript codebases, union literals are preferred over enums.

```ts
type Status = 'success' | 'failed';
```

## Literal Types

Literal types allow exact values.

```ts
let direction: 'left' | 'right';

direction = 'left';
// direction = 'up'; // Error
```

## Union Types

A value can be one of multiple types.

```ts
let id: string | number;

id = 'abc';
id = 123;
```

Use narrowing before calling type-specific methods.

```ts
function printId(id: string | number) {
  if (typeof id === 'string') {
    console.log(id.toUpperCase());
  } else {
    console.log(id.toFixed(2));
  }
}
```

## Intersection Types

Combines multiple types into one.

```ts
type Person = {
  name: string;
};

type Employee = {
  employeeId: number;
};

type EmployeePerson = Person & Employee;

const user: EmployeePerson = {
  name: 'Sumit',
  employeeId: 101,
};
```

## Type Alias

Use `type` to create a custom type.

```ts
type User = {
  id: number;
  name: string;
};

const user: User = {
  id: 1,
  name: 'Sumit',
};
```

## Interface

Use `interface` to describe object shape.

```ts
interface User {
  id: number;
  name: string;
}

const user: User = {
  id: 1,
  name: 'Sumit',
};
```

## type vs interface

Both can describe objects.

Use `interface` often for object shapes and class contracts.

Use `type` for:

- unions
- intersections
- utility/computed types
- primitive aliases

```ts
type ID = string | number;
```

Interface can merge declarations:

```ts
interface User {
  name: string;
}

interface User {
  age: number;
}

const user: User = {
  name: 'Sumit',
  age: 30,
};
```

Type aliases cannot be redeclared with the same name.

Interview line:

> `interface` supports declaration merging. `type` is more flexible for unions, intersections, and computed types.

## Optional Properties

```ts
type User = {
  name: string;
  age?: number;
};

const user: User = {
  name: 'Sumit',
};
```

`age?: number` means `age` can be missing.

## Readonly Properties

```ts
type User = {
  readonly id: number;
  name: string;
};

const user: User = {
  id: 1,
  name: 'Sumit',
};

// user.id = 2; // Error
```

## Index Signature

Used when object keys are dynamic.

```ts
type Scores = {
  [subject: string]: number;
};

const scores: Scores = {
  math: 90,
  english: 85,
};
```

## Record

`Record` is a cleaner way to type dynamic objects.

```ts
type Role = 'admin' | 'user';

const permissions: Record<Role, string[]> = {
  admin: ['read', 'write'],
  user: ['read'],
};
```

## Function Types

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

Arrow function:

```ts
const add = (a: number, b: number): number => {
  return a + b;
};
```

Function type alias:

```ts
type Add = (a: number, b: number) => number;

const add: Add = (a, b) => a + b;
```

## Optional and Default Parameters

```ts
function greet(name: string, title?: string) {
  return title ? `${title} ${name}` : name;
}
```

Default parameter:

```ts
function greet(name: string = 'Guest') {
  return `Hello ${name}`;
}
```

## Rest Parameters

```ts
function sum(...nums: number[]): number {
  return nums.reduce((total, num) => total + num, 0);
}
```

## Function Overloading

Function overloads allow multiple call signatures.

```ts
function combine(a: string, b: string): string;
function combine(a: number, b: number): number;
function combine(a: string | number, b: string | number) {
  if (typeof a === 'string' && typeof b === 'string') {
    return a + b;
  }

  if (typeof a === 'number' && typeof b === 'number') {
    return a + b;
  }

  throw new Error('Invalid arguments');
}

console.log(combine(1, 2)); // 3
console.log(combine('a', 'b')); // ab
```

## Generics

Generics make types reusable.

```ts
function identity<T>(value: T): T {
  return value;
}

const a = identity<string>('hello');
const b = identity<number>(10);
```

TypeScript can often infer generic type:

```ts
const value = identity('hello');
```

Interview line:

> Generics let us write reusable code while preserving the input and output types.

## Generic Array Example

```ts
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

const firstNumber = getFirst([1, 2, 3]);
const firstName = getFirst(['A', 'B']);
```

## Generic Constraint

Use `extends` to restrict generic types.

```ts
function getLength<T extends { length: number }>(value: T): number {
  return value.length;
}

console.log(getLength('hello'));
console.log(getLength([1, 2, 3]));
```

## keyof

`keyof` gives a union of object keys.

```ts
type User = {
  id: number;
  name: string;
};

type UserKey = keyof User; // 'id' | 'name'
```

Example:

```ts
function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: 'Sumit' };

console.log(getValue(user, 'name')); // Sumit
```

## typeof Type Operator

Gets type from a value.

```ts
const user = {
  id: 1,
  name: 'Sumit',
};

type User = typeof user;
```

## Type Narrowing

Narrowing means reducing a broad type to a specific type.

### typeof narrowing

```ts
function print(value: string | number) {
  if (typeof value === 'string') {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}
```

### instanceof narrowing

```ts
function printDate(value: Date | string) {
  if (value instanceof Date) {
    console.log(value.toISOString());
  } else {
    console.log(value.toUpperCase());
  }
}
```

### in narrowing

```ts
type Cat = {
  meow: () => void;
};

type Dog = {
  bark: () => void;
};

function speak(animal: Cat | Dog) {
  if ('meow' in animal) {
    animal.meow();
  } else {
    animal.bark();
  }
}
```

## Type Guards

A type guard is a function that narrows a type.

```ts
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function print(value: unknown) {
  if (isString(value)) {
    console.log(value.toUpperCase());
  }
}
```

## Discriminated Unions

Use a common property to identify object type.

```ts
type LoadingState = {
  status: 'loading';
};

type SuccessState = {
  status: 'success';
  data: string;
};

type ErrorState = {
  status: 'error';
  error: string;
};

type State = LoadingState | SuccessState | ErrorState;

function render(state: State) {
  switch (state.status) {
    case 'loading':
      return 'Loading...';
    case 'success':
      return state.data;
    case 'error':
      return state.error;
  }
}
```

This is very common in frontend code.

## Exhaustive Check With never

```ts
function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${value}`);
}

type Status = 'success' | 'error';

function handleStatus(status: Status) {
  switch (status) {
    case 'success':
      return 'OK';
    case 'error':
      return 'Failed';
    default:
      return assertNever(status);
  }
}
```

If a new status is added and not handled, TypeScript can warn you.

## Type Assertion

Tells TypeScript to treat a value as a specific type.

```ts
const input = document.getElementById('name') as HTMLInputElement;
console.log(input.value);
```

Use carefully. Type assertion does not change runtime value.

Interview line:

> Type assertion tells the compiler what I know about the type, but it does not perform runtime checking.

## Non-Null Assertion

```ts
const input = document.getElementById('name')!;
```

`!` tells TypeScript the value is not `null` or `undefined`.

Use carefully.

Better:

```ts
const input = document.getElementById('name');

if (input) {
  console.log(input.id);
}
```

## as const

Makes values readonly and literal.

```ts
const directions = ['left', 'right'] as const;

type Direction = typeof directions[number]; // 'left' | 'right'
```

Without `as const`, TypeScript may infer `string[]`.

## satisfies Operator

`satisfies` checks a value against a type without losing exact inference.

```ts
type User = {
  name: string;
  age: number;
};

const user = {
  name: 'Sumit',
  age: 30,
} satisfies User;
```

Useful when you want validation and precise inferred values.

## Classes

```ts
class User {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  greet(): string {
    return `Hello ${this.name}`;
  }
}

const user = new User('Sumit');
```

## Access Modifiers

```ts
class User {
  public name: string;
  private password: string;
  protected role: string;

  constructor(name: string, password: string, role: string) {
    this.name = name;
    this.password = password;
    this.role = role;
  }
}
```

- `public`: accessible everywhere
- `private`: accessible only inside class
- `protected`: accessible inside class and subclasses

## Parameter Properties

Shorter class constructor syntax.

```ts
class User {
  constructor(public name: string, private password: string) {}
}
```

This creates and assigns properties automatically.

## implements

Class can implement an interface.

```ts
interface Logger {
  log(message: string): void;
}

class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(message);
  }
}
```

## extends

Class inheritance.

```ts
class Animal {
  move() {
    console.log('moving');
  }
}

class Dog extends Animal {
  bark() {
    console.log('bark');
  }
}
```

## Abstract Classes

Abstract classes cannot be instantiated directly.

```ts
abstract class Shape {
  abstract area(): number;
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}
```

## Utility Types

TypeScript provides built-in helper types.

## Partial

Makes all properties optional.

```ts
type User = {
  name: string;
  age: number;
};

type PartialUser = Partial<User>;
```

Useful for update objects.

```ts
function updateUser(user: User, updates: Partial<User>): User {
  return { ...user, ...updates };
}
```

## Required

Makes all properties required.

```ts
type User = {
  name?: string;
  age?: number;
};

type RequiredUser = Required<User>;
```

## Readonly

Makes all properties readonly.

```ts
type User = {
  name: string;
};

type ReadonlyUser = Readonly<User>;
```

## Pick

Selects specific properties.

```ts
type User = {
  id: number;
  name: string;
  password: string;
};

type PublicUser = Pick<User, 'id' | 'name'>;
```

## Omit

Removes specific properties.

```ts
type SafeUser = Omit<User, 'password'>;
```

## Record

Creates object type from keys and values.

```ts
type Role = 'admin' | 'user';
type Permissions = Record<Role, string[]>;
```

## Exclude

Removes union members.

```ts
type Status = 'success' | 'error' | 'loading';
type FinalStatus = Exclude<Status, 'loading'>; // 'success' | 'error'
```

## Extract

Keeps matching union members.

```ts
type Status = 'success' | 'error' | 'loading';
type ErrorStatus = Extract<Status, 'error' | 'failed'>; // 'error'
```

## NonNullable

Removes `null` and `undefined`.

```ts
type Value = string | null | undefined;
type SafeValue = NonNullable<Value>; // string
```

## ReturnType

Gets return type of a function.

```ts
function getUser() {
  return { id: 1, name: 'Sumit' };
}

type User = ReturnType<typeof getUser>;
```

## Parameters

Gets function parameter types as a tuple.

```ts
function createUser(name: string, age: number) {}

type CreateUserParams = Parameters<typeof createUser>; // [string, number]
```

## Awaited

Gets resolved value type from a Promise.

```ts
type Data = Awaited<Promise<string>>; // string
```

## Conditional Types

Types can behave like conditions.

```ts
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false
```

## Mapped Types

Create new types by looping over keys.

```ts
type User = {
  name: string;
  age: number;
};

type OptionalUser = {
  [K in keyof User]?: User[K];
};
```

This is how utility types like `Partial` work.

## Template Literal Types

Create string types from other string types.

```ts
type EventName = 'click' | 'change';
type HandlerName = `on${Capitalize<EventName>}`;

// 'onClick' | 'onChange'
```

## Modules: export and import

```ts
export function add(a: number, b: number): number {
  return a + b;
}
```

```ts
import { add } from './math';
```

Default export:

```ts
export default class User {}
```

```ts
import User from './User';
```

## Namespaces

Namespaces are older TypeScript style.

Modern projects usually prefer ES modules.

```ts
namespace Utils {
  export function log(message: string) {
    console.log(message);
  }
}

Utils.log('hello');
```

## Declaration Files

`.d.ts` files describe types for JavaScript code or libraries.

Example:

```ts
declare function greet(name: string): void;
```

Used when a library has no built-in TypeScript types.

## tsconfig.json

`tsconfig.json` controls TypeScript compiler options.

Common options:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

Important:

- `strict`: enables strict type checking
- `noImplicitAny`: prevents accidental `any`
- `strictNullChecks`: checks `null` and `undefined`
- `target`: JavaScript version output
- `module`: module system

## strictNullChecks

When enabled, `null` and `undefined` must be handled.

```ts
function printName(name: string | null) {
  if (name !== null) {
    console.log(name.toUpperCase());
  }
}
```

Without checking, TypeScript will complain.

## noImplicitAny

Prevents parameters from silently becoming `any`.

```ts
// function add(a, b) {
//   return a + b;
// }
```

With `noImplicitAny`, this errors because `a` and `b` have no types.

## Type Compatibility

TypeScript uses structural typing.

If an object has the required shape, it is compatible.

```ts
type User = {
  name: string;
};

const person = {
  name: 'Sumit',
  age: 30,
};

const user: User = person;
```

This works because `person` has at least `name`.

Interview line:

> TypeScript is structurally typed, so compatibility is based on shape, not class name.

## Excess Property Checks

Direct object literals are checked more strictly.

```ts
type User = {
  name: string;
};

// const user: User = { name: 'Sumit', age: 30 }; // Error
```

But this works:

```ts
const person = { name: 'Sumit', age: 30 };
const user: User = person;
```

Why: excess property checks apply to direct object literals.

## Optional Chaining

```ts
type User = {
  address?: {
    city?: string;
  };
};

const user: User = {};

console.log(user.address?.city);
```

## Nullish Coalescing

```ts
const count: number | null = 0;
console.log(count ?? 10); // 0
```

`??` only falls back for `null` or `undefined`.

## TypeScript With DOM

```ts
const input = document.querySelector<HTMLInputElement>('#name');

if (input) {
  console.log(input.value);
}
```

Prefer checking for `null` over using `!`.

## TypeScript With React Props

```tsx
type ButtonProps = {
  label: string;
  disabled?: boolean;
  onClick: () => void;
};

function Button({ label, disabled = false, onClick }: ButtonProps) {
  return (
    <button disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
}
```

## Generic React Component Example

```tsx
type ListProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
};

function List<T>({ items, renderItem }: ListProps<T>) {
  return <ul>{items.map((item, index) => <li key={index}>{renderItem(item)}</li>)}</ul>;
}
```

## Common TypeScript Interview Questions

### What is the difference between any and unknown?

`any` disables type checking.

`unknown` forces type checking before use.

### What is the difference between type and interface?

`interface` is good for object shapes and supports declaration merging.

`type` is more flexible for unions, intersections, and computed types.

### What are generics?

Generics let us write reusable code while preserving type information.

### What is type narrowing?

Type narrowing is checking a value so TypeScript can treat it as a more specific type.

### What is never?

`never` represents a value that cannot exist, often used for functions that throw or exhaustive checks.

### What is structural typing?

TypeScript checks if types have the same shape, not whether they have the same name.

### What is a utility type?

Utility types are built-in helpers like `Partial`, `Pick`, `Omit`, `Readonly`, `Record`, and `ReturnType`.

## Common Mistakes

Using `any` everywhere:

```ts
let data: any;
```

Better:

```ts
let data: unknown;
```

Using non-null assertion too much:

```ts
const input = document.querySelector('#name')!;
```

Better:

```ts
const input = document.querySelector('#name');

if (input) {
  console.log(input);
}
```

Forgetting that types do not exist at runtime:

```ts
type User = {
  name: string;
};
```

`User` is removed after compilation.

Interview line:

> TypeScript types are compile-time only. They do not exist at runtime.

## Quick Memory

```txt
any = disables safety
unknown = safe any
never = impossible value
void = no useful return
type = flexible alias
interface = object shape, mergeable
union = A or B
intersection = A and B
generic = reusable type variable
keyof = keys of object type
typeof = type from value
as const = literal readonly type
satisfies = validates without widening too much
Partial = all optional
Pick = choose keys
Omit = remove keys
Record = object from keys
ReturnType = function return type
strict = better safety
```

## Best Interview Answer Format

Use this:

```txt
Definition
Small example
Why it is useful
One warning or edge case
```

Example:

```txt
Generics let us write reusable typed functions.
For example, identity<T>(value: T): T returns the same type it receives.
This is useful when the function should work with many types but still preserve type safety.
The warning is not to overuse generics when a simple type is enough.
```
