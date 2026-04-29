# TypeScript Coding Programs For Senior Interviews

This file contains commonly asked TypeScript coding programs and type-system exercises for senior frontend, full-stack, and Node.js interviews.

Focus areas companies usually test:

- generics
- `keyof`, `typeof`, indexed access
- utility types
- custom type utilities
- type guards
- discriminated unions
- async helpers
- typed data structures
- API boundary safety
- practical reusable functions

## How To Practice

For each problem, practice saying:

1. What problem are we solving?
2. What type relationship should TypeScript preserve?
3. What are the runtime edge cases?
4. What is the complexity?
5. Where can this become unsafe?

## 1. Generic Identity Function

Asked to check basic generic understanding.

```ts
function identity<T>(value: T): T {
  return value;
}

const a = identity(10); // number
const b = identity('hello'); // string
```

Interview explanation:

Generics preserve the input type instead of losing it with `any`.

## 2. Get Object Property Safely

Commonly asked for `keyof` and indexed access.

```ts
function getProperty<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key];
}

const user = {
  id: 'u1',
  name: 'Sumit',
  age: 30,
};

const name = getProperty(user, 'name'); // string
const age = getProperty(user, 'age'); // number

// getProperty(user, 'email'); // Error
```

Key point:

`K extends keyof T` ensures the key exists on the object.

## 3. Set Object Property Safely

```ts
function setProperty<T, K extends keyof T>(
  object: T,
  key: K,
  value: T[K],
): T {
  return {
    ...object,
    [key]: value,
  };
}

const updatedUser = setProperty(user, 'age', 31);

// setProperty(user, 'age', '31'); // Error
```

Senior point:

The value type depends on the selected key.

## 4. Generic Stack

Classic data structure with generics.

```ts
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  get size(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

const stack = new Stack<number>();
stack.push(10);
stack.push(20);
console.log(stack.pop()); // 20
```

Complexity:

- `push`: O(1)
- `pop`: O(1)
- `peek`: O(1)

## 5. Generic Queue

```ts
class Queue<T> {
  private items: T[] = [];
  private head = 0;

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    if (this.head >= this.items.length) {
      return undefined;
    }

    const item = this.items[this.head];
    this.head += 1;

    if (this.head > 50 && this.head * 2 > this.items.length) {
      this.items = this.items.slice(this.head);
      this.head = 0;
    }

    return item;
  }

  get size(): number {
    return this.items.length - this.head;
  }
}
```

Senior point:

Avoid `Array.shift()` for queues because it is O(n).

## 6. Custom `Pick`

Type-level coding problem.

```ts
type MyPick<T, K extends keyof T> = {
  [Key in K]: T[Key];
};

type User = {
  id: string;
  name: string;
  email: string;
};

type PublicUser = MyPick<User, 'id' | 'name'>;
```

Explanation:

Mapped types iterate over selected keys.

## 7. Custom `Omit`

```ts
type MyOmit<T, K extends keyof T> = {
  [Key in keyof T as Key extends K ? never : Key]: T[Key];
};

type UserWithoutEmail = MyOmit<User, 'email'>;
```

Alternative:

```ts
type MyOmit2<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
```

Senior point:

`never` removes keys in mapped type key remapping.

## 8. Custom `Readonly`

```ts
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

type ReadonlyUser = MyReadonly<User>;
```

## 9. Custom `Partial`

```ts
type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

type UserPatch = MyPartial<User>;
```

## 10. Custom `Required`

```ts
type MyRequired<T> = {
  [K in keyof T]-?: T[K];
};

type CompleteUser = MyRequired<{
  id?: string;
  name?: string;
}>;
```

Key point:

`-?` removes the optional modifier.

## 11. Deep Partial

Frequently asked at senior level.

```ts
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

type Config = {
  api: {
    baseUrl: string;
    retry: {
      count: number;
      delayMs: number;
    };
  };
};

type ConfigPatch = DeepPartial<Config>;
```

Better version that avoids recursing into functions:

```ts
type DeepPartialSafe<T> = T extends (...args: never[]) => unknown
  ? T
  : T extends object
    ? { [K in keyof T]?: DeepPartialSafe<T[K]> }
    : T;
```

