# 44. Performance Debugging Playbook

Senior Angular performance work starts with measurement.

Do not guess first. Reproduce, measure, change one thing, then measure again.

## Slow Initial Load

Check:

- production build size
- lazy route chunks
- heavy third-party libraries
- initial route dependencies
- images and fonts
- SSR/SSG/hydration fit
- `@defer` opportunities

Useful tools:

- Angular DevTools
- browser Performance panel
- Lighthouse
- source map explorer or bundle analyzer
- network waterfall

## Slow Runtime UI

Check:

- expensive template function calls
- unstable `@for track`
- huge DOM lists
- too many subscriptions
- unnecessary global state updates
- heavy change detection cycles
- synchronous CPU-heavy work

Common fixes:

- move derived work to `computed`
- use stable track keys
- use virtual scroll
- split heavy widgets with `@defer`
- move CPU-heavy work to a web worker
- reduce unnecessary component inputs

## API Called Twice

Check:

- duplicate subscriptions
- both component and resolver loading same data
- `ngOnInit` plus signal/effect loading
- missing `shareReplay` for shared observables
- route reuse or navigation re-trigger
- button double click

## OnPush Component Not Updating

Check:

- mutated input object instead of new reference
- async work outside Angular notification path
- missing signal update
- manual subscription not writing to state
- child component depending on stale cached value

## Memory Leak After Route Change

Check:

- manual subscriptions without cleanup
- timers
- DOM event listeners
- websocket connections
- long-lived subjects retaining component data
- custom overlay/dialog references

Use `takeUntilDestroyed()` for Angular-managed cleanup.

## Senior Best Practices

- test production builds, not only dev mode
- optimize the biggest measured bottleneck first
- keep performance fixes simple and explainable
- avoid premature memoization everywhere
- record architectural decisions when performance changes shape the app

## Interview Questions

### Page is slow. How do you debug?

Reproduce, measure with browser and Angular tools, inspect bundle/network/runtime cost, apply one fix, and measure again.

### API is called twice. What do you check?

Duplicate subscriptions, resolver plus component loading, effects, shared observable caching, and navigation lifecycle.

### Component is not updating with OnPush. Why?

Usually mutation, missing reference change, or state changing outside a tracked notification path.

