# 33. Performance Debugging Playbook

Measure first.

## Slow Initial Load

Check:

- bundle size
- route splitting
- third-party libraries
- image/font loading
- SSR/SSG/RSC fit
- network waterfall

## Slow Runtime

Check:

- unnecessary re-renders
- expensive render calculations
- unstable props
- huge lists
- context updates
- slow event handlers

## Useful Tools

- React DevTools Profiler
- browser Performance panel
- Lighthouse
- bundle analyzer
- network tab

## Common Fixes

- virtualize large lists
- split context
- keep state local
- memoize expensive work
- lazy load heavy components
- reduce client JavaScript

## Debugging Steps

1. Reproduce the issue.
2. Test production build if possible.
3. Check network waterfall.
4. Check bundle size and large dependencies.
5. Profile renders with React DevTools.
6. Check browser Performance for CPU work.
7. Apply one fix.
8. Measure again.

## API Called Twice

Check:

- Strict Mode development remount
- duplicate effects
- route loader plus component fetch
- unstable effect dependencies
- component remount caused by changing `key`
- no query cache/deduplication

## Too Many Re-renders

Check:

- state lifted too high
- context value changes
- parent recreates objects/functions
- memoized child receives unstable props
- derived state set inside effects

## Huge List Is Slow

Fix order:

1. paginate or server filter
2. virtualize visible rows
3. memoize row only if measured
4. avoid expensive row render logic

## Senior Best Practices

- do not guess
- measure before and after
- optimize the largest bottleneck
- reduce work before memoizing work
- keep performance notes in PRs for major changes

## Interview Questions

### Page is slow. What do you do?

Reproduce, profile, identify whether it is network, bundle, render, or CPU, then fix the biggest measured bottleneck.

### API called twice. What do you check?

Strict Mode, duplicate effects, remounting, route loaders plus component fetches, and missing request dedupe.

### Huge list freezes. What do you do?

Use pagination, server filtering, or virtualization before trying memoization.
