# React Interview Kit

This folder is a topic-wise React interview preparation kit.

It is designed for both freshers and experienced developers. A fresher should be able to understand what React is and how to build components. An experienced developer should be able to explain hooks, effects, state ownership, rendering behavior, performance, testing, accessibility, security, React 19 features, SSR, and architecture decisions clearly.

React is not just "components and hooks." In interviews, companies usually check whether you can build real UI safely:

- render data correctly
- manage state without bugs
- handle loading, error, and empty states
- write clean reusable components
- avoid unnecessary re-renders
- clean up effects
- build accessible forms and dialogs
- protect routes and auth flows
- test user behavior
- explain tradeoffs like Context vs Redux, CSR vs SSR, and memoization vs React Compiler

Topic explanations are in [topics](./topics).

Coding examples are in [programs](./programs).

## React In Simple Words

React is a JavaScript library for building user interfaces.

The core idea is:

```text
UI = function of state
```

If state changes, React renders the component again and updates the browser DOM.

Example:

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button type="button" onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

Here:

- `count` is state
- clicking the button updates state
- React re-renders the component
- the UI shows the new count

## How To Study This Kit

Do not only read topics. For each topic:

1. Understand the concept.
2. Read the code example.
3. Explain it out loud like an interview answer.
4. Modify the related program.
5. Practice common mistakes and debugging scenarios.

For example, after reading hooks:

- explain why hooks cannot be called inside `if`
- write a `useState` example
- write a `useEffect` with cleanup
- explain stale closure
- explain when `useReducer` is better than `useState`

## Suggested Reading Order

### 1. Foundation

Start here if you are new to React or want to revise basics properly.

1. [React Overview](./topics/01-react-overview.md)  
   Explains what React is, what problems it solves, and what senior React work means.

2. [React Evolution: Older To Modern React](./topics/02-react-evolution-old-to-modern.md)  
   Explains class components, lifecycle methods, hooks, modern React, React 19, and why React changed.

3. [Setup, Tooling, And Project Structure](./topics/03-setup-tooling-project-structure.md)  
   Explains Vite, Next.js, TypeScript, feature-based structure, and production project organization.

4. [JSX, Components, And Props](./topics/04-jsx-components-props.md)  
   Explains JSX, components, props, children, composition, keys, and common component mistakes.

5. [State And Events](./topics/05-state-and-events.md)  
   Explains `useState`, event handling, derived state, immutable updates, and state ownership.

6. [Conditional Rendering And Lists](./topics/06-conditional-rendering-lists-keys.md)  
   Explains `if`, ternary rendering, empty states, list rendering, and why stable keys matter.

### 2. Hooks And Component Behavior

This is one of the most important React interview areas.

7. [Hooks Fundamentals](./topics/07-hooks-fundamentals.md)  
   Explains why hooks exist, rules of hooks, `useState`, `useReducer`, `useEffect`, `useRef`, `useContext`, `useMemo`, `useCallback`, `useTransition`, React 19 hooks, and custom hooks.

8. [useEffect And Side Effects](./topics/08-useeffect-side-effects.md)  
   Explains effects deeply: dependency arrays, cleanup, fetch cancellation, stale closures, Strict Mode behavior, infinite loops, and when not to use effects.

9. [Refs And DOM Access](./topics/09-refs-and-dom-access.md)  
   Explains `useRef`, DOM refs, ref vs state, timeout refs, latest value refs, `forwardRef`, and `useImperativeHandle`.

10. [Context API](./topics/10-context-api.md)  
   Explains prop drilling, context providers, custom context hooks, context performance, and when Context is not enough.

11. [Custom Hooks](./topics/12-custom-hooks.md)  
   Explains how to extract reusable stateful logic, how to name hooks, and how to avoid hiding too much behavior.

### 3. Forms, Data, Routing, And Async UI

These topics are asked in practical coding rounds.

12. [Forms In React](./topics/11-forms.md)  
   Explains controlled and uncontrolled inputs, form state, validation, form libraries, and accessible errors.

13. [Data Fetching And Async UI](./topics/13-data-fetching-async-ui.md)  
   Explains manual fetch, aborting stale requests, loading/error/empty states, and why server state is different from UI state.

14. [Suspense, Lazy, And Code Splitting](./topics/14-suspense-lazy-code-splitting.md)  
   Explains `Suspense`, `lazy`, route splitting, heavy widgets, and fallback UI.

15. [Routing](./topics/15-routing.md)  
   Explains React Router, Next.js routing, URL state, protected routes, not-found pages, and route-level data ownership.

### 4. State Management

This is common in experienced React interviews.

16. [State Management](./topics/16-state-management.md)  
   Explains local state, shared state, server state, `useReducer`, Context, Redux, Zustand, and TanStack Query.

