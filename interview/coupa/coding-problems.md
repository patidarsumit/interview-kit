# Coding Problems To Practice

Public Coupa software interview reports mention arrays, strings, sorting, maps, and LeetCode-style algorithm questions. For this Angular frontend role, also practice JavaScript/TypeScript, RxJS, and UI-state coding.

## Priority Set

Do these first:

1. Two Sum
2. First Non-Repeating Character
3. Group Anagrams
4. Merge Intervals
5. Sort Objects by Multiple Fields
6. Debounce
7. Throttle
8. Deep Clone
9. Flatten Nested Array
10. Build a Small Observable Search Flow
11. NgRx Reducer for Entity Updates
12. WebSocket Reconnect Pseudocode

## 1. Two Sum

Prompt:

> Given an array of numbers and a target, return indices of two numbers that add to target.

Key points:

- Use map.
- O(n) time.
- Clarify duplicate values.

```ts
function twoSum(nums: number[], target: number): [number, number] | null {
  const seen = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need)!, i];
    seen.set(nums[i], i);
  }
  return null;
}
```

## 2. First Non-Repeating Character

```ts
function firstUniqueChar(s: string): string | null {
  const counts = new Map<string, number>();
  for (const ch of s) counts.set(ch, (counts.get(ch) ?? 0) + 1);
  for (const ch of s) if (counts.get(ch) === 1) return ch;
  return null;
}
```

## 3. Group Anagrams

```ts
function groupAnagrams(words: string[]): string[][] {
  const groups = new Map<string, string[]>();

  for (const word of words) {
    const key = word.split("").sort().join("");
    const group = groups.get(key) ?? [];
    group.push(word);
    groups.set(key, group);
  }

  return [...groups.values()];
}
```

Follow-up:

> Sorting each word costs O(k log k). For lowercase English letters, use a 26-count signature for O(k).

## 4. Merge Intervals

```ts
type Interval = [number, number];

function mergeIntervals(intervals: Interval[]): Interval[] {
  if (intervals.length === 0) return [];

  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const result: Interval[] = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const last = result[result.length - 1];
    const current = sorted[i];

    if (current[0] <= last[1]) {
      last[1] = Math.max(last[1], current[1]);
    } else {
      result.push(current);
    }
  }

  return result;
}
```

## 5. Sort Objects By Multiple Fields

Coupa-style example: sort invoices by status priority, then due date.

```ts
type Invoice = {
  id: string;
  status: "overdue" | "pending" | "paid";
  dueDate: string;
};

function sortInvoices(invoices: Invoice[]): Invoice[] {
  const priority: Record<Invoice["status"], number> = {
    overdue: 0,
    pending: 1,
    paid: 2,
  };

  return [...invoices].sort((a, b) => {
    const statusDiff = priority[a.status] - priority[b.status];
    if (statusDiff !== 0) return statusDiff;
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });
}
```

## 6. Debounce

```ts
function debounce<T extends (...args: any[]) => void>(fn: T, delayMs: number): T {
  let timer: ReturnType<typeof setTimeout> | undefined;

  return function (this: unknown, ...args: Parameters<T>) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delayMs);
  } as T;
}
```

Explain:

> Debounce waits until input quiets down. Good for search boxes.

## 7. Throttle

```ts
function throttle<T extends (...args: any[]) => void>(fn: T, limitMs: number): T {
  let inWindow = false;

  return function (this: unknown, ...args: Parameters<T>) {
    if (inWindow) return;
    fn.apply(this, args);
    inWindow = true;
    setTimeout(() => {
      inWindow = false;
    }, limitMs);
  } as T;
}
```

Explain:

> Throttle limits execution rate. Good for scroll/resize events.

## 8. Deep Clone

```ts
function deepClone<T>(value: T): T {
  if (value === null || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map(deepClone) as T;

  const result: Record<string, unknown> = {};
  for (const [key, nestedValue] of Object.entries(value)) {
    result[key] = deepClone(nestedValue);
  }
  return result as T;
}
```

Mention limitations:

> This simple version does not handle Date, Map, Set, functions, circular references, or class instances. In production, prefer `structuredClone` if supported and appropriate.

## 9. Flatten Nested Array

