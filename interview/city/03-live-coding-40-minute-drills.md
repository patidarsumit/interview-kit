# 03. Live Coding - 40 Minute Drills

Karat coding is usually about producing a working solution while explaining your thinking.

For this Citi Angular / frontend interview, assume the coding platform may not have an Angular compiler. If Angular is unavailable, Karat can still evaluate frontend engineering with:

- Vanilla JavaScript / ES6+
- TypeScript-like reasoning, even if the editor runs JavaScript
- native DOM APIs
- `fetch`
- HTML5
- CSS3
- security and code review
- async race-condition debugging

Angular is still important for the discussion section, but the live coding section is more likely to be framework-neutral.

## 40-Minute Coding Template

```text
Minute 0-2:
  Clarify input, output, constraints, edge cases.

Minute 2-5:
  Explain approach and complexity.

Minute 5-25:
  Implement cleanly.

Minute 25-32:
  Run sample cases and edge cases.

Minute 32-37:
  Fix bugs and simplify.

Minute 37-40:
  Explain final complexity and tradeoffs.
```

## More Realistic Frontend Coding Split

If the round is frontend-specific and Angular compiler is not available, expect something closer to:

```text
10-15 minutes:
  Code review, security issue, async bug, or JavaScript concept checkpoint.

20-25 minutes:
  Vanilla JS / DOM / fetch / CSS implementation.
```

High-priority task types:

- identify and fix XSS from unsafe `innerHTML`
- rewrite promise / timeout race-condition code
- implement debounce from scratch
- fetch JSON and render a dynamic list with DOM APIs
- group API data by parent ID
- filter transaction data and render `<li>` items
- build a todo list from an API response
- implement a basic accessible menu UI
- event delegation from a parent list
- deep clone with circular-reference handling
- flatten nested arrays without `.flat()`
- detect memory leaks from repeated event listeners
- fix `this` context bugs in callbacks
- recreate a split card / responsive layout with flexbox or grid
- sticky header / centering CSS tasks
- explain `var` vs `let` vs `const`, TDZ, closures, prototype chain, bubbling, capturing, microtasks, macrotasks

## Clarifying Questions To Ask

- Can input be empty or null?
- Are values unique?
- Should output preserve original order?
- Is comparison case-sensitive?
- What should happen for invalid data?
- Are we optimizing for time or memory?
- Should I mutate the input or return a new value?

For DOM / UI tasks, also ask:

- Should the UI clear old results before rendering new results?
- What loading and error state should be shown?
- Should user-provided text be treated as plain text?
- Should keyboard accessibility be supported?
- Should layout be mobile responsive?

## Priority Drill A: XSS Code Review

Unsafe code:

```js
async function loadMessage() {
  const response = await fetch('/api/message');
  const data = await response.json();

  document.querySelector('#message').innerHTML = data.text;
}
```

Problem:

```text
If `data.text` contains HTML or script-like payloads, `innerHTML` can create an XSS vulnerability. Dynamic user/API text should be inserted as text, not parsed as HTML.
```

Safe rewrite:

```js
async function loadMessage() {
  const response = await fetch('/api/message');
  const data = await response.json();
  const message = document.querySelector('#message');

  message.textContent = data.text ?? '';
}
```

Alternative with explicit text node:

```js
function renderMessage(container, text) {
  container.replaceChildren(document.createTextNode(text ?? ''));
}
```

What to say:

```text
I am intentionally using `textContent` / `createTextNode` because this content should be treated as plain text. I would use sanitized HTML only if the product requirement truly needed rich content.
```

## Priority Drill B: Async Race Condition Review

Buggy code:

```js
let currentUser;

function loadUser(id) {
  fetch(`/api/users/${id}`)
    .then((response) => response.json())
    .then((user) => {
      currentUser = user;
      renderUser(currentUser);
    });
}

loadUser(1);
loadUser(2);
```

Problem:

```text
If request 1 finishes after request 2, the older user can overwrite the newer result.
```

