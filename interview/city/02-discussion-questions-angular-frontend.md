# 02. Discussion Questions - Angular / Frontend

Use these for the first 10-25 minutes. Answer in 60-90 seconds unless they ask for depth.

## 1. Tell Me About Yourself

```text
I am a frontend developer focused mainly on Angular. I have worked on reusable components, routing, reactive forms, REST API integration, RxJS-based async flows, authentication, HTTP interceptors, state management, performance optimization, accessibility, and testing.

In enterprise projects, I try to build UI that is maintainable, secure, testable, and easy for backend and QA teams to integrate with. For Citi, I see the role as building reliable Angular applications that connect cleanly with microservices and meet financial-services quality expectations.
```

## 2. Why Citi?

```text
Citi has large-scale financial platforms where frontend quality matters: reliability, security, accessibility, performance, and clean integration with backend services. I am interested because Angular is used in enterprise applications, and I can contribute to reusable UI, API integration, state management, testing, and production-quality delivery.
```

## 3. Angular Component Design

Possible questions:

- How do you design reusable components?
- Smart vs presentational components?
- How do parent and child components communicate?
- How do you avoid unnecessary re-rendering?

Strong answer:

```text
I keep reusable components input/output driven and avoid putting business logic inside them. Container components fetch or prepare data, while presentational components focus on display and events. I avoid mutating inputs directly, use trackBy or modern track expressions for lists, and keep templates simple.
```

## 4. Lifecycle Hooks

Possible questions:

- Difference between `ngOnInit`, `ngOnChanges`, and `ngAfterViewInit`?
- Where do you unsubscribe?
- What is `ngOnDestroy` used for?

Strong answer:

```text
`ngOnInit` is for initialization after inputs are set. `ngOnChanges` reacts to input changes. `ngAfterViewInit` is useful when view children are available. For cleanup I use `ngOnDestroy`, or in modern Angular `takeUntilDestroyed`, especially for long-lived subscriptions or browser listeners.
```

## 5. Change Detection

Possible questions:

- What is change detection?
- What is `OnPush`?
- How do you improve Angular performance?

Strong answer:

```text
Angular change detection synchronizes component state with the template. With `OnPush`, Angular checks a component mainly when inputs change by reference, events happen, async pipe emits, or detection is triggered manually. It helps performance when combined with immutable updates and clean observable or signal patterns.
```

## 6. RxJS

Possible questions:

- Observable vs Promise?
- Subject vs BehaviorSubject?
- `switchMap` vs `mergeMap` vs `concatMap`?
- Why use `debounceTime`?

Strong answer:

```text
Observables can emit multiple values over time and can be cancelled through unsubscription. Promises resolve once. For search, I usually use `debounceTime`, `distinctUntilChanged`, and `switchMap` because old API calls should be cancelled when the user types a newer query.
```

Operator cheat sheet:

- `switchMap`: latest request wins, best for search/autocomplete.
- `mergeMap`: run inner streams concurrently, good for independent writes.
- `concatMap`: preserve order, one request after another.
- `exhaustMap`: ignore new events while one is running, good for preventing double submit.
- `forkJoin`: wait for all finite observables, like parallel API load.
- `combineLatest`: recompute when any source changes.

## 7. HTTP Client And Interceptors

Possible questions:

- What is an interceptor?
- How do you add auth token?
- How do you handle errors globally?
- How would you implement refresh token?

Strong answer:

```text
Interceptors handle cross-cutting request logic such as auth headers, request IDs, centralized error handling, and retry rules. Angular HTTP requests are immutable, so we clone a request before adding headers. For refresh tokens, I avoid multiple simultaneous refresh calls by coordinating pending requests and retrying them after refresh succeeds.
```

Citi/security angle:

- Do not log sensitive data.
- Avoid storing sensitive tokens in unsafe browser storage if the security model forbids it.
- Client-side guards are not real security; backend authorization is mandatory.
- Handle 401, 403, 500, timeout, and network failures gracefully.

## 8. Routing And Guards

Possible questions:

- `canActivate` vs `canMatch`?
- Lazy loading?
- Resolver?
- Unsaved changes guard?

Strong answer:

```text
I use lazy-loaded feature routes to reduce initial bundle size. Guards protect user flow, such as auth checks or unsaved-form confirmation. But frontend guards are for UX; actual access control must be enforced by backend APIs.
```