```ts
function flatten(input: unknown[]): unknown[] {
  const result: unknown[] = [];

  for (const item of input) {
    if (Array.isArray(item)) result.push(...flatten(item));
    else result.push(item);
  }

  return result;
}
```

## 10. Observable Search Flow

Prompt:

> Create a search stream that waits for typing to pause, ignores duplicate terms, cancels stale requests, and handles errors.

```ts
const results$ = searchTerm$.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap((term) =>
    api.search(term).pipe(
      catchError(() => of([]))
    )
  )
);
```

Explain:

> `switchMap` is important because only the latest search result should update the UI.

## 11. NgRx Reducer For Entity Updates

Prompt:

> A WebSocket message says invoice `INV-1` changed from `pending` to `approved`. Update store immutably.

```ts
type Invoice = {
  id: string;
  status: "pending" | "approved" | "rejected";
  version: number;
};

type InvoiceState = {
  entities: Record<string, Invoice>;
  ids: string[];
};

function invoiceStatusChanged(
  state: InvoiceState,
  update: { id: string; status: Invoice["status"]; version: number }
): InvoiceState {
  const existing = state.entities[update.id];
  if (!existing || update.version <= existing.version) return state;

  return {
    ...state,
    entities: {
      ...state.entities,
      [update.id]: {
        ...existing,
        status: update.status,
        version: update.version,
      },
    },
  };
}
```

What interviewer wants:

- Immutable update.
- Idempotent handling.
- Version check for out-of-order events.

## 12. WebSocket Reconnect Pseudocode

Prompt:

> Design reconnect logic for a WebSocket client.

Answer outline:

```ts
class ReconnectingSocket {
  private attempt = 0;
  private socket?: WebSocket;

  connect() {
    this.socket = new WebSocket(this.urlWithToken());

    this.socket.onopen = () => {
      this.attempt = 0;
      this.resubscribe();
      this.requestMissedEvents();
    };

    this.socket.onmessage = (event) => this.handleMessage(event.data);
    this.socket.onclose = () => this.scheduleReconnect();
    this.socket.onerror = () => this.socket?.close();
  }

  private scheduleReconnect() {
    const delay = Math.min(30_000, 2 ** this.attempt * 1000);
    this.attempt++;
    setTimeout(() => this.connect(), delay + Math.random() * 500);
  }
}
```

Discuss:

- Exponential backoff plus jitter.
- Refresh token before connecting.
- Resubscribe channels.
- Snapshot/delta sync after reconnect.
- Avoid duplicate connections.
- Stop reconnecting on logout.

## 13. LRU Cache

Useful if they ask a medium DSA problem.

```ts
class LruCache<K, V> {
  private items = new Map<K, V>();

  constructor(private readonly capacity: number) {}

  get(key: K): V | undefined {
    if (!this.items.has(key)) return undefined;
    const value = this.items.get(key)!;
    this.items.delete(key);
    this.items.set(key, value);
    return value;
  }

  set(key: K, value: V): void {
    if (this.items.has(key)) this.items.delete(key);
    this.items.set(key, value);

    if (this.items.size > this.capacity) {
      const oldestKey = this.items.keys().next().value;
      this.items.delete(oldestKey);
    }
  }
}
```

## 14. Promise.all Implementation

```ts
function promiseAll<T>(promises: Array<Promise<T>>): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const result: T[] = [];
    let completed = 0;

    if (promises.length === 0) {
      resolve(result);
      return;
    }

    promises.forEach((promise, index) => {
      promise
        .then((value) => {
          result[index] = value;
          completed++;
          if (completed === promises.length) resolve(result);
        })
        .catch(reject);
    });
  });
}
```

## 15. Frontend Mini-System Design

Prompt:

> Design an invoice approval page with real-time status updates.

Answer checklist:

- Route-level feature module/standalone route.
- API load through effect/service.
- NgRx entity state for invoices.
- Selectors for filters, status counts, selected invoice.
- WebSocket effect dispatches invoice update actions.
- Versioning/deduplication.
- Reactive form for comments/rejection reason.
- Permission-aware buttons.
- Virtual scroll/pagination.
- Loading/error/empty states.
- Tests for reducer/selectors/effects/component.

