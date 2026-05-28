# 06. City / Citi L2 Interview Prep - Angular Frontend

Use this after clearing L1. L2 is usually less about solving a small coding problem and more about proving that you can work in a real team, own production code, communicate clearly, and make safe technical decisions.

## Most Likely L2 Format

Expect one of these formats:

1. Technical-managerial round with a lead, senior developer, VP, or hiring manager.
2. Project deep dive plus Angular architecture questions.
3. Managerial / behavioral discussion.
4. Mixed round with Angular, JavaScript, production scenarios, and competency questions.

Prepare for 45-60 minutes.

Likely flow:

```text
5 min: Introduction and current role
15-20 min: Project deep dive
15-20 min: Angular / frontend architecture and production scenarios
10-15 min: Behavioral / managerial questions
5 min: Your questions for them
```

## What They Are Probably Evaluating

### 1. Real Project Ownership

They may ask:

- Explain your current project.
- What feature did you own end to end?
- What was your exact contribution?
- How did frontend communicate with backend?
- How did you handle errors, loading, and empty states?
- What would you improve if you had more time?

Strong answer structure:

```text
The project was about [business goal]. My responsibility was [specific frontend ownership]. I worked on [components/forms/API integration/state/routing]. The main challenge was [challenge], and I solved it by [technical decision]. The result was [impact: reduced defects, improved usability, faster flow, stable release].
```

### 2. Angular Depth

Expect deeper follow-ups than L1:

- How do you structure Angular features?
- Smart vs presentational components?
- How do you manage shared state?
- When do you choose service state vs NgRx?
- How do you prevent memory leaks?
- How do you optimize slow screens?
- How do you design reusable components?
- How do you handle route guards and lazy loading?
- How do you handle auth token and refresh token?
- How do you test components and services?

Short positioning:

```text
I try to keep components focused, move business logic to services, keep API contracts typed, use lazy loading for feature boundaries, and test important business behavior rather than testing Angular internals.
```

### 3. Production Quality

They may ask:

- How do you make code maintainable?
- What do you check in code review?
- How do you handle a production bug?
- How do you debug a performance issue?
- How do you handle security in frontend?
- How do you make UI accessible?
- How do you make forms reliable?

Strong answer:

```text
For production code, I focus on readability, typed contracts, reusable components, clear error handling, tests for critical paths, accessible markup, and avoiding hidden side effects. In banking applications, I also avoid logging sensitive data and make sure frontend validation supports, but does not replace, backend validation.
```

### 4. Banking / Financial Services Mindset

Citi roles often mention security, data integrity, risk, compliance, and clear communication.

Prepare to say:

```text
In a banking application, correctness and reliability matter more than shortcuts. I would be careful with sensitive data, avoid exposing tokens or customer data in logs, handle authorization failures cleanly, and escalate risk early when requirements are unclear or a production issue may affect users.
```

### 5. Managerial / Behavioral Signals

They may evaluate:

- Can you work independently?
- Can you handle pressure?
- Can you communicate with backend, QA, product, and managers?
- Can you accept feedback?
- Can you mentor or support juniors?
- Can you raise risks without blaming others?
- Can you make practical tradeoffs?

Use STAR:

```text
Situation: What was happening?
Task: What was your responsibility?
Action: What did you do?
Result: What changed because of your action?
```

## High Probability L2 Questions And Answers

### 1. Tell Me About Yourself

```text
I am a frontend developer focused on Angular, JavaScript, TypeScript, HTML, and CSS. I have worked on reusable components, routing, reactive forms, REST API integration, RxJS-based async flows, authentication, error handling, and UI debugging. In my recent work, I have contributed to production features by understanding requirements, building maintainable components, integrating APIs, fixing defects, and coordinating with backend and QA teams. For Citi, I want to show that I can contribute to reliable, secure, and maintainable Angular applications in a banking environment.
```

### 2. Explain Your Current Project

```text
My project is a web application where users can complete business workflows through Angular screens. The frontend has reusable components, reactive forms, route-based navigation, API integration, and validation. My role was to build UI features, integrate REST APIs, handle loading and error states, fix defects, and coordinate with backend and QA. I focused on keeping the code modular, readable, and easy to test.
```

Replace this with your real domain before interview:

```text
Domain:
Users:
Main modules:
Your owned feature:
Biggest challenge:
Result:
```

### 3. What Was Your Biggest Technical Challenge?

