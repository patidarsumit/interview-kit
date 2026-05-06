# 05. Project Deep Dive Template

Final interviewers often ask:

> Explain your recent project.

Do not answer randomly. Use this structure.

## 2-Minute Project Explanation

```text
My recent project was <project/domain>. It was a web-based application used by <users/business group>.

The frontend was mainly built with Angular. My role involved building reusable components, implementing routing, integrating APIs, handling forms, authentication/authorization, performance improvements, and writing unit tests.

The application had modules like <module 1>, <module 2>, and <module 3>. We followed Agile/Scrum with sprint planning, daily standups, code reviews, and CI/CD quality gates.

One technically interesting area was <feature>. I designed it using <Angular feature/pattern>, handled edge cases like <case>, and tested it with <testing approach>.
```

## Architecture Explanation

Prepare this:

```text
Angular app was organized feature-wise. Each feature had components, services, models, and routes.

API calls were handled through services using HttpClient. Common auth/error logic was handled through interceptors.

Route guards protected secure pages. Reactive forms handled complex form screens. Shared UI components were built for reuse.

We used lazy loading for major feature areas to improve startup performance.
```

## Your Responsibilities

Pick what is true:

- built reusable Angular components
- implemented reactive forms
- implemented route guards
- integrated REST/GraphQL APIs
- worked on authentication flow
- wrote unit tests
- fixed production bugs
- improved performance
- participated in code reviews
- worked with QA/product/client
- supported deployments
- handled accessibility fixes

## Project Story: Performance

Use STAR:

```text
Situation: One page was loading slowly because it had a large table and multiple API calls.
Task: I had to improve user experience and reduce initial load time.
Action: I checked network and rendering, added pagination/lazy loading, optimized API calls, used trackBy/stable track, and removed expensive template calculations.
Result: Page became faster and more stable, and the issue did not reoccur.
```

## Project Story: Production Bug

```text
Situation: Users were seeing unauthorized errors after token expiry.
Task: I had to identify whether issue was frontend token handling or backend auth.
Action: I checked network calls, interceptor behavior, token expiry, refresh flow, and logs. We fixed retry flow to refresh token once and redirect on refresh failure.
Result: Reduced repeated 401s and improved user session handling.
```

## Project Story: Reusable Component

```text
Situation: Multiple screens needed similar dropdown/table/form control behavior.
Task: Reduce duplicate code and keep behavior consistent.
Action: I created reusable Angular component with inputs, outputs, accessibility support, and form integration where needed.
Result: Teams reused it across screens, reducing maintenance and UI inconsistencies.
```

## Be Ready For Follow-Ups

They may ask:

- What exact Angular version?
- Why Angular over React?
- How did you handle state?
- How did you test it?
- How did you handle API errors?
- How did you secure routes?
- What was your toughest bug?
- What did you personally implement?

## Golden Rule

For final round:

Do not say only "we did".

Say:

```text
My specific contribution was...
```

