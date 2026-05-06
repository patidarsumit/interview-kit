# 01. Final Interview Strategy

This is a final interview for a Level 9 Custom Software Engineer role.

The interviewer may be a hiring manager, senior technical panelist, client-side evaluator, or delivery lead.

They may not ask only "What is Angular?" They may ask:

- explain your project
- why did you choose this design
- how did you improve performance
- how did you handle production issue
- how did you work in agile team
- how did you ensure quality
- how did you handle client changes
- how strong are you in Angular fundamentals

## What Level 9 Usually Means In Interview

You should show:

- independent delivery
- technical ownership
- ability to mentor juniors
- clear communication
- production mindset
- estimation and agile maturity
- comfort with enterprise processes
- ability to work with client requirements

## Interview Answer Formula

Use this structure for most answers:

```text
1. Direct answer
2. Real project example
3. Why this approach
4. Tradeoff or risk
5. Testing/performance/security impact
```

Example:

```text
We used HTTP interceptors for auth token injection and centralized error handling.
In my project, every API request needed the bearer token, so instead of adding headers in each service, we created an auth interceptor.
This reduced duplication and made token changes easier.
One risk is infinite retry during refresh token flow, so we handled 401 carefully and avoided retry loops.
We tested it using HttpClient testing utilities by verifying headers and error behavior.
```

## What Not To Do

Avoid:

- one-line textbook answers
- saying "I did not work on that" too quickly
- blaming team/client
- overclaiming fake experience
- ignoring testing/security/performance
- answering only syntax without project context

## How To Handle Unknown Questions

Use this:

```text
I have not implemented that exact feature end-to-end, but I understand the concept. My approach would be...
```

Then explain a reasonable approach.

Do not panic.

## Your Strongest Themes

Repeat these naturally:

- reusable Angular components
- routing and lazy loading
- reactive forms
- interceptors and guards
- RxJS for async flows
- performance optimization
- accessibility and testing
- Agile delivery
- CI/CD and code quality
- production debugging mindset

## Questions To Ask Interviewer

Ask 2-3 at the end:

- What kind of Angular architecture is used in this project: standalone, NgModules, or hybrid?
- Is the team working with AEM-integrated Angular components or separate Angular applications?
- What are the main quality gates: unit tests, SonarQube, accessibility, performance, security?
- What would be the immediate expectation from this role in the first 90 days?

