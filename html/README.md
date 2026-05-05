# HTML And Angular Template Senior Interview Guide

This guide is for senior software engineers with 5-10 years of experience.

It covers HTML fundamentals, modern HTML APIs, accessibility, SEO, performance, security, forms, media, browser behavior, and Angular template topics that senior frontend engineers are expected to know.

Also read:

- [HTML Programs Folder](./programs)

## Table Of Contents

1. HTML fundamentals
2. Document structure
3. Semantic HTML
4. Headings and content hierarchy
5. Links and navigation
6. Images and responsive images
7. Forms
8. Form validation
9. Buttons and interactive elements
10. Tables
11. Lists
12. Media elements
13. Accessibility
14. ARIA
15. Focus management
16. SEO
17. Metadata and social sharing
18. Performance
19. Security
20. Script loading
21. Modern HTML elements
22. Template and slot
23. Web components
24. Dialogs
25. Data attributes
26. Internationalization
27. Browser rendering basics
28. HTML in large apps
29. Angular template fundamentals
30. Angular binding syntax
31. Angular control flow
32. Angular forms in templates
33. Angular accessibility
34. Angular performance in templates
35. JavaScript DOM access
36. Senior interview questions
37. Best practices checklist

## 1. HTML Fundamentals

HTML defines document structure and meaning.

It is not just markup for layout. Good HTML improves accessibility, SEO, maintainability, browser behavior, and testing.

Basic document:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Interview Kit</title>
  </head>
  <body>
    <main>
      <h1>Hello HTML</h1>
    </main>
  </body>
</html>
```

Senior interview line:

> Senior HTML knowledge is about choosing correct semantics, preserving accessibility, and understanding how browsers parse, render, and expose the page to assistive technologies.

## 2. Document Structure

Important parts:

- `<!doctype html>` enables standards mode.
- `<html lang="en">` declares page language.
- `<head>` contains metadata, title, links, scripts, and SEO data.
- `<body>` contains visible document content.

Example:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="description" content="Senior HTML interview notes">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Senior HTML Guide</title>
  </head>
  <body>
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
  </body>
</html>
```

## 3. Semantic HTML

Semantic HTML uses elements for meaning, not just appearance.

Common semantic elements:

- `<header>`
- `<nav>`
- `<main>`
- `<section>`
- `<article>`
- `<aside>`
- `<footer>`
- `<figure>`
- `<figcaption>`
- `<time>`
- `<address>`

Bad:

```html
<div class="button">Submit</div>
```

Good:

```html
<button type="submit">Submit</button>
```

Why it matters:

- screen readers understand page structure
- keyboard behavior works correctly
- browser defaults help users
- tests can query by role
- SEO improves when content is meaningful

## 4. Headings And Content Hierarchy

Use headings to describe document structure.

```html
<h1>Product Dashboard</h1>
<section>
  <h2>Revenue</h2>
  <h3>Monthly Revenue</h3>
</section>
```

Senior rule:

Do not choose heading levels based on font size. Choose them based on content hierarchy.

Avoid:

```html
<div class="large-title">Dashboard</div>
```

Prefer:

```html
<h1>Dashboard</h1>
```

## 5. Links And Navigation

Use links for navigation.

```html
<a href="/pricing">Pricing</a>
```

Use buttons for actions.

```html
<button type="button">Open modal</button>
```

External links:

```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  External site
</a>
```

Why `rel="noopener noreferrer"` matters:

It prevents the new page from controlling the opener page through `window.opener`.

## 6. Images And Responsive Images

Basic image:

```html
<img src="profile.jpg" alt="Sumit smiling at a conference">
```

Decorative image:

```html
<img src="divider.svg" alt="">
```

Responsive image:

```html
<img
  src="product-800.jpg"
  srcset="product-400.jpg 400w, product-800.jpg 800w, product-1200.jpg 1200w"
  sizes="(max-width: 600px) 100vw, 600px"
  alt="Dashboard showing monthly sales"
>
```

Use `<picture>` when art direction is needed.

```html
<picture>
  <source media="(max-width: 600px)" srcset="hero-mobile.jpg">
  <source media="(min-width: 601px)" srcset="hero-desktop.jpg">
  <img src="hero-desktop.jpg" alt="Analytics dashboard overview">
</picture>
```

Performance attributes:

```html
<img
  src="team.jpg"
  alt="Engineering team"
  loading="lazy"
  decoding="async"
  width="800"
  height="500"
>
```

Senior point:

Always provide `width` and `height` when possible to reduce layout shift.

## 7. Forms

Forms are one of the most important HTML interview topics.

```html
<form action="/signup" method="post">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required>

  <button type="submit">Create account</button>
</form>
```

Important attributes:

- `name`: key used when submitting form data
- `type`: input behavior and validation
- `required`: required field
- `autocomplete`: improves usability
- `inputmode`: mobile keyboard hint
- `pattern`: regex validation
- `min`, `max`, `step`: numeric/date constraints

Example:

```html
<label for="amount">Amount</label>
<input
  id="amount"
  name="amount"
  type="number"
  min="1"
  max="1000"
  step="1"
  required
>
```

## 8. Form Validation

Native validation:

```html
<input type="email" required>
```

Pattern validation:

```html
<input
  name="postalCode"
  pattern="[0-9]{6}"
  title="Enter a 6 digit postal code"
>
```

Custom validation with JavaScript:

```html
<input id="password" type="password" minlength="8" required>
```

```js
const password = document.querySelector('#password');

password.setCustomValidity('Password must contain a number');
```

Senior point:

Client-side validation improves UX, but server-side validation is still required.

## 9. Buttons And Interactive Elements

Button types:

```html
<button type="button">Open</button>
<button type="submit">Submit</button>
<button type="reset">Reset</button>
```

Senior warning:

Inside forms, `<button>` defaults to `type="submit"`. Always set the type intentionally.

Bad:

```html
<div role="button" tabindex="0">Save</div>
```

Good:

```html
<button type="button">Save</button>
```

## 10. Tables

Use tables for tabular data, not layout.

```html
<table>
  <caption>Quarterly revenue</caption>
  <thead>
    <tr>
      <th scope="col">Quarter</th>
      <th scope="col">Revenue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Q1</th>
      <td>$120,000</td>
    </tr>
  </tbody>
</table>
```

Important:

- use `<caption>` for table title
- use `<th>` for headers
- use `scope` to connect headers to cells

## 11. Lists

Unordered list:

```html
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>
```

Ordered list:

```html
<ol>
  <li>Install dependencies</li>
  <li>Run tests</li>
  <li>Deploy</li>
</ol>
```

Description list:

```html
<dl>
  <dt>HTML</dt>
  <dd>Defines document structure.</dd>
</dl>
```

## 12. Media Elements

Video:

```html
<video controls width="640" poster="preview.jpg">
  <source src="demo.webm" type="video/webm">
  <source src="demo.mp4" type="video/mp4">
  <track kind="captions" src="captions.vtt" srclang="en" label="English">
</video>
```

Audio:

```html
<audio controls>
  <source src="podcast.mp3" type="audio/mpeg">
</audio>
```

Senior point:

Captions and transcripts are accessibility requirements, not polish.

## 13. Accessibility

Accessibility starts with correct HTML.

Important practices:

- use semantic elements
- associate labels with inputs
- preserve keyboard access
- keep visible focus styles
- provide useful alt text
- use headings in order
- avoid keyboard traps
- ensure color is not the only signal
- use sufficient touch target size

Accessible field:

```html
<label for="firstName">First name</label>
<input id="firstName" name="firstName" autocomplete="given-name">
```

Error message:

```html
<label for="email">Email</label>
<input
  id="email"
  name="email"
  type="email"
  aria-describedby="email-error"
  aria-invalid="true"
>
<p id="email-error">Enter a valid email address.</p>
```

## 14. ARIA

ARIA means Accessible Rich Internet Applications.

Senior rule:

Use native HTML first. Use ARIA only when native HTML cannot express the interaction.

Good native element:

```html
<button type="button">Close</button>
```

Avoid unnecessary ARIA:

```html
<button role="button">Close</button>
```

Useful ARIA examples:

```html
<button aria-expanded="false" aria-controls="menu">
  Menu
</button>
<nav id="menu" hidden>
  ...
</nav>
```

Live region:

```html
<p aria-live="polite" id="status"></p>
```

## 15. Focus Management

Keyboard users must be able to reach and operate controls.

Important concepts:

- natural tab order follows DOM order
- avoid positive `tabindex`
- use `tabindex="0"` only for custom focusable widgets
- use `tabindex="-1"` for programmatic focus
- modal dialogs should trap focus while open

