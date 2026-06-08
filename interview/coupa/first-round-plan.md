# First-Round Plan

## Goal

Be ready for a first technical screening that may mix resume/project discussion, Angular, NgRx, WebSockets, SaaS architecture, behavioral questions, and one coding problem.

## 3-Day Prep Plan

### Day 1: Angular + Resume

- Prepare 2 strong project stories:
  - One Angular architecture story.
  - One difficult bug/performance/real-time/state story.
- Revise:
  - Components, services, DI.
  - Data binding.
  - Lifecycle hooks.
  - Change detection and OnPush.
  - Reactive forms.
  - Routing, guards, interceptors.
  - Testing components/services.

Practice explaining:

> "How I structure an Angular feature from route to component to service/store."

### Day 2: NgRx + WebSockets

Revise:

- Actions, reducers, selectors, effects.
- Entity adapters and normalized state.
- Facade pattern.
- Loading/error state.
- Effect operator choice: switchMap, mergeMap, concatMap, exhaustMap.
- WebSocket lifecycle.
- Reconnect, heartbeat, auth, resubscribe, missed updates.
- Real-time update deduplication/versioning.

Practice whiteboard:

> "Invoice approval queue with live status updates."

### Day 3: Coding + Behavioral

Code by hand:

- Two Sum.
- First non-repeating character.
- Group anagrams.
- Merge intervals.
- Debounce/throttle.
- NgRx reducer entity update.
- RxJS search flow.

Behavioral stories:

- Ownership.
- Failure.
- Mentoring.
- Conflict/disagreement.
- Learning new technology.
- Why Coupa.

## First 5 Minutes: Opening Pitch

Use:

> I am a frontend engineer with strong Angular experience, especially around reusable components, services, reactive programming, and state management with NgRx. I enjoy building enterprise SaaS workflows where correctness, permissions, performance, and maintainability matter. I have also worked on mentoring through reviews and pairing. This role caught my attention because Coupa's spend management domain has complex, business-critical workflows and the JD aligns closely with Angular, NgRx, and real-time frontend work.

## Project Story Template

Use STAR plus technical details:

- Situation: What product/workflow?
- Task: What was your responsibility?
- Architecture: Angular modules/components/services/store/API.
- Challenge: State complexity, performance, real-time, permissions, forms, or testing.
- Action: What you changed.
- Result: Business/dev/user impact.
- Learning: What you would repeat.

## Must-Prepare Answers

- Why Coupa?
- Tell me about your Angular experience.
- How have you used NgRx?
- When should you not use NgRx?
- How would you design real-time updates?
- How do you avoid memory leaks?
- How do you improve Angular performance?
- How do you mentor junior engineers?
- Tell me about a failure.
- Explain one project deeply.

## During Coding

Process:

1. Restate problem and examples.
2. Ask constraints.
3. Start with simple approach.
4. Improve to optimal if needed.
5. Talk through edge cases.
6. Code cleanly.
7. Dry run.
8. State complexity.

Common edge cases:

- Empty input.
- Duplicates.
- Case sensitivity.
- Null/undefined if allowed.
- Large input.
- Stable sorting.
- Out-of-order events for real-time problems.

## Things To Avoid

- Saying "NgRx for everything."
- Putting WebSocket parsing in components.
- Ignoring reconnect/missed-message problems.
- Talking only about syntax, not architecture.
- Giving behavioral answers without outcomes.
- Overclaiming Coupa-specific interview questions as guaranteed.

## Questions To Ask

Pick 2:

- What frontend architecture patterns does the team currently use with Angular and NgRx?
- What real-time workflows does this team own?
- How large is the frontend codebase and how is it modularized?
- What are the biggest technical challenges for this role in the first few months?
- How does the team approach mentoring and code review?

