# 05. City L1 Round Sheet - Coding, HTML/CSS, Competency

Use this sheet for quick revision before the L1 round. Keep answers clear, explain edge cases, and speak your approach while coding.

## Coding Questions

### 1. Group Anagrams

Question:

```text
Group words that are anagrams of each other.
```

Answer:

```js
function groupAnagrams(words) {
  const map = new Map();

  for (const word of words) {
    const key = word.split('').sort().join('');

    if (!map.has(key)) {
      map.set(key, []);
    }

    map.get(key).push(word);
  }

  return Array.from(map.values());
}

console.log(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']));
// [ [ 'eat', 'tea', 'ate' ], [ 'tan', 'nat' ], [ 'bat' ] ]
```

What to say:

```text
I use the sorted characters as a common key for anagrams. Words with the same key go into the same group.
Time complexity is O(n * k log k), where n is number of words and k is average word length.
```

### 2. Flatten Nested Array

Question:

```text
Flatten a nested array without using Array.flat().
```

Answer:

```js
function flattenArray(input) {
  const result = [];

  for (const item of input) {
    if (Array.isArray(item)) {
      result.push(...flattenArray(item));
    } else {
      result.push(item);
    }
  }

  return result;
}

console.log(flattenArray([1, [2, [3, 4], 5], 6]));
// [1, 2, 3, 4, 5, 6]
```

What to say:

```text
I check each item. If it is an array, I recursively flatten it. Otherwise, I add it to the result.
Time complexity is O(n), where n is the total number of nested values.
```

### 3. Implement GroupBy

Question:

```text
Group array items by a key or callback.
```

Answer:

```js
function groupBy(items, getKey) {
  return items.reduce((acc, item) => {
    const key = getKey(item);

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(item);
    return acc;
  }, {});
}

const users = [
  { name: 'Amit', role: 'admin' },
  { name: 'Sumit', role: 'dev' },
  { name: 'Riya', role: 'dev' },
];

console.log(groupBy(users, (user) => user.role));
// { admin: [{ name: 'Amit', role: 'admin' }], dev: [...] }
```

What to say:

```text
I use reduce and create one bucket for each key. This is useful for grouping API data by status, category, role, or userId.
Time complexity is O(n).
```

### 4. Find Second Largest Number

Question:

```text
Find the second largest unique number in an array.
```

Answer:

```js
function secondLargest(numbers) {
  let largest = -Infinity;
  let second = -Infinity;

  for (const num of numbers) {
    if (num === largest || num === second) {
      continue;
    }

    if (num > largest) {
      second = largest;
      largest = num;
    } else if (num > second) {
      second = num;
    }
  }

  return second === -Infinity ? null : second;
}

console.log(secondLargest([10, 5, 20, 20, 8]));
// 10
```

What to say:

```text
I track largest and second largest in one pass. I skip duplicate values because the question asks for the second largest unique number.
Time complexity is O(n), space complexity is O(1).
```

### 5. Remove Duplicates

Question:

```text
Remove duplicate values from an array.
```

Answer:

```js
function removeDuplicates(items) {
  return [...new Set(items)];
}

console.log(removeDuplicates([1, 2, 2, 3, 1, 4]));
// [1, 2, 3, 4]
```

Without Set:

```js
function removeDuplicatesManual(items) {
  const seen = {};
  const result = [];

  for (const item of items) {
    if (!seen[item]) {
      seen[item] = true;
      result.push(item);
    }
  }

  return result;
}
```

What to say:

```text
Set keeps unique primitive values and preserves insertion order. For objects, I would need a unique key like id.
```

### 6. Count Frequency Of Characters

Question:

```text
Count how many times each character appears in a string.
```

Answer:

```js
function charFrequency(str) {
  const freq = {};

  for (const char of str) {
    freq[char] = (freq[char] || 0) + 1;
  }

  return freq;
}

console.log(charFrequency('interview'));
// { i: 2, n: 1, t: 1, e: 2, r: 1, v: 1, w: 1 }
```

What to say:

```text
I use a hash map/object because lookup and update are constant time on average.
Time complexity is O(n).
```

### 7. Debounce And Throttle

Question:

```text
Implement debounce and throttle. Explain the difference.
```

Debounce answer:

```js
function debounce(fn, delay) {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
```

Throttle answer:

```js
function throttle(fn, delay) {
  let lastRun = 0;

  return function (...args) {
    const now = Date.now();

    if (now - lastRun >= delay) {
      lastRun = now;
      fn.apply(this, args);
    }
  };
}
```

What to say:

```text
Debounce waits until the user stops triggering the event, so it is good for search input.
Throttle runs at most once in a fixed time window, so it is good for scroll or resize events.
```

### 8. Reverse String And Palindrome

Question:

```text
Reverse a string and check if a string is a palindrome.
```

Reverse answer:

```js
function reverseString(str) {
  return str.split('').reverse().join('');
}

console.log(reverseString('sumit'));
// timus
```

Palindrome answer:

```js
function isPalindrome(str) {
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0;
  let right = clean.length - 1;

  while (left < right) {
    if (clean[left] !== clean[right]) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}

console.log(isPalindrome('Madam'));
// true
```

What to say:

```text
For palindrome, I normalize the string first and then use two pointers from both ends.
Time complexity is O(n).
```

### 9. Custom Pipe Logic

Question:

```text
Write a custom Angular pipe to shorten long text.
```