Senior point:

Recursive types are useful but can become expensive and hard to read.

## 12. Deep Readonly

```ts
type DeepReadonly<T> = T extends (...args: never[]) => unknown
  ? T
  : T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T;
```

Example:

```ts
type AppConfig = DeepReadonly<Config>;
```

## 13. Flatten Array

Runtime problem plus generic return type.

```ts
type NestedArray<T> = Array<T | NestedArray<T>>;

function flatten<T>(items: NestedArray<T>): T[] {
  const result: T[] = [];

  for (const item of items) {
    if (Array.isArray(item)) {
      result.push(...flatten(item));
    } else {
      result.push(item);
    }
  }

  return result;
}

console.log(flatten([1, [2, [3]], 4])); // [1, 2, 3, 4]
```

Complexity:

- Time: O(n)
- Space: O(n)

## 14. Group By

Very common practical coding question.

```ts
function groupBy<T, K extends PropertyKey>(
  items: readonly T[],
  getKey: (item: T) => K,
): Record<K, T[]> {
  return items.reduce(
    (groups, item) => {
      const key = getKey(item);
      groups[key] ??= [];
      groups[key].push(item);
      return groups;
    },
    {} as Record<K, T[]>,
  );
}

const employees = [
  { id: 1, department: 'engineering' },
  { id: 2, department: 'sales' },
  { id: 3, department: 'engineering' },
] as const;

const byDepartment = groupBy(employees, (employee) => employee.department);
```

Senior point:

`PropertyKey` means `string | number | symbol`.

## 15. Unique By

```ts
function uniqueBy<T, K extends PropertyKey>(
  items: readonly T[],
  getKey: (item: T) => K,
): T[] {
  const seen = new Set<K>();
  const result: T[] = [];

  for (const item of items) {
    const key = getKey(item);

    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  }

  return result;
}

const uniqueEmployees = uniqueBy(employees, (employee) => employee.id);
```

Complexity:

- Time: O(n)
- Space: O(n)

## 16. Typed Event Emitter

Asked often for senior frontend and Node.js roles.

```ts
type AppEvents = {
  login: { userId: string };
  logout: { userId: string };
  error: { message: string; code?: string };
};

class TypedEventEmitter<TEvents extends Record<keyof TEvents, unknown>> {
  private listeners: {
    [K in keyof TEvents]?: Array<(payload: TEvents[K]) => void>;
  } = {};

  on<K extends keyof TEvents>(
    event: K,
    listener: (payload: TEvents[K]) => void,
  ): () => void {
    this.listeners[event] ??= [];
    this.listeners[event]?.push(listener);

    return () => this.off(event, listener);
  }

  off<K extends keyof TEvents>(
    event: K,
    listener: (payload: TEvents[K]) => void,
  ): void {
    this.listeners[event] = this.listeners[event]?.filter(
      (currentListener) => currentListener !== listener,
    );
  }

  emit<K extends keyof TEvents>(event: K, payload: TEvents[K]): void {
    this.listeners[event]?.forEach((listener) => listener(payload));
  }
}

const emitter = new TypedEventEmitter<AppEvents>();

emitter.on('login', (payload) => {
  console.log(payload.userId);
});

emitter.emit('login', { userId: 'u1' });
```

Senior point:

The event name controls the payload type.

## 17. LRU Cache

Popular system-design-adjacent coding question.

```ts
class LRUCache<K, V> {
  private cache = new Map<K, V>();

  constructor(private readonly capacity: number) {
    if (capacity <= 0) {
      throw new Error('Capacity must be greater than 0');
    }
  }

  get(key: K): V | undefined {
    if (!this.cache.has(key)) {
      return undefined;
    }

    const value = this.cache.get(key) as V;
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    this.cache.set(key, value);

    if (this.cache.size > this.capacity) {
      const oldestKey = this.cache.keys().next().value as K;
      this.cache.delete(oldestKey);
    }
  }
}

const cache = new LRUCache<string, number>(2);
cache.put('a', 1);
cache.put('b', 2);
cache.get('a');
cache.put('c', 3);

console.log(cache.get('b')); // undefined
```

Complexity:

- `get`: O(1)
- `put`: O(1)

## 18. Debounce

```ts
function debounce<TArgs extends unknown[]>(
  callback: (...args: TArgs) => void,
  delayMs: number,
): (...args: TArgs) => void {
  let timerId: ReturnType<typeof setTimeout> | undefined;

  return (...args: TArgs) => {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      callback(...args);
    }, delayMs);
  };
}

const search = debounce((query: string) => {
  console.log(query);
}, 300);

search('typescript');
```

Senior point:

`TArgs extends unknown[]` preserves the callback argument list.

## 19. Throttle

```ts
function throttle<TArgs extends unknown[]>(
  callback: (...args: TArgs) => void,
  delayMs: number,
): (...args: TArgs) => void {
  let lastRun = 0;

  return (...args: TArgs) => {
    const now = Date.now();

    if (now - lastRun >= delayMs) {
      lastRun = now;
      callback(...args);
    }
  };
}
```

Debounce vs throttle:

- debounce waits until events stop
- throttle runs at most once per interval

## 20. Memoize

```ts
function memoize<TArgs extends unknown[], TResult>(
  callback: (...args: TArgs) => TResult,
  getKey: (...args: TArgs) => string = (...args) => JSON.stringify(args),
): (...args: TArgs) => TResult {
  const cache = new Map<string, TResult>();

  return (...args: TArgs) => {
    const key = getKey(...args);

    if (cache.has(key)) {
      return cache.get(key) as TResult;
    }

    const result = callback(...args);
    cache.set(key, result);
    return result;
  };
}

const add = memoize((a: number, b: number) => a + b);
console.log(add(1, 2)); // 3
```

Senior point:

For object arguments, JSON string keys can be fragile. Production code may need a stronger cache key strategy.

## 21. Custom Promise All

Asked frequently in JavaScript interviews; senior TypeScript version tests tuple inference.

```ts
type AwaitedTuple<T extends readonly unknown[]> = {
  [K in keyof T]: Awaited<T[K]>;
};

function promiseAll<T extends readonly unknown[]>(
  values: readonly [...T],
): Promise<AwaitedTuple<T>> {
  return new Promise((resolve, reject) => {
    const results: unknown[] = [];
    let completed = 0;

    if (values.length === 0) {
      resolve([] as AwaitedTuple<T>);
      return;
    }

    values.forEach((value, index) => {
      Promise.resolve(value)
        .then((result) => {
          results[index] = result;
          completed += 1;

          if (completed === values.length) {
            resolve(results as AwaitedTuple<T>);
          }
        })
        .catch(reject);
    });
  });
}

const result = await promiseAll([
  Promise.resolve(1),
  Promise.resolve('hello'),
  true,
] as const);
// readonly [number, string, boolean]
```

Senior point:

The hard part is preserving tuple positions, not just returning `unknown[]`.

## 22. Retry Async Function

```ts
async function retry<T>(
  operation: () => Promise<T>,
  attempts: number,
  delayMs: number,
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      if (attempt < attempts) {
        await sleep(delayMs);
      }
    }
  }

  throw lastError;
}

function sleep(delayMs: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}
```

Possible follow-up:

Add exponential backoff and retry only for selected errors.

## 23. Limit Concurrency

Common in senior async interviews.

```ts
async function limitConcurrency<T>(
  tasks: Array<() => Promise<T>>,
  limit: number,
): Promise<T[]> {
  const results: T[] = [];
  let nextIndex = 0;

  async function worker(): Promise<void> {
    while (nextIndex < tasks.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      results[currentIndex] = await tasks[currentIndex]();
    }
  }

  const workers = Array.from(
    { length: Math.min(limit, tasks.length) },
    () => worker(),
  );

  await Promise.all(workers);
  return results;
}
```

Senior point:

This preserves output order even though tasks finish at different times.

## 24. Typed Result For Safe JSON Parse

```ts
type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function parseJson(value: string): Result<unknown> {
  try {
    return { ok: true, value: JSON.parse(value) };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error : new Error('Invalid JSON'),
    };
  }
}

const parsed = parseJson('{"name":"Sumit"}');

if (parsed.ok) {
  console.log(parsed.value);
}
```

