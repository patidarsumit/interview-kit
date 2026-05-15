# Vanilla JavaScript DOM Cheat Sheet

Use this for Karat / frontend machine coding when Angular is not available.

Goal:

- access elements
- update text safely
- add / remove classes
- add styles
- update attributes
- read and update lists
- create and remove nodes
- attach events

## 1. Basic HTML For Practice

```html
<div id="app">
  <h1 class="title">Todos</h1>
  <p data-role="message">Loading...</p>

  <button id="addBtn" type="button">Add item</button>

  <ul id="todoList">
    <li data-id="1">Learn JavaScript</li>
    <li data-id="2">Practice DOM</li>
  </ul>
</div>
```

## 2. Access Elements

Use `querySelector` for one element.

```js
const app = document.querySelector('#app');
const title = document.querySelector('.title');
const message = document.querySelector('[data-role="message"]');
```

Use `querySelectorAll` for many elements.

```js
const items = document.querySelectorAll('#todoList li');

items.forEach((item) => {
  console.log(item.textContent);
});
```

Older APIs:

```js
const appById = document.getElementById('app');
const titles = document.getElementsByClassName('title');
const listItems = document.getElementsByTagName('li');
```

Interview tip:

```text
`querySelectorAll` returns a static NodeList. `getElementsByClassName` returns a live HTMLCollection.
```

## 3. Update Text

Use `textContent` for normal text.

```js
title.textContent = 'My Todo List';
message.textContent = '3 items loaded';
```

Avoid this for user/API text:

```js
message.innerHTML = userInput; // unsafe if userInput contains HTML/script
```

Safe:

```js
message.textContent = userInput;
```

## 4. Update HTML

Use `innerHTML` only for trusted static markup.

```js
app.innerHTML = '<p>Static trusted markup</p>';
```

For dynamic data, create nodes instead.

```js
const paragraph = document.createElement('p');
paragraph.textContent = userInput;
app.appendChild(paragraph);
```

## 5. Add, Remove, Toggle Class

```js
title.classList.add('is-active');
title.classList.remove('is-active');
title.classList.toggle('is-hidden');
```

Check class:

```js
if (title.classList.contains('title')) {
  console.log('title class exists');
}
```

Replace class:

```js
title.classList.replace('old-class', 'new-class');
```

## 6. Add Styles

Inline style:

```js
title.style.color = 'blue';
title.style.fontSize = '24px';
title.style.backgroundColor = '#f6f8fa';
```

For CSS properties with hyphen, use camelCase:

```js
title.style.marginTop = '16px';
```

Better for bigger styling:

```js
title.classList.add('title--highlighted');
```

CSS:

```css
.title--highlighted {
  color: blue;
  background: #f6f8fa;
}
```

Interview tip:

```text
For one-off dynamic values, inline style is okay. For reusable visual states, class changes are cleaner.
```

## 7. Read And Update Attributes

```js
const button = document.querySelector('#addBtn');

button.setAttribute('aria-label', 'Add todo item');
button.setAttribute('disabled', '');
button.removeAttribute('disabled');
```

Read attribute:

```js
const label = button.getAttribute('aria-label');
```

Boolean property:

```js
button.disabled = true;
button.disabled = false;
```

## 8. Data Attributes

HTML:

```html
<li data-id="101" data-status="open">Pay bill</li>
```

JavaScript:

```js
const item = document.querySelector('li');

console.log(item.dataset.id); // "101"
console.log(item.dataset.status); // "open"

item.dataset.status = 'done';
```

## 9. Create And Add Nodes

Create element:

```js
const list = document.querySelector('#todoList');
const item = document.createElement('li');

item.textContent = 'New todo';
item.dataset.id = '3';

list.appendChild(item);
```

Add to beginning:

```js
list.prepend(item);
```

Add multiple nodes:

```js
const first = document.createElement('li');
const second = document.createElement('li');

first.textContent = 'First';
second.textContent = 'Second';

list.append(first, second);
```

## 10. Remove Nodes

Remove one element:

```js
const firstItem = document.querySelector('#todoList li');
firstItem.remove();
```

Remove all children:

```js
list.replaceChildren();
```

Replace all children with new content:

```js
const emptyMessage = document.createElement('li');
emptyMessage.textContent = 'No todos found';

list.replaceChildren(emptyMessage);
```

## 11. Read List Items

```js
const listItems = document.querySelectorAll('#todoList li');

const values = Array.from(listItems).map((item) => ({
  id: item.dataset.id,
  text: item.textContent,
}));

console.log(values);
```

## 12. Update List Items

Update all:

```js
document.querySelectorAll('#todoList li').forEach((item) => {
  item.classList.add('todo-item');
});
```

Find one by `data-id`:

```js
const item = document.querySelector('#todoList li[data-id="2"]');
item.textContent = 'Practice DOM deeply';
```

## 13. Render A List From Array

```js
const todos = [
  { id: 1, title: 'Learn JS', completed: false },
  { id: 2, title: 'Practice DOM', completed: true },
];

function renderTodos(todos) {
  const list = document.querySelector('#todoList');
  const fragment = document.createDocumentFragment();

  todos.forEach((todo) => {
    const item = document.createElement('li');
    item.dataset.id = String(todo.id);
    item.textContent = todo.title;

    if (todo.completed) {
      item.classList.add('is-completed');
    }

    fragment.appendChild(item);
  });

  list.replaceChildren(fragment);
}

renderTodos(todos);
```