Example:

```html
<main id="content" tabindex="-1">
  <h1>Page title</h1>
</main>
```

## 16. SEO

SEO-friendly HTML:

- one clear `<title>`
- useful meta description
- semantic headings
- crawlable links
- meaningful anchor text
- structured content
- canonical URL when needed
- image alt text

Example:

```html
<title>HTML Interview Guide For Senior Engineers</title>
<meta
  name="description"
  content="Senior-level HTML topics, examples, and interview questions."
>
<link rel="canonical" href="https://example.com/html-guide">
```

## 17. Metadata And Social Sharing

Open Graph:

```html
<meta property="og:title" content="HTML Interview Guide">
<meta property="og:description" content="Senior HTML preparation guide">
<meta property="og:image" content="https://example.com/cover.jpg">
<meta property="og:type" content="article">
```

Twitter card:

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="HTML Interview Guide">
```

## 18. Performance

HTML affects performance.

Important techniques:

- preload critical assets
- defer non-critical scripts
- lazy-load below-the-fold images
- provide image dimensions
- avoid render-blocking resources where possible
- use responsive images
- avoid huge DOM trees

Examples:

```html
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
<script src="/app.js" defer></script>
<img src="chart.png" alt="Sales chart" loading="lazy" width="800" height="400">
```

## 19. Security

Important HTML security topics:

- avoid inline scripts when using strict Content Security Policy
- sanitize untrusted HTML before inserting it
- use `rel="noopener noreferrer"` for external blank-target links
- understand iframe sandboxing
- avoid leaking sensitive data in HTML
- use autocomplete carefully for sensitive fields

Iframe sandbox:

```html
<iframe
  src="https://example.com/embed"
  title="Example embed"
  sandbox="allow-scripts allow-same-origin"
></iframe>
```

Content Security Policy is usually sent as an HTTP header, but can also be demonstrated with meta:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; img-src 'self' https:; script-src 'self'"
>
```

## 20. Script Loading

Normal script blocks parsing:

```html
<script src="app.js"></script>
```

`defer` downloads in parallel and executes after parsing:

```html
<script src="app.js" defer></script>
```

`async` downloads in parallel and executes as soon as available:

```html
<script src="analytics.js" async></script>
```

Senior answer:

Use `defer` for application scripts that depend on DOM order. Use `async` for independent scripts like analytics.

## 21. Modern HTML Elements

Important modern elements:

- `<main>`
- `<section>`
- `<article>`
- `<dialog>`
- `<details>`
- `<summary>`
- `<template>`
- `<slot>`
- `<picture>`
- `<source>`
- `<track>`
- `<output>`
- `<progress>`
- `<meter>`

Details disclosure:

```html
<details>
  <summary>What is semantic HTML?</summary>
  <p>HTML that communicates meaning and structure.</p>
</details>
```

## 22. Template And Slot

`<template>` holds inert HTML that can be cloned later.

```html
<template id="user-card-template">
  <article class="user-card">
    <h2></h2>
    <p></p>
  </article>
</template>
```

`<slot>` is used inside web components.

```html
<slot name="title"></slot>
```

## 23. Web Components

Web components use:

- custom elements
- shadow DOM
- templates
- slots

Example:

```html
<user-card>
  <span slot="name">Sumit</span>
</user-card>
```

Senior point:

Web components are framework-independent, but teams must understand styling, accessibility, SSR, and event interoperability tradeoffs.

## 24. Dialogs

The `<dialog>` element supports modal and non-modal dialogs.

```html
<dialog id="confirmDialog">
  <form method="dialog">
    <p>Delete this item?</p>
    <button value="cancel">Cancel</button>
    <button value="confirm">Delete</button>
  </form>
</dialog>
```

JavaScript:

```js
const dialog = document.querySelector('#confirmDialog');
dialog.showModal();
```

Senior point:

Use native dialog behavior where possible, but still verify focus management, labeling, escape behavior, and screen-reader experience.

## 25. Data Attributes

Use `data-*` for custom metadata.

```html
<button data-action="delete" data-id="123">
  Delete
</button>
```

JavaScript:

```js
button.dataset.action;
button.dataset.id;
```

Avoid using `data-*` as a replacement for proper state management in large apps.

## 26. Internationalization

Important attributes:

```html
<html lang="en">
```

Direction:

```html
<html lang="ar" dir="rtl">
```