```text
One challenge was handling inconsistent API response data in a form flow. Some fields were sometimes null or missing, which caused UI errors. I reproduced the issue, checked the API response, added safe mapping on the frontend, showed fallback UI where needed, and coordinated with backend for the proper contract fix. This made the screen stable and reduced repeated QA defects.
```

### 4. How Do You Design A Reusable Angular Component?

```text
I keep reusable components focused on display and user interaction. I pass data through inputs, emit actions through outputs, avoid business-specific API calls inside the component, and keep styling configurable where needed. For complex reusable controls, I use ControlValueAccessor so they work cleanly with reactive forms.
```

### 5. Service State vs NgRx

```text
If state is local to one screen or feature, a service with RxJS or signals is usually enough. If state is shared across many modules, has complex effects, caching, debugging needs, or many actions, NgRx can be useful. I do not add NgRx just for small state because it increases boilerplate.
```

### 6. How Do You Handle API Errors?

```text
I handle errors at two levels. Common errors like auth failures, network errors, or server errors can be handled through an interceptor or shared service. Feature-specific errors should be handled inside the component or feature service so the user gets a meaningful message. I also make sure loading state is reset and sensitive data is not logged.
```

### 7. How Do You Improve Angular Performance?

```text
I start by measuring the issue. Common improvements are lazy loading, trackBy or track expressions for lists, OnPush change detection where suitable, avoiding heavy functions in templates, unsubscribing from long-lived streams, reducing bundle size, debouncing search calls, and using virtual scroll for large lists.
```

### 8. How Do You Prevent Memory Leaks?

```text
I prefer the async pipe where possible because Angular handles subscription cleanup. For manual subscriptions, I use takeUntilDestroyed or a cleanup pattern. I also remove browser event listeners, clear timers, and avoid keeping unnecessary references to large objects.
```

### 9. How Do You Approach Code Review?

```text
I check correctness, readability, edge cases, type safety, error handling, performance risks, accessibility, security concerns, and whether the code follows the team's patterns. I try to give specific feedback and explain why a change is needed.
```

### 10. How Do You Handle A Production Bug?

```text
First I understand impact and reproduce the issue. Then I check logs, browser console, network calls, recent changes, and affected user flow. I isolate the root cause, prepare the smallest safe fix, test the main and edge cases, and communicate status clearly. If the impact is high, I escalate early.
```

### 11. How Do You Work With Backend Developers?

```text
I align early on the API contract, request payload, response shape, error codes, and edge cases. If API work is not ready, I use mock data or agreed sample responses. During integration, I share exact request/response details when reporting issues so debugging is faster.
```

### 12. Why Should We Hire You?

```text
I bring practical Angular experience, good JavaScript and TypeScript fundamentals, and a production-focused mindset. I can build UI features, integrate APIs, debug issues, communicate clearly with backend and QA, and take ownership of assigned work. I understand that in a bank, quality, security, and reliability are very important.
```

## L2 Questions To Ask Interviewer

Ask 2-3:

```text
What Angular version and state management approach does the team currently use?
```

```text
What would be the first major responsibility for this role after joining?
```

```text
How does the team handle code review, testing, and production releases?
```

```text
Are the applications mostly new development, enhancement work, or production support?
```

```text
What qualities are most important for someone to succeed in this team?
```

## Final Revision Checklist

- Prepare one strong project explanation.
- Prepare one production bug story.
- Prepare one conflict/disagreement story.
- Prepare one pressure/deadline story.
- Prepare one ownership story.
- Revise Angular architecture, state, forms, routing, interceptors, RxJS, performance, testing.
- Keep every answer practical and project-based.

## Internet Findings Used

- Citi Angular Developer, Pune, posted Apr. 17, 2026: https://jobs.citi.com/job/pune/angular-developer/287/94059749856
- Citi Angular Developer, Chennai/Pune, posted May 14, 2026: https://jobs.citi.com/job/chennai/angular-developer/287/95080300624
- Citi Senior Angular Developer, Pune, posted Apr. 09, 2026: https://jobs.citi.com/job/pune/senior-angular-developer/287/93754508016
- Citi interview reports, updated May 22, 2026: https://www.glassdoor.com/Interview/Citi-Interview-Questions-E8843.htm
- Citi Senior Developer interview reports: https://www.glassdoor.sg/Interview/Citi-Senior-Developer-Interview-Questions-EI_IE8843.0%2C4_KO5%2C21.htm
- Public Reddit L2 Citi discussions were treated as low-confidence signals only, useful for pattern matching but not guaranteed question lists.