Safer latest-request-wins rewrite:

```js
let latestRequestId = 0;

async function loadUser(id) {
  const requestId = ++latestRequestId;
  const response = await fetch(`/api/users/${id}`);
  const user = await response.json();

  if (requestId !== latestRequestId) {
    return;
  }

  renderUser(user);
}
```

AbortController version:

```js
let activeController;

async function loadUser(id) {
  if (activeController) {
    activeController.abort();
  }

  activeController = new AbortController();

  try {
    const response = await fetch(`/api/users/${id}`, {
      signal: activeController.signal,
    });
    const user = await response.json();
    renderUser(user);
  } catch (error) {
    if (error.name !== 'AbortError') {
      showError('Unable to load user');
    }
  }
}
```

## Priority Drill C: Vanilla Fetch And DOM Rendering

Task:

```text
Fetch posts, group them by userId, and render each user's posts into a panel.
```

Example endpoint:

```text
https://jsonplaceholder.typicode.com/posts
```

HTML:

```html
<section id="feed" aria-live="polite"></section>
```

JavaScript:

```js
async function loadPostFeed() {
  const feed = document.querySelector('#feed');
  feed.textContent = 'Loading...';

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const posts = await response.json();
    const grouped = groupBy(posts, 'userId');

    feed.replaceChildren(renderPostGroups(grouped));
  } catch (error) {
    feed.textContent = 'Unable to load posts.';
  }
}

function groupBy(items, key) {
  return items.reduce((groups, item) => {
    const groupKey = item[key];

    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }

    groups[groupKey].push(item);
    return groups;
  }, {});
}

function renderPostGroups(groupedPosts) {
  const fragment = document.createDocumentFragment();

  Object.entries(groupedPosts).forEach(([userId, posts]) => {
    const section = document.createElement('section');
    const heading = document.createElement('h2');
    const list = document.createElement('ul');

    heading.textContent = `User ${userId}`;

    posts.forEach((post) => {
      const item = document.createElement('li');
      item.textContent = post.title;
      list.appendChild(item);
    });

    section.appendChild(heading);
    section.appendChild(list);
    fragment.appendChild(section);
  });

  return fragment;
}
```

What to point out:

- `textContent` avoids XSS for API text.
- `DocumentFragment` reduces repeated direct DOM mounting.
- `response.ok` handles HTTP failures.
- UI has loading and error states.
- `groupBy` is separated from rendering for testability.

## Priority Drill D: Search Input Debounce With DOM

HTML:

```html
<input id="search" type="search" aria-label="Search notifications" />
<ul id="results"></ul>
```

JavaScript:

```js
function debounce(callback, delayMs) {
  let timerId;

  return function debounced(...args) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      callback.apply(this, args);
    }, delayMs);
  };
}

const searchInput = document.querySelector('#search');
const results = document.querySelector('#results');

searchInput.addEventListener(
  'input',
  debounce((event) => {
    const query = event.target.value.trim().toLowerCase();
    renderFilteredResults(query);
  }, 300),
);

function renderFilteredResults(query) {
  results.replaceChildren();

  const filtered = notifications.filter((item) =>
    item.title.toLowerCase().includes(query),
  );

  filtered.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item.title;
    results.appendChild(li);
  });
}
```

What to say:

```text
The debounce closure keeps the timer between calls. Each new input clears the old timer, so the callback only runs after the user pauses typing.
```

## Priority Drill E: Transaction List Renderer

Task:

```text
Fetch a JSON payload of transactions, filter out entries where amount < 0, and insert the remaining transactions as `<li>` elements inside an ordered list.
```

HTML:

```html
<button id="loadTransactions">Load transactions</button>
<ol id="transactions" aria-live="polite"></ol>
```

JavaScript:

```js
async function loadTransactions() {
  const list = document.querySelector('#transactions');
  list.textContent = 'Loading...';

  try {
    const response = await fetch('/api/transactions');

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const transactions = await response.json();
    const positiveTransactions = transactions.filter(
      (transaction) => transaction.amount >= 0,
    );

    const fragment = document.createDocumentFragment();

    positiveTransactions.forEach((transaction) => {
      const item = document.createElement('li');
      item.dataset.id = transaction.id;
      item.textContent = `${transaction.description}: ${transaction.amount}`;
      fragment.appendChild(item);
    });

    list.replaceChildren(fragment);
  } catch (error) {
    list.textContent = 'Unable to load transactions.';
  }
}

document
  .querySelector('#loadTransactions')
  .addEventListener('click', loadTransactions);
```

What to say:

```text
I am using `textContent` instead of `innerHTML`, checking `response.ok`, and replacing the old list contents in one operation.
```

## Priority Drill F: Event Delegation List

Task:

```text
Create one listener on a parent `<ul>` that detects clicks on child `<li>` elements and alerts the clicked item's `data-id`.
```

HTML:

```html
<ul id="notifications">
  <li data-id="n1">Payment received</li>
  <li data-id="n2">Statement ready</li>
  <li data-id="n3">Profile updated</li>
</ul>
```

JavaScript:

```js
const notificationList = document.querySelector('#notifications');

notificationList.addEventListener('click', (event) => {
  const item = event.target.closest('li[data-id]');

  if (!item || !notificationList.contains(item)) {
    return;
  }

  alert(item.dataset.id);
});
```

What to say:

```text
This uses event bubbling. A single parent listener handles current and future list items, which avoids attaching many individual listeners.
```

## Priority Drill G: Build Todo List From API

Task:

```text
Call an API, fetch todo items, and render them as a vanilla JavaScript todo list.
```

Example endpoint:

```text
https://jsonplaceholder.typicode.com/todos?_limit=10
```

HTML:

```html
<section class="todo-panel">
  <h2>Todos</h2>
  <button id="loadTodos" type="button">Load todos</button>
  <ul id="todoList" aria-live="polite"></ul>
</section>
```

JavaScript:

```js
const loadTodosButton = document.querySelector('#loadTodos');
const todoList = document.querySelector('#todoList');

loadTodosButton.addEventListener('click', loadTodos);

async function loadTodos() {
  todoList.textContent = 'Loading...';

  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/todos?_limit=10',
    );

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const todos = await response.json();
    renderTodos(todos);
  } catch (error) {
    todoList.textContent = 'Unable to load todos.';
  }
}

function renderTodos(todos) {
  const fragment = document.createDocumentFragment();

  todos.forEach((todo) => {
    const item = document.createElement('li');
    const checkbox = document.createElement('input');
    const label = document.createElement('label');

    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.id = `todo-${todo.id}`;

    label.htmlFor = checkbox.id;
    label.textContent = todo.title;

    item.appendChild(checkbox);
    item.appendChild(label);
    fragment.appendChild(item);
  });

  todoList.replaceChildren(fragment);
}
```

CSS:

```css
.todo-panel {
  max-width: 420px;
  padding: 16px;
  border: 1px solid #d8dee4;
}

#todoList {
  display: grid;
  gap: 8px;
  padding-left: 20px;
}

#todoList li {
  display: flex;
  gap: 8px;
  align-items: center;
}
```

What to say:

```text
I separated fetching from rendering, used `response.ok` for API errors, inserted dynamic text with `textContent`, and used label/checkbox pairing for accessibility.
```

Follow-ups they may ask:

- Filter completed todos.
- Add a search input.
- Add delete buttons.
- Use event delegation for item clicks.
- Show empty state when no todos match.

## Priority Drill H: Basic Menu UI

Task:

```text
Implement a menu UI with vanilla HTML, CSS, and JavaScript.
```

HTML:

```html
<nav class="menu" aria-label="Main navigation">
  <button
    id="menuButton"
    class="menu__button"
    type="button"
    aria-expanded="false"
    aria-controls="menuList"
  >
    Menu
  </button>

  <ul id="menuList" class="menu__list" hidden>
    <li><a href="/accounts">Accounts</a></li>
    <li><a href="/payments">Payments</a></li>
    <li><a href="/statements">Statements</a></li>
  </ul>
</nav>
```