Senior point:

Do not return generic `T` from `JSON.parse` unless you validate the parsed value.

## 25. User Type Guard

```ts
type UserDto = {
  id: string;
  name: string;
  email?: string;
};

function isUserDto(value: unknown): value is UserDto {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.name === 'string' &&
    (candidate.email === undefined || typeof candidate.email === 'string')
  );
}
```

Usage:

```ts
const data: unknown = await fetch('/api/user').then((response) =>
  response.json(),
);

if (!isUserDto(data)) {
  throw new Error('Invalid user');
}

console.log(data.name);
```

## 26. Assertion Function

```ts
function assertUserDto(value: unknown): asserts value is UserDto {
  if (!isUserDto(value)) {
    throw new Error('Invalid user');
  }
}
```

Usage:

```ts
const payload: unknown = JSON.parse('{"id":"u1","name":"Sumit"}');

assertUserDto(payload);
console.log(payload.id);
```

## 27. Typed API Client

Practical system design plus TypeScript problem.

```ts
type Validator<T> = (value: unknown) => value is T;

class ApiClient {
  constructor(private readonly baseUrl: string) {}

  async get<T>(path: string, validate: Validator<T>): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`);

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const data: unknown = await response.json();

    if (!validate(data)) {
      throw new Error('Invalid API response');
    }

    return data;
  }
}

const api = new ApiClient('https://example.com');
const userFromApi = await api.get('/user/u1', isUserDto);
```

Senior point:

Generic API clients are safer when the generic is connected to a runtime validator.

## 28. Discriminated Union Reducer

```ts
type RequestState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

type RequestAction<T> =
  | { type: 'start' }
  | { type: 'success'; data: T }
  | { type: 'error'; error: string }
  | { type: 'reset' };

function requestReducer<T>(
  state: RequestState<T>,
  action: RequestAction<T>,
): RequestState<T> {
  switch (action.type) {
    case 'start':
      return { status: 'loading' };
    case 'success':
      return { status: 'success', data: action.data };
    case 'error':
      return { status: 'error', error: action.error };
    case 'reset':
      return { status: 'idle' };
    default: {
      const exhaustiveCheck: never = action;
      return exhaustiveCheck;
    }
  }
}
```

Senior point:

This prevents impossible UI states like `{ loading: true, data: [], error: 'failed' }`.

## 29. Compose Functions

```ts
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

console.log(trimAndLength(' hello ')); // 5
```

Senior follow-up:

Typing variadic `compose` is possible but often harder to maintain. In production, prefer readability unless the helper is shared widely.

## 30. Pipe Functions

```ts
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
```

## 31. Curry Function

```ts
function curry<A, B, C>(callback: (a: A, b: B) => C): (a: A) => (b: B) => C {
  return (a: A) => (b: B) => callback(a, b);
}

const addNumbers = curry((a: number, b: number) => a + b);
const addTen = addNumbers(10);

console.log(addTen(5)); // 15
```

## 32. Make Object Values Nullable

```ts
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

type NullableUser = Nullable<User>;
```

## 33. Make Selected Keys Optional

```ts
type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type UserWithOptionalEmail = OptionalKeys<User, 'email'>;
```

## 34. Make Selected Keys Required

```ts
type RequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

type UserWithRequiredEmail = RequiredKeys<
  {
    id: string;
    email?: string;
  },
  'email'
>;
```

## 35. Extract Array Item Type

```ts
type ArrayItem<T> = T extends readonly (infer Item)[] ? Item : never;

type Names = string[];
type Name = ArrayItem<Names>; // string
```

## 36. Extract Promise Value Type

```ts
type PromiseValue<T> = T extends Promise<infer Value> ? Value : T;

type UserPromiseValue = PromiseValue<Promise<User>>; // User
```

Prefer built-in `Awaited<T>` in real projects.

## 37. Branded Types For IDs

```ts
type Brand<T, TBrand extends string> = T & { readonly __brand: TBrand };

type UserId = Brand<string, 'UserId'>;
type OrderId = Brand<string, 'OrderId'>;

function createUserId(value: string): UserId {
  return value as UserId;
}

function findUser(id: UserId) {
  return id;
}

