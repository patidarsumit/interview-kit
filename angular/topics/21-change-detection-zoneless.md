# 21. Change Detection And Zoneless Angular

Change detection keeps Angular templates in sync with application state.

## Older Angular Model

Traditionally Angular used ZoneJS to know when async work happened.

Common triggers:

- click events
- timers
- HTTP responses
- promises
- input changes

Angular would run change detection after these events.

## `Default` vs `OnPush`

Default strategy checks broadly.

OnPush checks a component when:

- an input reference changes
- an event occurs in the component
- an observable used by `async` pipe emits
- change detection is manually requested
- signal reads notify Angular

```ts
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCard {}
```

## Signals And Change Detection

Signals allow Angular to know exactly where state is read.

This enables more granular updates.

```ts
count = signal(0);
double = computed(() => this.count() * 2);
```

Template:

```html
<p>{{ count() }}</p>
```

## Zoneless Angular

Angular v21 new applications are zoneless by default.

Zoneless means Angular no longer relies on ZoneJS to detect async changes.

Instead, Angular updates based on explicit framework notifications such as:

- signals
- events
- async pipe
- framework APIs

## Why Zoneless Matters

Benefits:

- less global async patching
- more predictable change detection
- better performance potential
- cleaner mental model with signals

Migration concerns:

- old code may rely on ZoneJS side effects
- third-party libraries may update state outside Angular notifications
- manual change detection may be needed in edge cases

## Senior Best Practices

- use signals for local reactive state
- avoid mutating objects without notifying Angular
- prefer immutable input updates
- use `OnPush` or signal-friendly patterns
- know when to call `markForCheck` in legacy code
- test third-party integrations in zoneless mode

## Interview Questions

### What is change detection?

The process Angular uses to update the DOM when application state changes.

### What is OnPush?

A change detection strategy that limits checks to explicit triggers, improving predictability and performance.

### What changed with zoneless Angular?

Angular can run without ZoneJS, relying on signals and explicit notifications instead of global async patching.