Why `DocumentFragment`:

```text
It lets us build DOM nodes in memory, then mount them in one operation.
```

## 14. Render A List With Checkbox

```js
function renderTodoWithCheckbox(todo) {
  const item = document.createElement('li');
  const checkbox = document.createElement('input');
  const label = document.createElement('label');

  checkbox.type = 'checkbox';
  checkbox.id = `todo-${todo.id}`;
  checkbox.checked = todo.completed;

  label.htmlFor = checkbox.id;
  label.textContent = todo.title;

  item.dataset.id = String(todo.id);
  item.append(checkbox, label);

  return item;
}
```

## 15. Add Event Listener

```js
const addBtn = document.querySelector('#addBtn');

addBtn.addEventListener('click', () => {
  console.log('button clicked');
});
```

Input event:

```js
const input = document.querySelector('#searchInput');

input.addEventListener('input', (event) => {
  console.log(event.target.value);
});
```

## 16. Event Delegation For List

Use one listener on parent instead of one listener per child.

```js
const list = document.querySelector('#todoList');

list.addEventListener('click', (event) => {
  const item = event.target.closest('li[data-id]');

  if (!item || !list.contains(item)) {
    return;
  }

  console.log(item.dataset.id);
});
```

Why:

```text
Events bubble from child to parent. Event delegation works for existing and future list items.
```

## 17. Remove Event Listener

Named function is easier to remove.

```js
function handleClick() {
  console.log('clicked');
}

button.addEventListener('click', handleClick);
button.removeEventListener('click', handleClick);
```

Using `AbortController`:

```js
const controller = new AbortController();

window.addEventListener('resize', handleResize, {
  signal: controller.signal,
});

controller.abort(); // removes listener
```

## 18. Fetch API And Render List

```js
async function loadTodos() {
  const list = document.querySelector('#todoList');
  list.textContent = 'Loading...';

  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/todos?_limit=5',
    );

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const todos = await response.json();
    renderTodos(todos);
  } catch (error) {
    list.textContent = 'Unable to load todos.';
  }
}
```

## 19. Form Values

HTML:

```html
<input id="nameInput" />
<select id="roleSelect">
  <option value="admin">Admin</option>
  <option value="user">User</option>
</select>
```

JavaScript:

```js
const nameInput = document.querySelector('#nameInput');
const roleSelect = document.querySelector('#roleSelect');

console.log(nameInput.value);
console.log(roleSelect.value);

nameInput.value = 'Sumit';
roleSelect.value = 'user';
```

## 20. Checkbox Value

```js
const checkbox = document.querySelector('#acceptTerms');

console.log(checkbox.checked);
checkbox.checked = true;
```

## 21. Common DOM Properties

```js
element.textContent; // text only
element.innerHTML; // parses HTML
element.classList; // add/remove/toggle classes
element.style; // inline styles
element.dataset; // data-* attributes
element.children; // child elements only
element.childNodes; // elements, text, comments
element.parentElement; // parent element
element.nextElementSibling; // next element
element.previousElementSibling; // previous element
```

## 22. Common Methods

```js
document.querySelector(selector);
document.querySelectorAll(selector);
document.createElement(tagName);
document.createTextNode(text);
parent.appendChild(child);
parent.append(child1, child2);
parent.prepend(child);
parent.replaceChildren(...newChildren);
element.remove();
element.closest(selector);
element.matches(selector);
element.setAttribute(name, value);
element.getAttribute(name);
element.removeAttribute(name);
```

## 23. Mini Practice: Add Item To List

HTML:

```html
<input id="todoInput" />
<button id="addTodoBtn" type="button">Add</button>
<ul id="todoList"></ul>
```

JavaScript:

```js
const todoInput = document.querySelector('#todoInput');
const addTodoBtn = document.querySelector('#addTodoBtn');
const todoList = document.querySelector('#todoList');

addTodoBtn.addEventListener('click', () => {
  const title = todoInput.value.trim();

  if (!title) {
    return;
  }

  const item = document.createElement('li');
  item.textContent = title;

  todoList.appendChild(item);
  todoInput.value = '';
  todoInput.focus();
});
```

## 24. Mini Practice: Toggle Item Class

```js
todoList.addEventListener('click', (event) => {
  const item = event.target.closest('li');

  if (!item) {
    return;
  }

  item.classList.toggle('is-completed');
});
```

CSS:

```css
.is-completed {
  color: #6a737d;
  text-decoration: line-through;
}
```

## 25. Safe DOM Interview Lines

Use these lines in interview:

```text
I will use `textContent` instead of `innerHTML` because this is dynamic text and should not be parsed as HTML.
```

```text
I will build the list in a `DocumentFragment` and mount it once to avoid repeated DOM updates.
```

```text
I will use event delegation on the parent list so new items work without adding separate listeners.
```

```text
For visual states, I prefer toggling CSS classes instead of writing many inline styles.
```

