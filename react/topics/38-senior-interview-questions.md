# 38. Senior Interview Questions

This file collects high-value React interview questions.

## Fundamentals

### What is React?

A JavaScript library for building component-based user interfaces.

### Props vs state?

Props come from parent components. State belongs to the component and changes over time.

### Why are keys needed?

Keys help React preserve identity when rendering lists.

## Hooks

### What are the rules of hooks?

Call hooks only at the top level and only from React components or custom hooks.

### `useEffect` vs `useMemo`?

`useEffect` runs side effects after render. `useMemo` caches a pure calculated value during render.

### Why use functional state updates?

They avoid stale state when the next value depends on the previous value.

## State

### Context vs Redux?

Context passes values through the tree. Redux manages predictable global state transitions with tooling.

### When use `useReducer`?

When state transitions are complex or many related values update together.

## Performance

### How do you optimize React performance?

Measure first, split bundles, virtualize large lists, keep state local, memoize expensive work, and reduce unnecessary re-renders.

### Do you always need `React.memo`?

No. Use it when measured re-renders are expensive. React Compiler can reduce manual memoization in supported apps.

## Effects

### Why does an effect run twice in development?

React Strict Mode can remount components in development to reveal unsafe effects.

### How do you avoid race conditions in fetch effects?

Use `AbortController`, ignore stale responses, or use a data-fetching library with cancellation/deduping.

## Forms

### Controlled vs uncontrolled inputs?

Controlled inputs store value in React state. Uncontrolled inputs store value in the DOM.

## RSC And SSR

### What is hydration?

React attaching event handlers and behavior to server-rendered HTML.

### Server Component vs Client Component?

Server Components run on the server and cannot use client hooks. Client Components run in the browser and support state/effects/events.

## Security

### Why is `dangerouslySetInnerHTML` risky?

It can introduce XSS if the HTML is untrusted or unsanitized.

## Scenario Questions

### Page is slow. How do you debug?

Profile network, bundle, render, and CPU cost. Fix the biggest measured bottleneck.

### API is called twice. What do you check?

Strict Mode, duplicate effects, dependencies, remounting, and duplicate data ownership.

### Component is not updating. Why?

Usually direct mutation, stale closure, memoization issue, or state setter receiving the same reference.

### Memory leak after route change. How do you find it?

Check subscriptions, timers, event listeners, websockets, fetch cancellation, and retained store references.

