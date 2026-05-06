# 03. Angular Must-Prepare Topics

This is the highest priority file.

For this JD, Angular is the must-have skill. Prepare these topics deeply.

## 1. Components

Be ready to explain:

- component metadata
- selector/template/styles
- standalone components
- component tree
- smart vs presentational components
- reusable components
- content projection
- dynamic components

Strong answer:

```text
In Angular, a component controls a part of the UI. In modern Angular, I prefer standalone components because dependencies are declared directly in imports. For reusable UI, I keep components input/output driven, avoid business logic inside them, and ensure accessibility and testability.
```

## 2. Lifecycle Hooks

Know:

- `ngOnInit`
- `ngOnChanges`
- `ngAfterViewInit`
- `ngOnDestroy`
- modern render hooks like `afterNextRender` if asked

Project answer:

```text
I use ngOnInit for initialization, ngOnChanges for reacting to input changes, ngAfterViewInit when view child references are needed, and ngOnDestroy or takeUntilDestroyed for cleanup.
```

## 3. Data Binding

Know:

- interpolation
- property binding
- event binding
- two-way binding
- signal/model inputs in modern Angular

Example:

```html
<input [value]="name()" (input)="name.set($any($event.target).value)" />
```

## 4. Inputs And Outputs

Prepare:

- parent-to-child data with inputs
- child-to-parent events with outputs
- modern `input()` and `output()`
- input transforms
- model inputs

Interview line:

```text
Inputs pass data down. Outputs emit events up. I avoid mutating input objects directly and prefer immutable updates.
```

## 5. Directives

Know:

- attribute directives
- structural directives
- host listeners
- host bindings
- host directives

Example questions:

- Difference between component and directive?
- How did you create reusable behavior?
- What is structural directive?

## 6. Pipes

Know:

- pure vs impure pipes
- custom pipes
- when not to use pipes
- performance impact

Strong answer:

```text
Pipes transform display values in templates. Pure pipes run only when input reference changes, which is good for performance. I avoid impure pipes for large lists unless there is a clear need.
```

## 7. Services And DI

Prepare:

- `@Injectable`
- `providedIn: 'root'`
- component-level providers
- hierarchical DI
- injection tokens
- `inject()`

Question:

> Root provider vs component provider?

Answer:

```text
Root provider creates app-level singleton. Component provider creates an instance scoped to that component subtree.
```

## 8. Routing

Must know:

- route config
- router outlet
- route params
- query params
- child routes
- lazy loading
- route guards
- resolvers
- canMatch vs canActivate

Project answer:

```text
We used lazy-loaded feature routes to reduce initial bundle size. Guards handled auth access, and query params stored shareable filter/page state.
```

## 9. Guards

Know:

- `canActivate`
- `canMatch`
- `canDeactivate`
- auth guard
- unsaved changes guard

Important:

Client guards are UX, not backend security.

## 10. HTTP Client And Interceptors

Must know:

- `HttpClient` returns Observables
- typed DTOs
- error handling
- auth interceptor
- retry interceptor
- refresh token flow
- `HttpContext`

Strong answer:

```text
I use interceptors for cross-cutting concerns like auth headers, logging, retries, and centralized error handling. Since requests are immutable, we clone them before modifying headers.
```

## 11. Forms

Prepare:

- template-driven vs reactive
- typed reactive forms
- validators
- async validators
- cross-field validation
- dynamic `FormArray`
- ControlValueAccessor
- accessible validation messages

Level 9 answer:

```text
For enterprise forms, I prefer typed reactive forms because they are explicit, testable, and easier to handle dynamic validation. For reusable custom controls, I implement ControlValueAccessor.
```

## 12. RxJS

Must know:

- Observable
- Subject
- BehaviorSubject
- ReplaySubject
- switchMap
- mergeMap
- concatMap
- exhaustMap
- forkJoin
- combineLatest
- debounceTime
- takeUntilDestroyed

Common Accenture reports mention RxJS subjects, mergeMap, and forkJoin.

## 13. Signals

Modern Angular:

- `signal`
- `computed`
- `effect`
- readonly signals
- signal services
- signals vs observables

Good answer:

```text
Signals are great for current synchronous UI state. Observables are better for streams, cancellation, and async event flows.
```

## 14. Change Detection And Performance

Prepare:

- OnPush
- lazy loading
- `@defer`
- track in `@for`
- virtual scroll
- avoiding expensive template calls
- bundle analysis
- image optimization
- signals

## 15. Dynamic Components

Now covered in the kit.

Know:

- `NgComponentOutlet`
- `ViewContainerRef.createComponent`
- passing inputs
- outputs cleanup
- registry pattern
- dynamic components vs routing vs `@defer`

## 16. Testing

Prepare:

- TestBed
- component tests
- service tests
- HTTP tests
- guard tests
- Vitest in modern Angular
- e2e concept
- accessibility testing

## 17. Security

Prepare:

- XSS
- Angular sanitization
- bypassSecurityTrust risk
- auth guards
- token storage
- CSRF
- CORS awareness

