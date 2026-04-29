# TypeScript Senior Interview Guide

This README is a topic-wise TypeScript guide for 5-10 year senior engineers.

The goal is not only to remember syntax. The goal is to explain tradeoffs, design maintainable types, debug type issues, and use TypeScript safely in large production codebases.

Also read:

- [TypeScript Programs Folder](./programs)
- [TypeScript Coding Programs](./typescript-coding-programs.md)
- [TypeScript Concepts Cheatsheet](./typescript-concepts-cheatsheet.md)

## Table Of Contents

1. TypeScript fundamentals
2. Type inference and annotations
3. Primitive and special types
4. Arrays, tuples, and readonly data
5. Object types
6. Type aliases vs interfaces
7. Functions
8. Union and intersection types
9. Type narrowing
10. Discriminated unions
11. Generics
12. Generic constraints
13. `keyof`, `typeof`, and indexed access types
14. Mapped types
15. Conditional types
16. Template literal types
17. Utility types
18. Classes and OOP
19. Access modifiers
20. Abstract classes
21. Enums and enum alternatives
22. Literal types, `as const`, and `satisfies`
23. Type guards and assertion functions
24. Error handling
25. Async TypeScript
26. Modules and imports
27. Declaration files
28. Ambient types
29. Runtime validation
30. `tsconfig` essentials
31. Strict mode
32. Advanced compiler options
33. Structural typing
34. Variance
35. Function overloads
36. Type-level design patterns
37. API response typing
38. React TypeScript patterns
39. Node.js TypeScript patterns
40. Library design
41. Monorepos and project references
42. Migration from JavaScript
43. Testing TypeScript
44. Common senior interview questions
45. Senior-level best practices

## 1. TypeScript Fundamentals

TypeScript is JavaScript with a static type system.

It does not change JavaScript runtime behavior. TypeScript checks code at build time, then emits JavaScript.

```ts
const username: string = 'Sumit';
const score: number = 95;
```

Interview line:

> TypeScript helps catch many errors before runtime, improves refactoring confidence, and documents intent through types.

Important senior point:

TypeScript types disappear at runtime.

```ts
type User = {
  id: string;
  name: string;
};

// At runtime, User does not exist.
```

So TypeScript cannot validate external data by itself. API responses, files, local storage, and user input still need runtime validation.

## 2. Type Inference And Annotations

TypeScript can infer many types.

```ts
const name = 'Sumit'; // string
const age = 30; // number
const isActive = true; // boolean
```

Use explicit annotations when they improve readability, define public contracts, or prevent wrong inference.

```ts
function calculateTotal(price: number, tax: number): number {
  return price + tax;
}
```

Avoid unnecessary annotations:

```ts
const count: number = 10; // unnecessary in most cases
```

Useful annotation:

```ts
type User = {
  id: string;
  name: string;
};

const user: User = {
  id: 'u1',
  name: 'Sumit',
};
```

Senior rule:

Use inference for local implementation details. Use explicit types for boundaries: function parameters, API models, exported values, public components, and library APIs.

## 3. Primitive And Special Types

Primitive types:

```ts
let title: string = 'Engineer';
let count: number = 10;
let enabled: boolean = true;
let empty: null = null;
let missing: undefined = undefined;
let large: bigint = 100n;
let key: symbol = Symbol('key');
```

### `any`

`any` disables type checking.

```ts
let value: any = 10;
value.toUpperCase(); // no compile error, possible runtime error
```

Senior explanation:

> `any` is an escape hatch. It spreads unsafety because values derived from `any` are also weakly checked.

### `unknown`

`unknown` is safer than `any`.

```ts
function printValue(value: unknown) {
  if (typeof value === 'string') {
    console.log(value.toUpperCase());
  }
}
```

Use `unknown` for untrusted data.

```ts
async function parseResponse(response: Response): Promise<unknown> {
  return response.json();
}
```

### `never`

`never` represents impossible values.

```ts
function fail(message: string): never {
  throw new Error(message);
}
```