17. [Redux Toolkit And Zustand](./topics/17-redux-toolkit-zustand.md)  
   Explains when to use Redux Toolkit, when Zustand is enough, and why server data often belongs in a query library.

### 5. Performance, Testing, And Production Quality

These separate junior React from senior React.

18. [Performance Optimization](./topics/18-performance-optimization.md)  
   Explains loading performance, runtime performance, virtualization, stable keys, memoization, and measurement.

19. [React Compiler And Memoization](./topics/19-react-compiler-memoization.md)  
   Explains `memo`, `useMemo`, `useCallback`, React Compiler, `"use memo"`, and why memoization is not a default answer for every issue.

20. [Error Boundaries](./topics/20-error-boundaries.md)  
   Explains rendering errors, fallback UI, route-level boundaries, and what error boundaries do not catch.

21. [Testing React](./topics/21-testing-react.md)  
   Explains React Testing Library, Vitest/Jest, MSW, e2e tests, and testing user behavior instead of implementation details.

22. [TypeScript With React](./topics/22-typescript-with-react.md)  
   Explains typed props, events, discriminated unions, API DTOs, and avoiding `any`.

23. [Accessibility In React](./topics/23-accessibility-react.md)  
   Explains semantic HTML, ARIA, keyboard support, forms, modals, focus management, and accessible queries in tests.

24. [Security In React](./topics/24-security-react.md)  
   Explains XSS, `dangerouslySetInnerHTML`, token storage, CSRF, auth boundaries, and safe rendering.

25. [Styling Approaches](./topics/25-styling-approaches.md)  
   Explains CSS Modules, Tailwind, CSS-in-JS, component libraries, design tokens, and styling tradeoffs.

### 6. Modern React, Frameworks, And Senior Architecture

These are important for senior interviews and modern React projects.

26. [React Server Components And SSR](./topics/26-rsc-ssr-hydration.md)  
   Explains CSR, SSR, hydration, Server Components, Client Components, browser API boundaries, and hydration mismatch causes.

27. [Next.js And React Frameworks](./topics/27-nextjs-react-frameworks.md)  
   Explains why frameworks exist, routing, layouts, server rendering, data loading, and framework conventions.

28. [React 19 Features](./topics/28-react-19-features.md)  
   Explains Actions, `useActionState`, `useOptimistic`, `use`, document metadata, ref improvements, and Server Components support.

29. [Advanced Forms And Validation](./topics/29-advanced-forms-validation.md)  
   Explains schema validation, dynamic fields, cross-field validation, async validation, server errors, and pending states.

30. [Advanced Patterns](./topics/30-advanced-patterns.md)  
   Explains composition, controlled components, compound components, render props, HOCs, and when hooks replaced older patterns.

31. [Architecture And Folder Structure](./topics/31-architecture-folder-structure.md)  
   Explains feature-first structure, shared UI, state ownership, route boundaries, and typed API layers.

32. [Company-Style React Coding Tasks](./topics/32-company-style-coding-tasks.md)  
   Lists common real coding tasks and what interviewers check in each.

33. [Performance Debugging Playbook](./topics/33-performance-debugging-playbook.md)  
   Explains how to debug slow pages, unnecessary re-renders, bundle issues, context updates, and large lists.

34. [Production Auth And Security Flows](./topics/34-production-auth-security-flows.md)  
   Explains token storage, refresh token flow, route protection, session expiry, and security boundaries.

35. [UI Libraries And Headless Components](./topics/35-ui-libraries-headless-components.md)  
   Explains Material UI, Ant Design, Chakra UI, Radix UI, Headless UI, React Aria, and when to choose styled vs headless components.

36. [Architecture Case Studies](./topics/36-architecture-case-studies.md)  
   Explains admin dashboard architecture, state choices, migration from class components, and splitting large apps.

37. [Scenario-Based Senior React Q&A](./topics/37-scenario-based-senior-qa.md)  
   Covers debugging questions like API called twice, memory leaks, hydration errors, slow pages, and stale UI.

38. [Senior Interview Questions](./topics/38-senior-interview-questions.md)  
   Quick revision file for high-value React interview questions.

## Common Coding Programs

Use these after reading the related topic.

### Fundamentals

- [Function component with props](./programs/01-function-component-props.tsx)
- [useState counter](./programs/02-use-state-counter.tsx)
- [Controlled input](./programs/03-controlled-input.tsx)
- [List with stable keys](./programs/04-list-keys.tsx)
- [Conditional loading/error/success rendering](./programs/05-conditional-rendering-states.tsx)

### Hooks And Effects