const userId = createUserId('u1');
findUser(userId);

// const orderId = 'o1' as OrderId;
// findUser(orderId); // Error
```

Senior point:

Branding helps prevent mixing IDs that are all strings at runtime.

## 38. Typed Routes

```ts
const routes = {
  home: '/',
  user: '/users/:id',
  settings: '/settings',
} as const;

type RouteName = keyof typeof routes;
type RoutePath = (typeof routes)[RouteName];

function navigate(route: RouteName): RoutePath {
  return routes[route];
}

navigate('home');
// navigate('profile'); // Error
```

## 39. Config With `satisfies`

```ts
type FeatureConfig = Record<
  string,
  {
    enabled: boolean;
    rolloutPercentage: number;
  }
>;

const features = {
  newCheckout: {
    enabled: true,
    rolloutPercentage: 25,
  },
  darkMode: {
    enabled: false,
    rolloutPercentage: 0,
  },
} satisfies FeatureConfig;

type FeatureName = keyof typeof features;
```

Senior point:

`satisfies` checks the contract while preserving exact keys like `'newCheckout' | 'darkMode'`.

## 40. Exhaustive Switch Helper

```ts
function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${String(value)}`);
}

type PaymentStatus = 'pending' | 'paid' | 'failed';

function getPaymentLabel(status: PaymentStatus): string {
  switch (status) {
    case 'pending':
      return 'Pending';
    case 'paid':
      return 'Paid';
    case 'failed':
      return 'Failed';
    default:
      return assertNever(status);
  }
}
```

If a new status is added, TypeScript can force the switch to be updated.

## 41. Parse Query String

```ts
function parseQueryString(query: string): Record<string, string> {
  const params = new URLSearchParams(query.startsWith('?') ? query.slice(1) : query);
  const result: Record<string, string> = {};

  params.forEach((value, key) => {
    result[key] = value;
  });

  return result;
}

console.log(parseQueryString('?page=1&sort=asc'));
```

Senior follow-up:

Support repeated keys by returning `Record<string, string | string[]>`.

## 42. Build Query String

```ts
type QueryValue = string | number | boolean | null | undefined;

function buildQueryString(params: Record<string, QueryValue>): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      searchParams.set(key, String(value));
    }
  });

  return searchParams.toString();
}

console.log(buildQueryString({ page: 1, sort: 'asc', debug: false }));
```

## 43. Deep Clone

```ts
function deepClone<T>(value: T): T {
  if (value === null || typeof value !== 'object') {
    return value;
  }

  if (value instanceof Date) {
    return new Date(value.getTime()) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => deepClone(item)) as T;
  }

  const result: Record<PropertyKey, unknown> = {};

  for (const key of Reflect.ownKeys(value)) {
    result[key] = deepClone((value as Record<PropertyKey, unknown>)[key]);
  }

  return result as T;
}
```

Senior point:

Real-world deep clone must consider `Map`, `Set`, circular references, functions, class instances, and property descriptors.

## 44. Merge Two Sorted Arrays

```ts
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
```

Complexity:

- Time: O(n + m)
- Space: O(n + m)

## 45. Binary Search

```ts
function binarySearch<T>(
  items: readonly T[],
  target: T,
  compare: (a: T, b: T) => number,
): number {
  let left = 0;
  let right = items.length - 1;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    const comparison = compare(items[middle], target);

    if (comparison === 0) {
      return middle;
    }

    if (comparison < 0) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return -1;
}
```

## 46. Interview Checklist

Before saying you are done with a TypeScript coding problem, check:

- Did I avoid `any`?
- Did I use `unknown` for untrusted input?
- Did I preserve input-output type relationships?
- Did I avoid unsafe `as` where possible?
- Did I handle empty input?
- Did I handle `undefined`?
- Did I mention runtime validation?
- Did I state complexity?
- Did I keep the type-level solution readable?

## 47. Most Useful Problems To Revise First

If interview time is short, revise in this order:

1. `getProperty`
2. `DeepPartial`
3. `groupBy`
4. typed event emitter
5. `Promise.all`
6. concurrency limiter
7. LRU cache
8. API client with validator
9. discriminated reducer
10. exhaustive switch