It is useful for exhaustive checks.

```ts
type Status = 'loading' | 'success' | 'error';

function renderStatus(status: Status) {
  switch (status) {
    case 'loading':
      return 'Loading';
    case 'success':
      return 'Success';
    case 'error':
      return 'Error';
    default: {
      const exhaustiveCheck: never = status;
      return exhaustiveCheck;
    }
  }
}
```

### `void`

`void` means the return value is intentionally ignored.

```ts
function log(message: string): void {
  console.log(message);
}
```

## 4. Arrays, Tuples, And Readonly Data

Arrays:

```ts
const numbers: number[] = [1, 2, 3];
const names: Array<string> = ['Amit', 'Sumit'];
```

Tuples:

```ts
const entry: [string, number] = ['age', 30];
```

Named tuple elements improve readability.

```ts
type ApiResult = [statusCode: number, body: string];

const result: ApiResult = [200, 'OK'];
```

Readonly arrays:

```ts
function sum(numbers: readonly number[]) {
  return numbers.reduce((total, current) => total + current, 0);
}
```

Senior point:

Use `readonly` for function inputs when mutation is not required. It communicates intent and prevents accidental side effects.

## 5. Object Types

```ts
type User = {
  id: string;
  name: string;
  email?: string;
  readonly createdAt: Date;
};
```

Optional property:

```ts
email?: string;
```

Readonly property:

```ts
readonly createdAt: Date;
```

Index signature:

```ts
type StringMap = {
  [key: string]: string;
};
```

Prefer `Record` for simple maps:

```ts
type UserById = Record<string, User>;
```

## 6. Type Aliases Vs Interfaces

Both can describe object shapes.

```ts
interface User {
  id: string;
  name: string;
}

type Product = {
  id: string;
  price: number;
};
```

Interfaces can be extended:

```ts
interface Employee extends User {
  employeeId: string;
}
```

Types can compose unions, intersections, primitives, tuples, and conditional types:

```ts
type Id = string | number;
type ApiState = 'idle' | 'loading' | 'success' | 'error';
```

Declaration merging works with interfaces:

```ts
interface Window {
  appVersion: string;
}
```

Senior answer:

> Use either consistently for object models. Prefer `type` for unions and advanced composition. Prefer `interface` when you want declaration merging or a class-style public contract.

## 7. Functions

Function parameters and return types:

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

Function type:

```ts
type Comparator<T> = (a: T, b: T) => number;
```

Optional parameter:

```ts
function greet(name?: string) {
  return `Hello ${name ?? 'Guest'}`;
}
```

Default parameter:

```ts
function createPage(page = 1, limit = 20) {
  return { page, limit };
}
```

Rest parameter:

```ts
function sum(...numbers: number[]) {
  return numbers.reduce((total, current) => total + current, 0);
}
```

Callback typing:

```ts
function mapItems<T, R>(items: T[], mapper: (item: T) => R): R[] {
  return items.map(mapper);
}
```

## 8. Union And Intersection Types

Union means one of many.

```ts
type Id = string | number;
```

Intersection means combined shape.

```ts
type Auditable = {
  createdAt: Date;
  updatedAt: Date;
};

type User = {
  id: string;
  name: string;
};

type AuditedUser = User & Auditable;
```

Senior warning:

Intersections of incompatible properties can produce `never`.

```ts
type A = { id: string };
type B = { id: number };

type C = A & B;
// C['id'] is never
```

## 9. Type Narrowing

TypeScript narrows union types using runtime checks.

```ts
function formatId(id: string | number) {
  if (typeof id === 'string') {
    return id.toUpperCase();
  }

  return id.toFixed(0);
}
```

Common narrowing tools:

- `typeof`
- `instanceof`
- `in`
- equality checks
- discriminant fields
- custom type guards

```ts
type Admin = { role: 'admin'; permissions: string[] };
type Member = { role: 'member'; teamId: string };

function getAccess(user: Admin | Member) {
  if ('permissions' in user) {
    return user.permissions;
  }

  return [user.teamId];
}
```