Date/time:

```html
<time datetime="2026-04-29">April 29, 2026</time>
```

Senior point:

HTML should expose language and direction correctly so browsers and assistive technologies can interpret content.

## 27. Browser Rendering Basics

High-level flow:

1. Parse HTML into DOM.
2. Parse CSS into CSSOM.
3. Combine DOM and CSSOM into render tree.
4. Calculate layout.
5. Paint pixels.
6. Composite layers.

HTML can affect rendering through:

- script placement
- blocking resources
- image dimensions
- DOM size
- lazy loading
- preload hints

## 28. HTML In Large Apps

Senior engineers should care about:

- consistent semantic structure
- reusable accessible patterns
- stable test selectors
- design-system components that emit correct HTML
- SSR and hydration correctness
- avoiding invalid nested interactive elements
- progressive enhancement
- graceful failure when JavaScript breaks

Invalid:

```html
<button>
  <a href="/details">Details</a>
</button>
```

Better:

```html
<a href="/details">Details</a>
```

or:

```html
<button type="button">Open details</button>
```

## 29. Angular Template Fundamentals

Angular templates are HTML plus Angular syntax.

They support:

- interpolation
- property binding
- attribute binding
- class binding
- style binding
- event binding
- two-way binding
- template variables
- control flow
- pipes
- content projection

Example:

```html
<h1>{{ title }}</h1>
<button type="button" (click)="save()">Save</button>
```

Senior point:

Angular compiles templates, so template correctness, type checking, binding cost, and DOM structure matter.

## 30. Angular Binding Syntax

Interpolation:

```html
<p>{{ user.name }}</p>
```

Property binding:

```html
<button [disabled]="isSaving">Save</button>
```

Attribute binding:

```html
<td [attr.colspan]="columnCount">Total</td>
```

Class binding:

```html
<button [class.active]="isActive">Filter</button>
```

Style binding:

```html
<section [style.display]="isVisible ? 'block' : 'none'"></section>
```

Event binding:

```html
<button type="button" (click)="submit()">Submit</button>
```

Two-way binding:

```html
<input [(ngModel)]="name">
```

Senior point:

Use property binding for DOM properties, attribute binding for attributes that do not map cleanly to DOM properties, such as `aria-*`, `colspan`, and SVG attributes.

## 31. Angular Control Flow

Modern Angular supports built-in control flow blocks.

Conditional:

```html
@if (user) {
  <p>Welcome {{ user.name }}</p>
} @else {
  <p>Please sign in</p>
}
```

Loop:

```html
@for (item of items; track item.id) {
  <article>{{ item.name }}</article>
} @empty {
  <p>No items found.</p>
}
```

Switch:

```html
@switch (status) {
  @case ('loading') {
    <p>Loading...</p>
  }
  @case ('success') {
    <p>Loaded</p>
  }
  @case ('error') {
    <p>Failed</p>
  }
}
```

Senior point:

Always provide stable tracking for lists. Tracking by identity can be slower and can cause unnecessary DOM work.

## 32. Angular Forms In Templates

Template-driven form:

```html
<form #profileForm="ngForm" (ngSubmit)="save(profileForm.value)">
  <label for="name">Name</label>
  <input id="name" name="name" ngModel required>

  <button type="submit" [disabled]="profileForm.invalid">Save</button>
</form>
```

Reactive form template:

```html
<form [formGroup]="profileForm" (ngSubmit)="save()">
  <label for="email">Email</label>
  <input id="email" type="email" formControlName="email">

  @if (profileForm.controls.email.invalid) {
    <p>Email is invalid.</p>
  }

  <button type="submit">Save</button>
</form>
```

Senior point:

Even in Angular, labels, button types, autocomplete, validation messages, and ARIA relationships still matter.

## 33. Angular Accessibility

Angular does not automatically make custom UI accessible.

Senior checklist:

- use native HTML elements inside components
- preserve label-input relationships
- bind ARIA attributes correctly
- manage focus after route changes and dialogs
- do not hide important text from screen readers accidentally
- avoid custom controls unless keyboard behavior is fully implemented

Example:

```html
<button
  type="button"
  [attr.aria-expanded]="isOpen"
  aria-controls="account-menu"
  (click)="toggleMenu()"
>
  Account
</button>
```

## 34. Angular Performance In Templates

Senior topics:

- avoid expensive function calls in templates
- use stable `track` expressions in `@for`
- keep DOM trees reasonable
- prefer pure pipes for display transforms
- avoid unnecessary nested structural logic
- use lazy-loaded routes/components
- understand change detection impact
- avoid recreating arrays/objects in templates

Avoid:

```html
@for (item of getFilteredItems(); track item.id) {
  <p>{{ item.name }}</p>
}
```

Prefer:

```html
@for (item of filteredItems; track item.id) {
  <p>{{ item.name }}</p>
}
```

## 35. JavaScript DOM Access

JavaScript can read HTML elements, update their content or styles, change form values, add new children, remove children, and collect values from lists.

Example HTML:

```html
<h2 id="title">Contact</h2>

<input id="nameInput" type="text" value="Sumit">
<button id="saveButton" type="button">Save</button>

<ul id="skillsList">
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>

<div id="messageBox"></div>
```

### Access One Element

Use `querySelector` for CSS-style selection.

```js
const title = document.querySelector('#title');
const input = document.querySelector('#nameInput');
const saveButton = document.querySelector('#saveButton');
```

Common selectors:

```js
document.querySelector('input');        // first input tag
document.querySelector('#nameInput');   // element with id
document.querySelector('.error');       // first element with class
document.querySelector('[required]');   // first required element
```

You can also use:

```js
const input = document.getElementById('nameInput');
```

### Access Many Elements

Use `querySelectorAll` when you need a list of matching elements.

```js
const allInputs = document.querySelectorAll('input');
const allListItems = document.querySelectorAll('#skillsList li');
```

Loop over them:

```js
allListItems.forEach((item) => {
  console.log(item.textContent);
});
```

### Read And Update Text

Use `textContent` for plain text.

```js
const title = document.querySelector('#title');

console.log(title.textContent);
title.textContent = 'Contact Form';
```

Use `innerHTML` only when you intentionally need HTML markup.

```js
const messageBox = document.querySelector('#messageBox');
messageBox.innerHTML = '<strong>Saved successfully</strong>';
```

Senior note:

Do not put untrusted user input into `innerHTML`. Use `textContent` for user-provided text.

### Read And Update Input Values

Use `.value` for form controls such as `input`, `textarea`, and `select`.

```js
const input = document.querySelector('#nameInput');

console.log(input.value);
input.value = 'Amit';
```

Read value on button click:

```js
const input = document.querySelector('#nameInput');
const saveButton = document.querySelector('#saveButton');

saveButton.addEventListener('click', () => {
  console.log(input.value);
});
```

Other form properties:

```js
const checkbox = document.querySelector('#subscribe');
console.log(checkbox.checked);
checkbox.checked = true;

const select = document.querySelector('#country');
console.log(select.value);
select.value = 'IN';
```

### Update Style From JavaScript

Use the `style` property for direct inline styles.

```js
const title = document.querySelector('#title');

title.style.color = 'green';
title.style.backgroundColor = '#f0fdf4';
title.style.fontSize = '24px';
```

Prefer classes for reusable styling.

```css
.success {
  color: green;
  background-color: #f0fdf4;
}
```

```js
const messageBox = document.querySelector('#messageBox');

messageBox.classList.add('success');
messageBox.classList.remove('error');
messageBox.classList.toggle('hidden');
```

### Update Attributes

Use `setAttribute`, `getAttribute`, and `removeAttribute`.

```js
const input = document.querySelector('#nameInput');

input.setAttribute('placeholder', 'Enter your name');
console.log(input.getAttribute('type'));
input.removeAttribute('disabled');
```

For common DOM properties, direct property access is also fine.

```js
input.disabled = true;
input.required = true;
```

### Add Children

Create an element with `document.createElement`, set its text or attributes, then append it.

```js
const skillsList = document.querySelector('#skillsList');

const newItem = document.createElement('li');
newItem.textContent = 'Accessibility';

skillsList.appendChild(newItem);
```

Modern syntax:

```js
skillsList.append(newItem);
```

Add multiple children:

```js
const skills = ['Forms', 'SEO', 'Performance'];
const skillsList = document.querySelector('#skillsList');

skills.forEach((skill) => {
  const item = document.createElement('li');
  item.textContent = skill;
  skillsList.append(item);
});
```

### Delete Children

Remove one element:

```js
const firstItem = document.querySelector('#skillsList li');
firstItem.remove();
```

Remove the last child:

```js
const skillsList = document.querySelector('#skillsList');

if (skillsList.lastElementChild) {
  skillsList.lastElementChild.remove();
}
```

Remove all children:

```js
const skillsList = document.querySelector('#skillsList');
skillsList.replaceChildren();
```

Older approach:

```js
while (skillsList.firstChild) {
  skillsList.removeChild(skillsList.firstChild);
}
```

### Access A List And Get Text Values

Convert list item text into an array.

```js
const items = document.querySelectorAll('#skillsList li');

const values = Array.from(items).map((item) => item.textContent.trim());

console.log(values);
// ['HTML', 'CSS', 'JavaScript']
```

Get values from many inputs:

```html
<input class="skill-input" value="HTML">
<input class="skill-input" value="CSS">
<input class="skill-input" value="JavaScript">
```

```js
const inputs = document.querySelectorAll('.skill-input');

const values = Array.from(inputs).map((input) => input.value.trim());

console.log(values);
// ['HTML', 'CSS', 'JavaScript']
```

### Complete Small Example

```html
<input id="skillInput" type="text" placeholder="Enter skill">
<button id="addSkillButton" type="button">Add</button>
<ul id="skillsList"></ul>
```

```js
const skillInput = document.querySelector('#skillInput');
const addSkillButton = document.querySelector('#addSkillButton');
const skillsList = document.querySelector('#skillsList');

addSkillButton.addEventListener('click', () => {
  const skill = skillInput.value.trim();

  if (skill === '') {
    skillInput.style.borderColor = 'red';
    return;
  }

  const item = document.createElement('li');
  item.textContent = skill;

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    item.remove();
  });

  item.append(' ', deleteButton);
  skillsList.append(item);

  skillInput.value = '';
  skillInput.style.borderColor = '';
});
```

Quick interview checklist:

- `querySelector` gets the first matching element.
- `querySelectorAll` gets all matching elements.
- `textContent` reads or updates text.
- `value` reads or updates form values.
- `style` updates inline styles.
- `classList` adds, removes, or toggles CSS classes.
- `createElement` creates a new element.
- `append` or `appendChild` adds children.
- `remove` deletes an element.
- `Array.from(nodeList).map(...)` converts DOM lists into data arrays.

## 36. Senior Interview Questions

### Why is semantic HTML important?

It gives meaning to content, improves accessibility, supports browser behavior, helps SEO, and makes UI easier to test.

### What is the difference between a link and a button?

A link navigates. A button performs an action.

### Why should every input have a label?

Labels improve accessibility, increase clickable area, and connect field purpose to assistive technologies.

### What is the purpose of `alt` text?

It provides a text alternative for meaningful images. Decorative images should use empty alt text.

### What is the difference between `async` and `defer`?

`defer` executes after HTML parsing and preserves script order. `async` executes as soon as the script is available and does not guarantee order.

### What is the difference between `section` and `article`?

`section` groups related content within a page. `article` represents independent, self-contained content.

### When should you use ARIA?

Use ARIA when native HTML cannot express the required accessibility semantics. Native HTML should be the first choice.

### Why is `track` important in Angular `@for`?

It lets Angular map data items to DOM nodes efficiently and reduce unnecessary DOM operations.

### What are common HTML security concerns?

Unsafe HTML injection, weak CSP, iframe risks, `target="_blank"` without `rel`, and leaking sensitive data in markup.

### What makes a senior engineer strong at HTML?

They understand semantics, browser behavior, accessibility, performance, SEO, framework output, and long-term maintainability.

## 37. Best Practices Checklist

Use:

- `<!doctype html>`
- `lang` on `<html>`
- semantic landmarks
- one clear `<main>`
- correct heading hierarchy
- labels for inputs
- button `type`
- meaningful link text
- useful image alt text
- responsive images
- lazy loading for non-critical images
- `defer` for app scripts
- `rel="noopener noreferrer"` for external blank links
- native elements before ARIA
- stable Angular `@for` tracking

Avoid:

- clickable `<div>` when a button or link is correct
- positive `tabindex`
- invalid nested interactive elements
- missing form labels
- layout tables
- vague links like "click here"
- excessive ARIA
- injecting untrusted HTML
- expensive Angular template expressions
- relying only on client-side validation

Senior closing line:

> Great HTML is not basic. It is the foundation that decides whether an app is accessible, crawlable, fast, secure, and maintainable.