## 9. Forms

Possible questions:

- Reactive vs template-driven forms?
- Custom validator?
- Async validator?
- `ControlValueAccessor`?

Strong answer:

```text
For enterprise forms I prefer reactive forms because they are explicit, testable, and easier for dynamic validation. I use sync validators for local rules, async validators for server checks, cross-field validators for dependent fields, and `ControlValueAccessor` for reusable custom controls.
```

## 10. State Management

Possible questions:

- When do you use service state, RxJS, signals, or NgRx?
- What is a selector?
- Why avoid too much state in components?

Strong answer:

```text
For local UI state, component state is enough. For feature-level state, I may use a service with RxJS or signals. For complex shared state with effects, caching, and traceability, NgRx is useful. I do not add NgRx for every small feature because it increases boilerplate.
```

## 11. TypeScript

Possible questions:

- Interface vs type?
- Generics?
- Union types?
- Optional chaining?
- Strict null checks?

Strong answer:

```text
TypeScript helps catch contract issues before runtime. I use interfaces or types for API DTOs, generics for reusable functions and components, union types for controlled states, and strict null checks to avoid undefined runtime errors.
```

Example UI state:

```ts
type LoadState<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string };
```

## 12. JavaScript Fundamentals

Prepare:

- hoisting
- closures
- event loop
- promises and async/await
- `this`
- arrow functions
- prototype basics
- shallow vs deep copy
- array methods
- map / set
- debouncing / throttling

Likely output question:

```js
console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
console.log('D');
```

Answer:

```text
A D C B
```

Why:

- synchronous logs run first
- promise microtask runs before timer callback
- timer callback runs later

## 13. HTML, CSS, Accessibility

Possible questions:

- Flexbox vs grid?
- Box model?
- CSS specificity?
- Semantic HTML?
- How do you make a form accessible?

Strong answer:

```text
I use semantic HTML first, associate labels with inputs, expose validation messages clearly, keep keyboard navigation working, maintain sufficient contrast, and avoid relying only on color to show errors. For layout, I use flexbox for one-dimensional alignment and grid for two-dimensional layout.
```

## 14. Performance

Possible questions:

- How do you optimize Angular app performance?
- How do you handle large lists?
- How do you reduce bundle size?

Strong answer:

```text
I start with measurable issues: bundle analysis, network waterfall, runtime profiling, and Angular DevTools. Common improvements include lazy loading, `OnPush`, trackBy / track expressions, virtual scrolling for large lists, memoized selectors, avoiding heavy template methods, image optimization, and reducing unnecessary dependencies.
```

## 15. Testing

Possible questions:

- How do you test components?
- Jasmine/Karma vs Jest?
- What do you mock?
- How do you test an interceptor?

Strong answer:

```text
I test business logic and component behavior, not Angular internals. For services I mock HTTP. For components I test rendered behavior, inputs, outputs, validation, and user interaction. For interceptors I verify cloned headers, error handling, and retry or refresh behavior.
```

## 16. Microservices Frontend Integration

Possible questions:

- How does frontend integrate with microservices?
- What problems happen with multiple APIs?
- How do you handle API versioning?

Strong answer:

```text
The frontend should not know unnecessary backend complexity. I prefer clear API contracts, typed DTOs, adapter/mapping layers where needed, centralized error handling, and feature services that isolate API calls. For multiple microservices, consistency in auth, error shape, pagination, and correlation IDs becomes important.
```

## 17. Banking / Financial Frontend Concerns

Mention when relevant:

- Secure token handling.
- No sensitive information in logs.
- Proper timeout and session-expiry flow.
- Role-based UI with backend authorization.
- Audit-friendly user actions where required.
- Accessibility for broad customer/internal user base.
- Graceful failure states.
- Data formatting for currency, dates, locale, and precision.
- Avoid floating-point mistakes for money calculations; backend should be source of truth.

## 18. Questions You Can Ask At The End

- What Angular version and state-management pattern does the team currently use?
- Is the frontend organized as a monolith, micro frontend, or feature-based SPA?
- How are API contracts shared between frontend and backend teams?
- What testing expectations exist for new Angular features?
- What are the biggest frontend reliability or performance goals for the team?