## 10. Discriminated Unions

Discriminated unions are one of the most important TypeScript patterns.

```ts
type RequestState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: string[] }
  | { status: 'error'; error: string };

function render(state: RequestState) {
  switch (state.status) {
    case 'idle':
      return 'Start';
    case 'loading':
      return 'Loading';
    case 'success':
      return state.data.join(', ');
    case 'error':
      return state.error;
  }
}
```

Why it is senior-level important:

- prevents invalid states
- improves exhaustive checking
- makes UI and async state safer
- avoids many optional fields

Bad model:

```ts
type BadState = {
  loading?: boolean;
  data?: string[];
  error?: string;
};
```

Good model:

```ts
type GoodState =
  | { status: 'loading' }
  | { status: 'success'; data: string[] }
  | { status: 'error'; error: string };
```

## 11. Generics

Generics allow reusable types while preserving specific information.

```ts
function identity<T>(value: T): T {
  return value;
}

const result = identity('hello'); // string
```

Generic array helper:

```ts
function first<T>(items: T[]): T | undefined {
  return items[0];
}
```

Generic interface:

```ts
interface ApiResponse<T> {
  data: T;
  status: number;
}

type UserResponse = ApiResponse<{ id: string; name: string }>;
```

Senior explanation:

> Generics should preserve relationships between input and output types. If a generic does not connect multiple positions, it may be unnecessary.

Bad generic:

```ts
function parse<T>(value: string): T {
  return JSON.parse(value);
}
```

This is unsafe because TypeScript trusts the caller.

Better:

```ts
function parseJson(value: string): unknown {
  return JSON.parse(value);
}
```

Then validate the result.

## 12. Generic Constraints

Use constraints when the generic must have certain properties.

```ts
function getId<T extends { id: string }>(item: T): string {
  return item.id;
}
```

Preserve the full input type:

```ts
function markActive<T extends { id: string }>(item: T): T & { active: true } {
  return { ...item, active: true };
}
```

Multiple generic parameters:

```ts
function getProperty<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key];
}

const user = { id: 'u1', name: 'Sumit' };
const name = getProperty(user, 'name'); // string
```

## 13. `keyof`, `typeof`, And Indexed Access Types

### `keyof`

```ts
type User = {
  id: string;
  name: string;
};

type UserKey = keyof User; // 'id' | 'name'
```

### `typeof`

Use `typeof` to derive a type from a value.

```ts
const config = {
  apiUrl: 'https://api.example.com',
  retryCount: 3,
};

type Config = typeof config;
```

### Indexed Access

```ts
type UserName = User['name']; // string
```

Useful with arrays:

```ts
const roles = ['admin', 'member', 'guest'] as const;

type Role = (typeof roles)[number]; // 'admin' | 'member' | 'guest'
```

## 14. Mapped Types

Mapped types transform properties.

```ts
type User = {
  id: string;
  name: string;
  active: boolean;
};

type OptionalUser = {
  [K in keyof User]?: User[K];
};
```

Readonly mapped type:

```ts
type ReadonlyUser = {
  readonly [K in keyof User]: User[K];
};
```

Rename keys with `as`:

```ts
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type UserGetters = Getters<User>;
```

## 15. Conditional Types

Conditional types choose a type based on another type.

```ts
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false
```

Extract array item:

```ts
type ArrayItem<T> = T extends Array<infer Item> ? Item : never;

type User = ArrayItem<{ id: string }[]>; // { id: string }
```

Senior point:

Conditional types distribute over unions.

```ts
type ToArray<T> = T extends unknown ? T[] : never;

type Result = ToArray<string | number>; // string[] | number[]
```

Disable distribution by wrapping in a tuple:

```ts
type ToArrayNonDistributed<T> = [T] extends [unknown] ? T[] : never;

type Result = ToArrayNonDistributed<string | number>; // (string | number)[]
```

## 16. Template Literal Types

Template literal types build string types.