CSS:

```css
.menu {
  position: relative;
  display: inline-block;
}

.menu__button {
  padding: 8px 12px;
  border: 1px solid #8c959f;
  background: #ffffff;
  cursor: pointer;
}

.menu__list {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  min-width: 180px;
  margin: 0;
  padding: 8px 0;
  list-style: none;
  border: 1px solid #d8dee4;
  background: #ffffff;
  box-shadow: 0 8px 24px rgba(140, 149, 159, 0.25);
  z-index: 10;
}

.menu__list a {
  display: block;
  padding: 8px 12px;
  color: #24292f;
  text-decoration: none;
}

.menu__list a:hover,
.menu__list a:focus {
  background: #f6f8fa;
}
```

JavaScript:

```js
const menuButton = document.querySelector('#menuButton');
const menuList = document.querySelector('#menuList');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  setMenuOpen(!isOpen);
});

document.addEventListener('click', (event) => {
  const clickedInsideMenu = event.target.closest('.menu');

  if (!clickedInsideMenu) {
    setMenuOpen(false);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setMenuOpen(false);
    menuButton.focus();
  }
});

function setMenuOpen(isOpen) {
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuList.hidden = !isOpen;
}
```

What to say:

```text
The button controls menu visibility with `aria-expanded` and `hidden`. I also close the menu on outside click and Escape, which are expected keyboard/mouse behaviors.
```

Follow-ups they may ask:

- Add keyboard arrow navigation.
- Highlight the active item.
- Close the menu after clicking a link.
- Convert it to a nested menu.
- Make it responsive for mobile.

## Priority Drill I: Deep Clone Without JSON

Task:

```text
Deeply clone a nested object without `JSON.parse(JSON.stringify())`, and handle circular references safely.
```

JavaScript:

```js
function deepClone(value, seen = new WeakMap()) {
  if (value === null || typeof value !== 'object') {
    return value;
  }

  if (seen.has(value)) {
    return seen.get(value);
  }

  if (value instanceof Date) {
    return new Date(value.getTime());
  }

  if (value instanceof Map) {
    const clonedMap = new Map();
    seen.set(value, clonedMap);

    value.forEach((mapValue, key) => {
      clonedMap.set(deepClone(key, seen), deepClone(mapValue, seen));
    });

    return clonedMap;
  }

  if (value instanceof Set) {
    const clonedSet = new Set();
    seen.set(value, clonedSet);

    value.forEach((setValue) => {
      clonedSet.add(deepClone(setValue, seen));
    });

    return clonedSet;
  }

  const clonedValue = Array.isArray(value) ? [] : {};
  seen.set(value, clonedValue);

  Reflect.ownKeys(value).forEach((key) => {
    clonedValue[key] = deepClone(value[key], seen);
  });

  return clonedValue;
}
```

Test:

```js
const user = { name: 'A' };
user.self = user;

const cloned = deepClone(user);
console.log(cloned !== user);
console.log(cloned.self === cloned);
```

What to say:

```text
The `WeakMap` remembers already-cloned object references, so circular structures do not recurse forever.
```

## Priority Drill J: Flatten Nested Array Without `.flat()`

Recursive version:

```js
function flatten(values) {
  const result = [];

  values.forEach((value) => {
    if (Array.isArray(value)) {
      result.push(...flatten(value));
    } else {
      result.push(value);
    }
  });

  return result;
}
```

Iterative version:

```js
function flattenIterative(values) {
  const result = [];
  const stack = [...values].reverse();

  while (stack.length > 0) {
    const value = stack.pop();

    if (Array.isArray(value)) {
      for (let i = value.length - 1; i >= 0; i--) {
        stack.push(value[i]);
      }
    } else {
      result.push(value);
    }
  }

  return result;
}
```