Answer:

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(value: string | null | undefined, limit = 20): string {
    if (!value) {
      return '';
    }

    return value.length > limit ? `${value.slice(0, limit)}...` : value;
  }
}
```

Usage:

```html
<p>{{ description | truncate:50 }}</p>
```

What to say:

```text
A pipe transforms data for display. I keep it pure and avoid side effects like API calls inside a pipe.
```

### 10. Custom Directive Logic

Question:

```text
Write a custom directive to highlight an element on hover.
```

Answer:

```ts
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHoverHighlight]',
  standalone: true,
})
export class HoverHighlightDirective {
  @Input() appHoverHighlight = 'yellow';

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.elementRef.nativeElement.style.backgroundColor = this.appHoverHighlight;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.elementRef.nativeElement.style.backgroundColor = '';
  }
}
```

Usage:

```html
<p appHoverHighlight="lightblue">Hover me</p>
```

What to say:

```text
A directive adds behavior to an existing element. For production, I prefer Renderer2 or host bindings when possible to keep DOM changes safer and more Angular-friendly.
```

## HTML/CSS Questions

### 1. Flexbox vs Grid

Answer:

```text
Flexbox is mainly one-dimensional: row or column. It is good for navbars, alignment, buttons, and small component layouts.
Grid is two-dimensional: rows and columns together. It is good for page layouts, dashboards, galleries, and complex card grids.
```

Example:

```css
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dashboard {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
```

### 2. Semantic HTML

Answer:

```text
Semantic HTML means using tags based on meaning, not just appearance. Examples: header, nav, main, section, article, aside, footer, button, form, label.
It improves accessibility, SEO, and code readability.
```

Example:

```html
<main>
  <section>
    <h1>Transactions</h1>
    <button type="button">Export</button>
  </section>
</main>
```

### 3. CSS Specificity

Answer:

```text
Specificity decides which CSS rule wins when multiple rules target the same element.
Inline styles have high priority, then IDs, then classes/attributes/pseudo-classes, then element selectors.
```

Example:

```css
p {
  color: black;
}

.message {
  color: blue;
}

#error {
  color: red;
}
```

What to say:

```text
If an element has id="error" and class="message", the ID selector wins because it has higher specificity.
```

### 4. Position Relative, Absolute, Fixed, Sticky

Answer:

```text
relative keeps the element in normal flow and lets us offset it.
absolute removes it from normal flow and positions it relative to the nearest positioned ancestor.
fixed positions it relative to the viewport and stays visible during scroll.
sticky behaves like relative first, then sticks when it reaches a scroll threshold.
```

Example:

```css
.card {
  position: relative;
}

.badge {
  position: absolute;
  top: 8px;
  right: 8px;
}

.header {
  position: sticky;
  top: 0;
}
```

### 5. Responsive Design

Answer:

```text
Responsive design means the UI adapts to different screen sizes. I use flexible layouts, relative units, media queries, responsive images, and mobile-first CSS.
```

Example:

```css
.cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 768px) {
  .cards {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### 6. Accessibility Basics

Answer:

```text
Accessibility means making the app usable for keyboard users, screen reader users, and users with visual or motor limitations.
Important basics are semantic HTML, labels for inputs, alt text for meaningful images, keyboard focus, sufficient color contrast, and ARIA only when native HTML is not enough.
```

Examples:

```html
<label for="email">Email</label>
<input id="email" type="email" />

<button type="button">Save</button>
```

What to say:

```text
I prefer native elements like button and input because they already support keyboard and accessibility behavior.
```

## Competency Questions

### 1. Tell Me About A Time You Handled Pressure

Answer:

```text
In one project, we had a production issue close to release where a key UI flow was failing for some users. I first reproduced the issue, checked the browser console and API response, and narrowed it down to an unexpected null value from the backend. I added a safe frontend fallback, coordinated with the backend team for the proper fix, and tested the main and edge cases before release. The release went ahead, and I learned to handle pressure by breaking the issue into small steps instead of reacting emotionally.
```

### 2. Tell Me About A Time You Disagreed With A Teammate

Answer:

```text
I once disagreed with a teammate about putting too much business logic inside an Angular component. I explained that it would make the component harder to test and reuse. I suggested moving the logic into a service and keeping the component focused on UI and events. We discussed both options, chose the service approach, and the code became easier to maintain. I try to handle disagreement with reasoning and examples, not ego.
```

### 3. Describe A Bug You Fixed Under Deadline

Answer:

```text
In a form flow, users were able to submit invalid data because one validation case was missing. The deadline was close, so I quickly reproduced the issue, added the missing reactive form validator, displayed a clear error message, and tested valid and invalid cases. I also checked that the submit button state matched the form validity. The fix was small but important because it prevented bad data from reaching the API.
```

### 4. How Do You Handle Feedback?

Answer:

```text
I take feedback as a way to improve the work, not as a personal criticism. If feedback is clear, I apply it and verify the result. If something is unclear, I ask questions to understand the reason behind it. In code reviews, I try to learn the pattern the team prefers so that my future code matches the project style better.
```

### 5. How Do You Learn New Technology?

Answer:

```text
I usually start with official documentation to understand the core concept. Then I build a small example, compare it with how the current project is structured, and apply it in a limited area first. For Angular topics, I also check examples around components, services, RxJS, forms, and performance so I understand both theory and practical usage.
```

## Quick Closing Line

Use this if they ask if you have questions:

```text
Can you tell me more about the Angular application architecture your team follows, and what kind of responsibilities this role will handle in the first few months?
```