```ts
type EventName = 'click' | 'change';
type HandlerName = `on${Capitalize<EventName>}`;
// 'onClick' | 'onChange'
```

Useful for strongly typed events:

```ts
type Entity = 'user' | 'order';
type Action = 'created' | 'deleted';

type EventType = `${Entity}.${Action}`;
// 'user.created' | 'user.deleted' | 'order.created' | 'order.deleted'
```

## 17. Utility Types

Common built-in utility types:

```ts
type User = {
  id: string;
  name: string;
  email?: string;
  password: string;
};
```

### `Partial<T>`

```ts
type UserPatch = Partial<User>;
```

### `Required<T>`

```ts
type CompleteUser = Required<User>;
```

### `Pick<T, K>`

```ts
type PublicUser = Pick<User, 'id' | 'name'>;
```

### `Omit<T, K>`

```ts
type SafeUser = Omit<User, 'password'>;
```

### `Record<K, T>`

```ts
type UsersById = Record<string, User>;
```

### `ReturnType<T>`

```ts
function createUser() {
  return { id: 'u1', name: 'Sumit' };
}

type CreatedUser = ReturnType<typeof createUser>;
```

### `Parameters<T>`

```ts
type CreateUserParams = Parameters<typeof createUser>;
```

### `Awaited<T>`

```ts
type Data = Awaited<Promise<string>>; // string
```

Senior point:

Utility types are powerful, but excessive type transformation can make code harder to read. Use named domain types at boundaries.

## 18. Classes And OOP

```ts
class UserService {
  constructor(private readonly baseUrl: string) {}

  async getUser(id: string): Promise<User> {
    const response = await fetch(`${this.baseUrl}/users/${id}`);
    return response.json();
  }
}
```

TypeScript supports:

- classes
- inheritance
- access modifiers
- abstract classes
- interfaces implemented by classes
- parameter properties

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

Senior point:

TypeScript does not require OOP. Many codebases use functional composition, plain objects, and interfaces instead of deep inheritance.

## 19. Access Modifiers

```ts
class Account {
  public id: string;
  protected balance: number;
  private secret: string;

  constructor(id: string, balance: number, secret: string) {
    this.id = id;
    this.balance = balance;
    this.secret = secret;
  }
}
```

Parameter property shorthand:

```ts
class Account {
  constructor(
    public readonly id: string,
    protected balance: number,
    private readonly secret: string,
  ) {}
}
```

`private` is TypeScript-only privacy.

JavaScript private fields use `#`.

```ts
class Session {
  #token: string;

  constructor(token: string) {
    this.#token = token;
  }
}
```

## 20. Abstract Classes

Abstract classes provide shared behavior and incomplete methods.

```ts
abstract class Repository<T> {
  abstract findById(id: string): Promise<T | null>;

  async exists(id: string): Promise<boolean> {
    return (await this.findById(id)) !== null;
  }
}
```

Use abstract classes when you need shared implementation.

Use interfaces when you only need a contract.

## 21. Enums And Enum Alternatives

Numeric enum:

```ts
enum Role {
  Admin,
  Member,
  Guest,
}
```

String enum:

```ts
enum Status {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}
```

Many modern TypeScript teams prefer union literals:

```ts
type Status = 'active' | 'inactive';
```

Or const objects:

```ts
const Status = {
  Active: 'active',
  Inactive: 'inactive',
} as const;

type Status = (typeof Status)[keyof typeof Status];
```

Senior answer:

> String unions often work better than enums because they are simple, tree-shakable, and align with API string values. Enums are still useful when a team wants named runtime objects.

## 22. Literal Types, `as const`, And `satisfies`

Literal type:

```ts
let direction: 'left' | 'right' = 'left';
```

`as const` preserves exact literal values and makes nested fields readonly.

```ts
const routes = {
  home: '/',
  users: '/users',
} as const;

type Route = (typeof routes)[keyof typeof routes];
```

`satisfies` checks shape without widening the value too much.

