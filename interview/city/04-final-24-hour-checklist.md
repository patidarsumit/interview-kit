# 04. Final 24-Hour Checklist

## Karat Setup

- Test camera, microphone, and internet.
- Use Chrome or Firefox.
- Keep charger connected.
- Use one monitor if possible.
- Keep required interview tabs only.
- Keep phone away.
- Join 5-10 minutes early.
- Keep ID available if requested.

## 60-Second Intro

```text
Hi, I am <name>. I have around <X> years of experience in frontend development, mainly with Angular.

I have worked on reusable components, routing, reactive forms, REST API integration, RxJS async flows, HTTP interceptors, authentication and authorization flows, state management, testing, performance optimization, and accessibility.

In my recent projects, I focused on building maintainable enterprise UI, collaborating with backend and QA teams, debugging production issues, and improving user-facing reliability.

For Citi, I believe I fit well because the role needs Angular depth, strong JavaScript and TypeScript, REST and microservice integration, testing, performance, and enterprise delivery discipline.
```

## 20-Minute Discussion Revision

Revise these topics:

- Angular component communication.
- Lifecycle hooks.
- Change detection and `OnPush`.
- Services and dependency injection.
- Routing, lazy loading, guards, resolvers.
- Reactive forms and validators.
- HTTP client and interceptors.
- RxJS operators.
- State management with service / RxJS / NgRx.
- TypeScript types, interfaces, generics.
- JavaScript event loop, closures, promises.
- HTML/CSS basics.
- Accessibility.
- Performance.
- Testing.
- Security basics for frontend.

## 40-Minute Coding Revision

Assume the coding sandbox may not run Angular. Prepare for vanilla frontend first:

- XSS review: replace unsafe `innerHTML` with `textContent` / DOM nodes.
- async race condition review with `async/await` and latest-request-wins logic.
- `fetch` API with loading, error handling, and `response.ok`.
- DOM rendering with `createElement`, `appendChild`, `replaceChildren`, and `DocumentFragment`.
- debounce function from scratch.
- event delegation with one parent `<ul>` listener.
- deep clone without `JSON.parse(JSON.stringify())`, using `WeakMap` for circular references.
- flatten nested arrays without `.flat()`.
- fix `this` context loss in `setTimeout` / event callbacks.
- memory leak review for repeated event listeners.
- HTML/CSS split card layout with flexbox or grid.
- perfect centering with flexbox and CSS grid.
- sticky / fixed header with correct `z-index` and content spacing.
- `var` vs `let` vs `const`, TDZ, closures, prototype chain, event loop.

Practice these without autocomplete:

- two sum
- move zeros
- remove duplicates
- group by key
- frequency counter
- matrix row/column validation
- longest subarray with sliding window
- debounce
- flatten array
- normalize API response
- form error summary

## Your Coding Script

Say this before coding:

```text
Let me confirm the requirement. The input is ____, the expected output is ____, and the edge cases are ____. I will use ____ because it gives ____ time complexity.
```

Say this while testing:

```text
I will test the sample first, then an empty input, then a duplicate / no-match case.
```

Say this at the end:

```text
The final time complexity is O(__), and the space complexity is O(__). The main tradeoff is ____.
```

## Last-Minute Angular Answers

Interceptor:

```text
I use interceptors for cross-cutting HTTP behavior like auth headers, request IDs, retries, and global error handling. Since HTTP requests are immutable, I clone them before modification.
```

Guard:

```text
Route guards improve frontend UX and navigation control, but backend APIs must still enforce real authorization.
```

RxJS search:

```text
For search, I use debounceTime, distinctUntilChanged, and switchMap so stale API requests are cancelled when the user types a newer query.
```

Reactive forms:

```text
I prefer reactive forms for enterprise use because validation and state are explicit, testable, and easier to maintain for dynamic forms.
```

Performance:

```text
I measure first, then optimize with lazy loading, OnPush, trackBy or track expressions, virtual scroll, memoized selectors, avoiding heavy template calls, and bundle analysis.
```

Accessibility:

```text
I use semantic HTML, labels, keyboard support, visible focus, proper validation messages, contrast, and ARIA only when native HTML is not enough.
```

## Final Mindset

- Working solution first.
- Communicate continuously.
- Keep answers concise.
- Ask clarifying questions.
- Test edge cases.
- Explain complexity.
- Stay calm if hints are given.

Karat is not only checking whether you know Angular. They are checking whether you can think, communicate, code, debug, and deliver in a realistic engineering conversation.