What to say:

```text
The recursive version is simple. The iterative stack version is safer for very deeply nested arrays because it avoids call stack overflow.
```

## Priority Drill K: Memory Leak From Event Listeners

Buggy pattern:

```js
function renderButtons(items) {
  const container = document.querySelector('#actions');

  items.forEach((item) => {
    const button = document.createElement('button');
    button.textContent = item.label;

    button.addEventListener('click', () => {
      handleAction(item.id);
    });

    container.appendChild(button);
  });
}
```

Problem:

```text
If this render function runs repeatedly without clearing old nodes or listeners, memory and duplicate handlers can grow over time.
```

Refactor with event delegation:

```js
const actions = document.querySelector('#actions');

actions.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-id]');

  if (!button || !actions.contains(button)) {
    return;
  }

  handleAction(button.dataset.id);
});

function renderButtons(items) {
  const fragment = document.createDocumentFragment();

  items.forEach((item) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.id = item.id;
    button.textContent = item.label;
    fragment.appendChild(button);
  });

  actions.replaceChildren(fragment);
}
```

Alternative cleanup with `AbortController`:

```js
let listenerController;

function bindListeners() {
  if (listenerController) {
    listenerController.abort();
  }

  listenerController = new AbortController();

  window.addEventListener('resize', onResize, {
    signal: listenerController.signal,
  });
}
```

## Priority Drill L: Predictable Async State With `Promise.all`

Buggy pattern:

```js
const state = {};

async function loadDashboard() {
  fetch('/api/accounts')
    .then((response) => response.json())
    .then((accounts) => {
      state.accounts = accounts;
      render(state);
    });

  fetch('/api/transactions')
    .then((response) => response.json())
    .then((transactions) => {
      state.transactions = transactions;
      render(state);
    });
}
```

Safer rewrite:

```js
async function loadDashboard() {
  showLoading();

  try {
    const [accountsResponse, transactionsResponse] = await Promise.all([
      fetch('/api/accounts'),
      fetch('/api/transactions'),
    ]);

    if (!accountsResponse.ok || !transactionsResponse.ok) {
      throw new Error('Dashboard request failed');
    }

    const [accounts, transactions] = await Promise.all([
      accountsResponse.json(),
      transactionsResponse.json(),
    ]);

    const nextState = {
      accounts,
      transactions,
    };

    render(nextState);
  } catch (error) {
    showError('Unable to load dashboard');
  }
}
```

What to say:

```text
`Promise.all` lets both independent requests run in parallel, but state is applied once after both are available. That makes rendering more predictable.
```

## Priority Drill M: Fix `this` Context Bug

Buggy code:

```js
const counter = {
  count: 0,
  increment() {
    this.count++;
    console.log(this.count);
  },
  start() {
    setTimeout(this.increment, 1000);
  },
};
```

Problem:

```text
Passing `this.increment` as a callback loses the object receiver. Inside `increment`, `this` is no longer `counter`.
```

Fix with arrow wrapper:

```js
const counter = {
  count: 0,
  increment() {
    this.count++;
    console.log(this.count);
  },
  start() {
    setTimeout(() => {
      this.increment();
    }, 1000);
  },
};
```

Alternative with `bind`:

```js
setTimeout(this.increment.bind(this), 1000);
```

## Priority Drill N: Split-Viewport Responsive Card

Task:

```text
Create an article card where the image takes 40% width on desktop, text takes 60%, and the card stacks vertically under 768px.
```

HTML:

```html
<article class="article-card">
  <img
    class="article-card__image"
    src="https://picsum.photos/600/400"
    alt="City skyline"
  />
  <div class="article-card__content">
    <h2>Market update</h2>
    <p>
      Global markets moved cautiously as investors reviewed inflation data and
      central bank signals.
    </p>
  </div>
</article>
```

CSS:

```css
.article-card {
  display: flex;
  align-items: stretch;
  gap: 24px;
  width: 100%;
  max-width: 960px;
  border: 1px solid #d8dee4;
}

.article-card__image {
  flex: 0 0 40%;
  width: 40%;
  object-fit: cover;
}

.article-card__content {
  flex: 1;
  padding: 24px;
  text-align: right;
}

.article-card__content h2 {
  margin: 0 0 12px;
}

.article-card__content p {
  margin: 0;
  line-height: 1.5;
}

@media (max-width: 767px) {
  .article-card {
    flex-direction: column;
  }

  .article-card__image {
    width: 100%;
    flex-basis: auto;
    aspect-ratio: 16 / 9;
  }

  .article-card__content {
    text-align: left;
  }
}
```

What to say:

```text
I am using flexbox because this is a one-dimensional split layout. I avoid absolute positioning because the layout should remain responsive and content-driven.
```

## Priority Drill O: Perfect Centering

Flexbox:

```css
.parent {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
```

CSS Grid:

```css
.parent {
  display: grid;
  place-items: center;
  min-height: 100vh;
}
```

What to say:

```text
Flexbox is explicit with main-axis and cross-axis alignment. Grid's `place-items: center` is a concise shorthand for centering in both directions.
```

## Priority Drill P: Sticky Header With Scroll

HTML:

```html
<header class="site-header">
  <nav aria-label="Primary navigation">Citi Dashboard</nav>
</header>
<main class="page-content">
  <section>Long page content...</section>
</main>
```

CSS:

```css
.site-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: #ffffff;
  border-bottom: 1px solid #d8dee4;
}

.page-content {
  padding: 24px;
}
```

Fixed variant:

```css
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #ffffff;
}

.page-content {
  padding-top: 72px;
}
```

What to say:

```text
`sticky` keeps the element in normal document flow until it reaches the top. `fixed` removes it from flow, so content needs top spacing to avoid being hidden.
```

## Priority Drill Q: JavaScript Verbal Checkpoints

`var` vs `let` vs `const`:

```text
`var` is function-scoped and hoisted with `undefined`. `let` and `const` are block-scoped and hoisted but stay in the Temporal Dead Zone until initialized. `const` prevents reassignment, not object mutation.
```

Closure:

```text
A closure lets an inner function remember variables from its outer function even after the outer function has returned. Debounce is a common closure example because the returned function keeps access to `timerId`.
```

Prototype chain:

```text
JavaScript objects can delegate property lookup to their prototype. If a property is not found on the object, JavaScript walks up the prototype chain. `class` syntax is mostly cleaner syntax over prototypal inheritance.
```

Event loop:

```text
Synchronous code runs first, then microtasks like Promise callbacks, then macrotasks like timers.
```

Event bubbling vs capturing:

```text
Capturing travels from the document root down to the target. Bubbling travels from the target back up to ancestors. Most event handlers use bubbling by default, which is why event delegation on a parent list works.
```

Microtask vs macrotask:

```text
Promise callbacks run in the microtask queue after the current call stack completes. Timers like `setTimeout` run in the macrotask queue later. That is why Promise callbacks usually run before a zero-delay timeout.
```

Shallow copy vs deep copy:

```text
A shallow copy copies only the first level. Nested objects still share references. Spread syntax and `Object.assign()` are shallow, so changing a nested object through the copy can affect the original.
```

## Drill 1: Move Zeros To End

Problem:

```text
Given an array of numbers, move all 0 values to the end while preserving order of non-zero values.
```

Solution:

```ts
function moveZeros(values: number[]): number[] {
  let write = 0;

  for (let read = 0; read < values.length; read++) {
    if (values[read] !== 0) {
      values[write] = values[read];
      write++;
    }
  }

  while (write < values.length) {
    values[write] = 0;
    write++;
  }

  return values;
}
```

Complexity:

```text
Time: O(n)
Space: O(1)
```

## Drill 2: Two Sum

Problem:

```text
Return indexes of two numbers whose sum equals target.
```

Solution:

```ts
function twoSum(nums: number[], target: number): [number, number] | null {
  const seen = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const needed = target - nums[i];

    if (seen.has(needed)) {
      return [seen.get(needed)!, i];
    }

    seen.set(nums[i], i);
  }

  return null;
}
```

Complexity:

```text
Time: O(n)
Space: O(n)
```

## Drill 3: Group Transactions By Account

Frontend/Citi-style data transformation:

```ts
type Transaction = {
  id: string;
  accountId: string;
  amount: number;
};

type AccountSummary = {
  accountId: string;
  count: number;
  total: number;
};

function summarizeByAccount(transactions: Transaction[]): AccountSummary[] {
  const summaries = new Map<string, AccountSummary>();

  for (const transaction of transactions) {
    const current =
      summaries.get(transaction.accountId) ??
      { accountId: transaction.accountId, count: 0, total: 0 };

    current.count++;
    current.total += transaction.amount;
    summaries.set(transaction.accountId, current);
  }

  return [...summaries.values()];
}
```

Follow-ups they may ask:

- Sort by total descending.
- Ignore failed transactions.
- Round display values only in UI.
- Return object keyed by account ID instead of array.

## Drill 4: Find Duplicate IDs

```ts
function findDuplicateIds(ids: string[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const id of ids) {
    if (seen.has(id)) {
      duplicates.add(id);
    } else {
      seen.add(id);
    }
  }

  return [...duplicates];
}
```

Key explanation:

```text
I use two sets because the output should list each duplicate only once.
```

## Drill 5: Longest Subarray With Sum <= K

Works when values are non-negative.

```ts
function longestSubarrayAtMostK(values: number[], k: number): number {
  let left = 0;
  let sum = 0;
  let best = 0;

  for (let right = 0; right < values.length; right++) {
    sum += values[right];

    while (sum > k && left <= right) {
      sum -= values[left];
      left++;
    }

    best = Math.max(best, right - left + 1);
  }

  return best;
}
```

Important:

```text
This sliding-window solution depends on non-negative numbers. If negatives are allowed, this approach is not valid.
```

## Drill 6: Validate Rows And Columns In Matrix

Problem:

```text
Given a matrix, verify every row and every column has unique values.
```

Solution:

```ts
function hasUniqueRowsAndColumns(grid: number[][]): boolean {
  const rowCount = grid.length;
  const colCount = grid[0]?.length ?? 0;

  for (let row = 0; row < rowCount; row++) {
    const seen = new Set<number>();

    for (let col = 0; col < colCount; col++) {
      if (seen.has(grid[row][col])) {
        return false;
      }

      seen.add(grid[row][col]);
    }
  }

  for (let col = 0; col < colCount; col++) {
    const seen = new Set<number>();

    for (let row = 0; row < rowCount; row++) {
      if (seen.has(grid[row][col])) {
        return false;
      }

      seen.add(grid[row][col]);
    }
  }

  return true;
}
```

## Drill 7: Debounce

```ts
function debounce<T extends (...args: any[]) => void>(
  callback: T,
  delayMs: number,
): (...args: Parameters<T>) => void {
  let timerId: ReturnType<typeof setTimeout> | undefined;

  return (...args: Parameters<T>) => {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      callback(...args);
    }, delayMs);
  };
}
```

Angular answer:

```text
In Angular search forms, I would usually prefer RxJS `debounceTime`, `distinctUntilChanged`, and `switchMap` instead of manually writing debounce.
```

## Drill 8: Implement `once`

```ts
function once<T extends (...args: any[]) => any>(fn: T): T {
  let called = false;
  let result: ReturnType<T>;

  return ((...args: Parameters<T>) => {
    if (!called) {
      called = true;
      result = fn(...args);
    }

    return result;
  }) as T;
}
```

Tests to say:

```text
Call once with different arguments. The first result should be reused.
```

## Drill 9: Flatten Nested Array