```ts
type RouteConfig = Record<string, { path: string; authRequired: boolean }>;

const routeConfig = {
  home: { path: '/', authRequired: false },
  dashboard: { path: '/dashboard', authRequired: true },
} satisfies RouteConfig;
```

Difference:

```ts
const value1: RouteConfig = {
  home: { path: '/', authRequired: false },
};

const value2 = {
  home: { path: '/', authRequired: false },
} satisfies RouteConfig;
```

`value1` is typed as the broader `RouteConfig`.

`value2` keeps more specific information about its own keys.

## 23. Type Guards And Assertion Functions

Custom type guard:

```ts
type User = {
  id: string;
  name: string;
};

function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value
  );
}
```

Usage:

```ts
const value: unknown = { id: 'u1', name: 'Sumit' };

if (isUser(value)) {
  console.log(value.name);
}
```

Assertion function:

```ts
function assertUser(value: unknown): asserts value is User {
  if (!isUser(value)) {
    throw new Error('Invalid user');
  }
}
```

Use assertion functions when invalid data should stop execution.

## 24. Error Handling

With `useUnknownInCatchVariables`, catch variables are `unknown`.

```ts
try {
  throw new Error('Failed');
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}
```

Typed result pattern:

```ts
type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

async function getUser(id: string): Promise<Result<User>> {
  try {
    const response = await fetch(`/users/${id}`);
    const user = (await response.json()) as User;
    return { ok: true, value: user };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}
```

Senior point:

Typed errors are often modeled with discriminated unions rather than relying only on thrown exceptions.

## 25. Async TypeScript

Promise return type:

```ts
async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/users/${id}`);
  return response.json();
}
```

Parallel async:

```ts
const [user, orders] = await Promise.all([
  fetchUser('u1'),
  fetchOrders('u1'),
]);
```

Typing async result:

```ts
type FetchUserResult = Awaited<ReturnType<typeof fetchUser>>;
```

Senior warning:

`response.json()` returns `any` in many environments. Treat it as untrusted and validate at the boundary.

## 26. Modules And Imports

Named export:

```ts
export function add(a: number, b: number) {
  return a + b;
}
```

Named import:

```ts
import { add } from './math';
```

Type-only import:

```ts
import type { User } from './types';
```

Why type-only imports matter:

- clearer intent
- avoids accidental runtime imports
- helps bundlers and compiler options

Default export:

```ts
export default class UserService {}
```

Senior point:

Large teams often prefer named exports because they improve refactoring and discoverability.

## 27. Declaration Files

Declaration files describe types for JavaScript code.

```ts
// analytics.d.ts
declare module 'legacy-analytics' {
  export function track(event: string, data?: Record<string, unknown>): void;
}
```

Global declaration:

```ts
declare global {
  interface Window {
    analytics: {
      track(event: string): void;
    };
  }
}
```

Use declaration files when:

- a package has no types
- exposing global variables
- typing legacy JavaScript modules

## 28. Ambient Types

Ambient declarations tell TypeScript something exists at runtime.

```ts
declare const __APP_VERSION__: string;

console.log(__APP_VERSION__);
```

Important:

Ambient declarations do not create runtime values. They only describe them.

## 29. Runtime Validation

TypeScript cannot guarantee the shape of external data.

Unsafe:

```ts
const user = (await response.json()) as User;
```

This only tells TypeScript to trust you.

Safer:

```ts
function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as { id?: unknown }).id === 'string' &&
    typeof (value as { name?: unknown }).name === 'string'
  );
}

const data: unknown = await response.json();

if (!isUser(data)) {
  throw new Error('Invalid user response');
}

console.log(data.name);
```

In production, teams often use validation libraries such as Zod, Valibot, Yup, io-ts, or custom validators.

Senior answer:

> TypeScript checks compile-time assumptions. Runtime validation protects boundaries where data comes from outside the program.

## 30. `tsconfig` Essentials

Common options:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true
  }
}
```

Important options:

- `target`: JavaScript version emitted
- `module`: module format
- `moduleResolution`: how imports are resolved
- `strict`: enables strong type checking
- `noEmit`: type-check only
- `declaration`: emit `.d.ts` files for libraries
- `sourceMap`: generate source maps
- `baseUrl` and `paths`: import aliases

## 31. Strict Mode

Enable strict mode for serious TypeScript projects.

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

Important strict checks:

- `strictNullChecks`
- `noImplicitAny`
- `strictFunctionTypes`
- `strictBindCallApply`
- `strictPropertyInitialization`
- `noImplicitThis`
- `alwaysStrict`
- `useUnknownInCatchVariables`

### `strictNullChecks`

Without this, `null` and `undefined` can sneak into many places.

```ts
function getLength(value: string | undefined) {
  return value?.length ?? 0;
}
```

Senior point:

`strictNullChecks` is one of the biggest practical safety improvements in TypeScript.

## 32. Advanced Compiler Options

Useful options for senior-level projects:

```json
{
  "compilerOptions": {
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "noFallthroughCasesInSwitch": true,
    "noPropertyAccessFromIndexSignature": true
  }
}
```

### `noUncheckedIndexedAccess`

Array or object indexing may return `undefined`.

```ts
const names = ['Amit'];
const first = names[0]; // string | undefined
```

### `exactOptionalPropertyTypes`

Optional does not automatically mean the value can be explicitly `undefined`.

```ts
type User = {
  email?: string;
};
```

This option makes optional property modeling more precise.

### `noImplicitOverride`

Requires `override` when overriding class methods.

```ts
class Base {
  save(): void {}
}

class Child extends Base {
  override save(): void {}
}
```

## 33. Structural Typing

TypeScript is structurally typed.

If two values have the same shape, they are compatible.

```ts
type User = {
  id: string;
  name: string;
};

type Customer = {
  id: string;
  name: string;
};

const customer: Customer = { id: 'c1', name: 'Amit' };
const user: User = customer; // allowed
```

This is different from nominal typing, where names matter.

Nominal-like branding:

```ts
type UserId = string & { readonly brand: unique symbol };

function createUserId(value: string): UserId {
  return value as UserId;
}

function getUser(id: UserId) {
  return id;
}

const id = createUserId('u1');
getUser(id);
```

Use branding when two primitive values have the same runtime type but different business meaning.

## 34. Variance

Variance describes how generic types relate when their type parameters relate.

Example:

```ts
type Animal = { name: string };
type Dog = Animal & { bark(): void };
```

Covariance:

```ts
const dogs: Dog[] = [];
const animals: Animal[] = dogs;
```

Function parameter positions are more sensitive.

```ts
type Handler<T> = (value: T) => void;

const animalHandler: Handler<Animal> = (animal) => {
  console.log(animal.name);
};

const dogHandler: Handler<Dog> = (dog) => {
  dog.bark();
};
```

Senior explanation:

> Return types are generally covariant. Function parameters are checked contravariantly under `strictFunctionTypes`, because accepting a narrower parameter where a broader one is expected can be unsafe.

Practical interview example:

```ts
function callWithAnimal(handler: Handler<Animal>) {
  handler({ name: 'Generic animal' });
}

// Unsafe:
// callWithAnimal(dogHandler);
```

The function might pass an animal that is not a dog.

## 35. Function Overloads

Overloads describe multiple call signatures.

```ts
function format(value: string): string;
function format(value: number): string;
function format(value: string | number): string {
  if (typeof value === 'number') {
    return value.toFixed(2);
  }

  return value.trim();
}
```

Use overloads when return type depends on input shape.

```ts
function getValue(key: 'name'): string;
function getValue(key: 'age'): number;
function getValue(key: 'name' | 'age') {
  const data = {
    name: 'Sumit',
    age: 30,
  };

  return data[key];
}
```

Do not overuse overloads when a union or generic is simpler.

## 36. Type-Level Design Patterns

### Typed Event Emitter

