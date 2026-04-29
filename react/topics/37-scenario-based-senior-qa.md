# 37. Scenario-Based Senior React Q&A

Scenario questions test debugging and judgment.

They are common for experienced React interviews.

## Page Is Slow

### What do you check?

Check:

- network waterfall
- bundle size
- expensive renders
- huge lists
- context updates
- third-party scripts
- image/font loading

Use:

- React DevTools Profiler
- browser Performance panel
- Lighthouse
- bundle analyzer

Answer:

Measure first, identify whether the bottleneck is network, JavaScript, rendering, or CPU, then optimize the biggest measured issue.

## API Called Twice

### What do you check?

Check:

- React Strict Mode development remount
- duplicate `useEffect`
- wrong dependency array
- component remounting due to changing key
- route loader and component both fetching
- missing request dedupe/cache

Answer:

It is not always a production bug. Strict Mode can expose unsafe effects in development.

## Component Not Updating

### What do you check?

Check:

- direct state mutation
- same object reference passed to setter
- stale closure
- memoized child with unchanged props
- context provider value not changing
- external store selector issue

Fix:

- immutable updates
- correct dependencies
- avoid stale callbacks
- verify memoization assumptions

## Memory Leak After Route Change

### What do you check?

Check:

- subscriptions
- timers
- event listeners
- websockets
- fetches without abort
- observers
- stores retaining component callbacks

Fix:

- cleanup in `useEffect`
- `AbortController`
- unsubscribe functions
- remove listeners

## Hydration Error

### What do you check?

Check:

- `new Date()` during render
- `Math.random()` during render
- browser-only code
- different server/client data
- user-specific state
- locale/time zone differences

Fix:

- pass stable server values
- move browser-only logic to client effect
- keep server/client render output consistent

## Form Loses Input

### What do you check?

Check:

- changing `key`
- component remounting
- controlled/uncontrolled switch
- form reset after submit
- route refresh
- array index keys in dynamic fields

## Modal Is Not Accessible

### What do you check?

Check:

- `role="dialog"`
- `aria-modal`
- accessible title
- focus moves into modal
- Escape closes modal
- focus returns to trigger
- background interaction is blocked

## Interview Questions

### API called twice in development. Is it always a bug?

No. React Strict Mode can intentionally remount components in development to reveal unsafe effects.

### Page is slow. What is your first step?

Measure with profiler and browser tools before changing code.

### Component does not update after state change. Most likely cause?

Direct mutation or setting state to the same reference.

### How do you prevent memory leaks in effects?

Return cleanup functions, abort requests, remove listeners, clear timers, and unsubscribe.