```ts
type NestedNumber = number | NestedNumber[];

function flatten(values: NestedNumber[]): number[] {
  const result: number[] = [];

  for (const value of values) {
    if (Array.isArray(value)) {
      result.push(...flatten(value));
    } else {
      result.push(value);
    }
  }

  return result;
}
```

Follow-up:

```text
For very deep arrays, recursion can overflow the call stack. An iterative stack approach is safer.
```

## Drill 10: Normalize API Response For UI

Problem:

```text
Convert list of users to an object keyed by id and sort display names.
```

```ts
type UserDto = {
  id: string;
  firstName: string;
  lastName: string;
  active: boolean;
};

type UserVm = {
  id: string;
  displayName: string;
};

function toActiveUserMap(users: UserDto[]): Record<string, UserVm> {
  return users
    .filter((user) => user.active)
    .sort((a, b) => a.lastName.localeCompare(b.lastName))
    .reduce<Record<string, UserVm>>((acc, user) => {
      acc[user.id] = {
        id: user.id,
        displayName: `${user.firstName} ${user.lastName}`,
      };

      return acc;
    }, {});
}
```

Talk about:

```text
This is common in frontend adapters: convert API DTOs into view models so templates stay simple.
```

## Drill 11: Angular Search With RxJS

```ts
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-user-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <input [formControl]="searchControl" aria-label="Search users" />
  `,
})
export class UserSearchComponent {
  private readonly userService = inject(UserService);

  readonly searchControl = new FormControl('', { nonNullable: true });

  readonly users$ = this.searchControl.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((query) => this.userService.searchUsers(query)),
  );
}
```

Explain:

```text
`switchMap` cancels stale requests when a newer query arrives, which is exactly what we want for search.
```

## Drill 12: Auth Interceptor

```ts
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = sessionStorage.getItem('access_token');

  if (!token) {
    return next(request);
  }

  const authRequest = request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authRequest);
};
```

Security discussion:

```text
This is a simplified example. In a real banking app, token storage, refresh, logout, and logging rules should follow the organization's security standard.
```

## Drill 13: Cross-Field Validator

```ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchingFieldsValidator(
  firstKey: string,
  secondKey: string,
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const first = control.get(firstKey)?.value;
    const second = control.get(secondKey)?.value;

    return first === second ? null : { fieldsMismatch: true };
  };
}
```

Explain:

```text
A form-level validator is better than a single-control validator when the rule depends on multiple fields.
```

## Drill 14: Find First Missing Positive

Simpler set approach:

```ts
function firstMissingPositive(values: number[]): number {
  const positives = new Set(values.filter((value) => value > 0));

  for (let candidate = 1; candidate <= values.length + 1; candidate++) {
    if (!positives.has(candidate)) {
      return candidate;
    }
  }

  return values.length + 1;
}
```

Complexity:

```text
Time: O(n)
Space: O(n)
```

If asked for O(1) space, say:

```text
We can use index marking in the same array, but I would first provide the clear set solution and then optimize if needed.
```

## Drill 15: Build Error Summary From Form Errors

```ts
type FieldError = {
  field: string;
  code: string;
};

function buildErrorSummary(errors: FieldError[]): Record<string, string[]> {
  const summary: Record<string, string[]> = {};

  for (const error of errors) {
    summary[error.field] ??= [];
    summary[error.field].push(error.code);
  }

  return summary;
}
```

Follow-up:

```text
For UI display, map error codes to localized messages separately. Do not hardcode backend messages directly into all templates.
```

## Must-Practice Edge Cases

- empty array
- single item
- duplicate values
- null / undefined if allowed
- already sorted
- no match found
- all values same
- negative numbers
- very large input
- case sensitivity for strings
- preserving original order

## What To Say When Stuck

Use this:

```text
I see the issue. My current approach handles the sample, but this edge case breaks because ____. I will adjust the data structure / condition and retest.
```

Avoid:

```text
I don't know.
```

Better:

```text
I am considering two options: a map for O(n) lookup or sorting for simpler scanning. Since preserving indexes matters, I will use the map.
```