```ts
type Events = {
  login: { userId: string };
  logout: { userId: string };
  error: { message: string };
};

class EventEmitter<TEvents extends Record<keyof TEvents, unknown>> {
  private listeners: {
    [K in keyof TEvents]?: Array<(payload: TEvents[K]) => void>;
  } = {};

  on<K extends keyof TEvents>(event: K, listener: (payload: TEvents[K]) => void) {
    this.listeners[event] ??= [];
    this.listeners[event]?.push(listener);
  }

  emit<K extends keyof TEvents>(event: K, payload: TEvents[K]) {
    this.listeners[event]?.forEach((listener) => listener(payload));
  }
}

const emitter = new EventEmitter<Events>();

emitter.on('login', (payload) => {
  console.log(payload.userId);
});

emitter.emit('login', { userId: 'u1' });
```

### Type-Safe State Machine

```ts
type State =
  | { type: 'idle' }
  | { type: 'loading' }
  | { type: 'success'; data: string[] }
  | { type: 'failure'; error: string };

type Action =
  | { type: 'fetch' }
  | { type: 'resolve'; data: string[] }
  | { type: 'reject'; error: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'fetch':
      return { type: 'loading' };
    case 'resolve':
      return { type: 'success', data: action.data };
    case 'reject':
      return { type: 'failure', error: action.error };
    default:
      return state;
  }
}
```

### Branded Types

```ts
type Brand<T, TBrand extends string> = T & { readonly __brand: TBrand };

type OrderId = Brand<string, 'OrderId'>;
type UserId = Brand<string, 'UserId'>;

function getOrder(id: OrderId) {
  return id;
}
```

## 37. API Response Typing

Basic API response:

```ts
type ApiResponse<T> = {
  data: T;
  meta: {
    requestId: string;
  };
};
```

Paginated response:

```ts
type PaginatedResponse<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
};
```

Discriminated API result:

```ts
type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; message: string };

function handleResult<T>(result: ApiResult<T>) {
  if (result.ok) {
    return result.data;
  }

  throw new Error(result.message);
}
```

Senior point:

Model success and failure explicitly. Avoid making every property optional because that creates invalid states.

## 38. React TypeScript Patterns

Props:

```tsx
type ButtonProps = {
  label: string;
  disabled?: boolean;
  onClick(): void;
};

function Button({ label, disabled = false, onClick }: ButtonProps) {
  return (
    <button disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
}
```

Children:

```tsx
import type { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
};
```

Event handler:

```tsx
function SearchInput() {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);
  }

  return <input onChange={handleChange} />;
}
```

Generic component:

```tsx
type SelectProps<T> = {
  items: T[];
  getLabel(item: T): string;
  onSelect(item: T): void;
};

function Select<T>({ items, getLabel, onSelect }: SelectProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          <button onClick={() => onSelect(item)}>{getLabel(item)}</button>
        </li>
      ))}
    </ul>
  );
}
```

Senior React TypeScript tips:

- avoid `React.FC` unless the team standard uses it
- type props explicitly
- use discriminated unions for variant components
- avoid passing broad `any` through component trees
- type server data at the boundary

## 39. Node.js TypeScript Patterns

Typed environment variables:

```ts
type AppConfig = {
  port: number;
  databaseUrl: string;
};

function loadConfig(env: NodeJS.ProcessEnv): AppConfig {
  const databaseUrl = env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is required');
  }

  return {
    port: Number(env.PORT ?? 3000),
    databaseUrl,
  };
}
```

Typed Express request:

```ts
type Params = {
  id: string;
};

app.get('/users/:id', (req: Request<Params>, res: Response) => {
  res.json({ id: req.params.id });
});
```

Senior Node point:

Validate request body, query params, headers, environment variables, and external service responses at runtime.

## 40. Library Design

Good library types should:

- infer common cases
- allow explicit generics when needed
- expose stable public types
- avoid leaking internal implementation types
- generate declaration files

Example:

```ts
export type ClientOptions = {
  baseUrl: string;
  timeoutMs?: number;
};

export class ApiClient {
  constructor(private readonly options: ClientOptions) {}

  async get<T>(path: string): Promise<T> {
    const response = await fetch(`${this.options.baseUrl}${path}`);
    return response.json();
  }
}
```

Better with unknown boundary:

```ts
export class ApiClient {
  constructor(private readonly options: ClientOptions) {}

  async get(path: string): Promise<unknown> {
    const response = await fetch(`${this.options.baseUrl}${path}`);
    return response.json();
  }
}
```

Senior tradeoff:

Returning generic `T` from HTTP clients is convenient but can create false confidence. Safer clients pair generics with validation schemas.

## 41. Monorepos And Project References

Project references help large TypeScript codebases build incrementally.

Root config:

```json
{
  "files": [],
  "references": [
    { "path": "./packages/shared" },
    { "path": "./packages/api" },
    { "path": "./packages/web" }
  ]
}
```

Package config:

```json
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "declarationMap": true
  }
}
```

Senior point:

Project references improve build performance and make package boundaries explicit.

## 42. Migration From JavaScript

Practical migration path:

1. Add TypeScript tooling.
2. Enable `allowJs`.
3. Start with `checkJs` or migrate files gradually.
4. Type public boundaries first.
5. Replace `any` with `unknown` where data is untrusted.
6. Enable strict options gradually.
7. Add runtime validation at external boundaries.

Example config:

```json
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": false,
    "strict": false
  }
}
```

Senior migration answer:

> I would not start by typing every line. I would type the boundaries, fix the most valuable shared modules, and turn on stricter checks incrementally.

## 43. Testing TypeScript

Runtime tests still matter.

TypeScript does not test behavior.

```ts
function add(a: number, b: number) {
  return a + b;
}
```

Unit test:

```ts
expect(add(2, 3)).toBe(5);
```

Type tests can verify library APIs.

```ts
import { expectTypeOf } from 'expect-type';

expectTypeOf(add(1, 2)).toEqualTypeOf<number>();
```

Senior point:

Use normal tests for behavior. Use type tests for complex reusable types, public libraries, and framework-level utilities.

## 44. Common Senior Interview Questions

### What is the difference between `any` and `unknown`?

`any` disables checking. `unknown` forces narrowing before use.

### What is the difference between `type` and `interface`?

Both can model objects. Interfaces support declaration merging and class contracts. Type aliases support unions, tuples, primitives, mapped types, and conditional types.

### What is structural typing?

Type compatibility is based on shape, not type name.

### What is a discriminated union?

A union where each member has a common literal field used for narrowing.

### Why is `as` dangerous?

`as` is a type assertion. It tells TypeScript to trust you without changing runtime behavior.

### How do you type API data safely?

Return `unknown` from the boundary, validate it at runtime, then narrow it to a domain type.

### What is `never` used for?

Impossible values, throwing functions, and exhaustive checks.

### What is `satisfies` used for?

It checks that a value conforms to a type while preserving specific inferred types.

### What is the difference between compile-time and runtime?

TypeScript checks compile-time types. JavaScript runs at runtime. Types do not exist at runtime unless represented as actual values.

### When would you use generics?

When the type of one value depends on another value and you want to preserve that relationship.

## 45. Senior-Level Best Practices

Prefer:

- `unknown` over `any`
- discriminated unions over many optional fields
- strict mode for production projects
- type-only imports for types
- runtime validation at external boundaries
- explicit public API types
- `readonly` inputs when mutation is unnecessary
- simple named types over overly clever type programming
- branded types for important IDs
- `satisfies` for config objects

Avoid:

- broad `any`
- unsafe `as` assertions
- making every property optional
- deep inheritance trees
- exporting internal helper types unnecessarily
- overusing enums when string unions are enough
- type-level code that the team cannot maintain

Senior interview closing line:

> Good TypeScript is not about writing the most complex types. It is about modeling the domain accurately, making invalid states hard to represent, and keeping runtime boundaries honest.