- [Fetch with AbortController cleanup](./programs/06-use-effect-fetch-abort.tsx)
- [Timer cleanup with useEffect](./programs/07-use-effect-cleanup-timer.tsx)
- [Focus input with useRef](./programs/08-use-ref-focus-input.tsx)
- [useReducer form state](./programs/09-use-reducer-form-state.tsx)
- [Theme Context provider](./programs/10-context-theme-provider.tsx)
- [Local storage custom hook](./programs/11-custom-hook-local-storage.tsx)
- [Debounce custom hook](./programs/12-custom-hook-debounce.tsx)

### Company-Style Tasks

- [Debounced search with loading/error/empty state](./programs/13-debounced-search-loading-error-empty.tsx)
- [Reusable table with sort/filter/pagination](./programs/14-reusable-table-sort-filter-pagination.tsx)
- [Cart state with context and reducer](./programs/15-cart-context-reducer.tsx)
- [Modal/dialog communication](./programs/16-modal-dialog-communication.tsx)
- [Infinite scroll with IntersectionObserver](./programs/17-infinite-scroll-intersection-observer.tsx)
- [Simple virtual list](./programs/18-virtual-list-simple.tsx)
- [Role-based menu](./programs/19-role-based-menu.tsx)
- [Accessible custom dropdown](./programs/20-custom-dropdown-accessible.tsx)

### Forms

- [React Hook Form login](./programs/21-react-hook-form-login.tsx)
- [Dynamic field array](./programs/22-dynamic-field-array.tsx)
- [Cross-field password validation](./programs/23-cross-field-password-validation.tsx)
- [React 19 useActionState form](./programs/24-use-action-state-form.tsx)
- [Optimistic like button](./programs/25-use-optimistic-like-button.tsx)

### Performance And State Libraries

- [Suspense lazy route](./programs/26-suspense-lazy-route.tsx)
- [Error boundary](./programs/28-error-boundary.tsx)
- [useMemo expensive filter](./programs/29-use-memo-expensive-filter.tsx)
- [memo child with useCallback](./programs/30-memo-child-use-callback.tsx)
- [Split context read/write](./programs/31-split-context-read-write.tsx)
- [Redux Toolkit slice](./programs/32-redux-toolkit-slice.ts)
- [Zustand store](./programs/33-zustand-store.ts)
- [TanStack Query users](./programs/34-tanstack-query-users.tsx)

### Routing, Auth, Security, Accessibility

- [Protected route pattern](./programs/35-protected-route-pattern.tsx)
- [URL search params state](./programs/36-url-search-params-state.tsx)
- [Auth refresh-token fetch wrapper](./programs/37-auth-refresh-token-fetch-wrapper.ts)
- [Session expiry logout](./programs/38-session-expiry-logout.ts)
- [Safe HTML wrapper](./programs/39-dangerously-set-html-safe-wrapper.tsx)
- [Accessible modal focus](./programs/40-accessible-modal-focus.tsx)
- [Compound tabs pattern](./programs/41-tabs-compound-components.tsx)

### Modern React And Testing

- [Render props legacy pattern](./programs/42-render-props-legacy-pattern.tsx)
- [Server Component example](./programs/43-server-component-example.tsx)
- [Client Component boundary](./programs/44-client-component-boundary.tsx)
- [Hydration mismatch example](./programs/45-hydration-mismatch-example.tsx)
- [React Testing Library component test](./programs/46-react-testing-library-component.test.tsx)
- [Custom hook test](./programs/47-custom-hook-test.test.tsx)
- [MSW API test handler](./programs/48-msw-api-test-example.tsx)
- [Drag/drop reorder logic](./programs/49-drag-drop-reorder.tsx)
- [Optimistic delete with rollback](./programs/50-optimistic-delete-with-rollback.tsx)

## What Companies Commonly Ask

For freshers:

- What is React?
- What are components?
- Props vs state?
- Why are keys needed?
- Controlled vs uncontrolled inputs?
- What is `useState`?
- What is `useEffect`?
- How do you pass data from parent to child?
- How do you pass data from child to parent?

For experienced developers:

- Why did an effect run twice?
- How do you prevent stale closures?
- Context vs Redux?
- When do you use `useReducer`?
- How do you optimize a slow React page?
- When do you use `memo`, `useMemo`, and `useCallback`?
- How do you handle auth refresh?
- How do you test React components?
- What causes hydration mismatch?
- Server Component vs Client Component?
- How would you structure a large React app?

## Senior Preparation Rule

For every topic, practice explaining:

- what problem it solves
- how older React handled it
- how modern React recommends doing it
- common mistakes
- performance and testing impact
- what you would choose in a production application

## Practice Method

For each program, ask yourself:

- What state exists here?
- Who owns that state?
- What happens during loading?
- What happens on error?
- What happens when the component unmounts?
- Is there any stale closure risk?
- Is it accessible by keyboard and screen reader?
- Would this scale for 10,000 items?
- How would I test it?

