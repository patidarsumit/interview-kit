# 07. All Behavioral And Managerial Questions - City / Citi L2

Use STAR for most answers:

```text
Situation: What was happening?
Task: What was your responsibility?
Action: What did you do?
Result: What changed?
```

Keep each answer around 60-90 seconds.

## Core Managerial Questions

### 1. Tell Me About Yourself

```text
I am a frontend developer focused on Angular, JavaScript, TypeScript, HTML, and CSS. I have worked on reusable components, reactive forms, routing, REST API integration, RxJS flows, authentication, error handling, and debugging. I am comfortable working with backend developers, QA, and product teams to deliver stable UI features. I am now looking for an Angular role where I can contribute to reliable, secure, and maintainable enterprise applications.
```

### 2. Why Citi / Citibank?

```text
Citi works on large-scale financial systems where frontend quality has real business impact. I am interested because Angular is used heavily in enterprise applications, and the work requires reliability, security, accessibility, performance, and clean API integration. I want to contribute in an environment where engineering discipline matters.
```

### 3. Why Are You Looking For A Change?

```text
I am looking for a role where I can work on larger-scale Angular applications, take more ownership, and grow technically. I have learned a lot in my current role, but I want stronger exposure to enterprise architecture, production-quality delivery, and cross-functional collaboration.
```

### 4. What Are Your Strengths?

```text
My strengths are ownership, debugging, and clear communication. When I get a task, I try to understand the requirement properly, break it into smaller parts, build cleanly, and verify edge cases. If I am blocked, I communicate early with the right details instead of waiting until the deadline.
```

### 5. What Is Your Weakness?

```text
Earlier, I used to spend too much time trying to solve an issue alone before asking for help. I improved this by setting a time limit for investigation. Now I debug with logs and evidence first, and if I am still blocked, I ask for help with clear details about what I tried and what I observed.
```

### 6. Where Do You See Yourself In 3-5 Years?

```text
I want to grow into a strong senior frontend engineer who can own features end to end, guide juniors, contribute to architecture discussions, and improve code quality and delivery practices. I want to stay hands-on while also becoming more useful to the team beyond only assigned tasks.
```

## Ownership And Delivery

### 7. Tell Me About A Feature You Owned End To End

```text
I owned a form-based UI feature from requirement understanding to delivery. I clarified validations and API fields, built the Angular component and reactive form, integrated the REST API, handled loading and error states, and coordinated with QA for testing. I fixed defects found during testing and delivered the feature in the planned timeline.
```

### 8. Tell Me About A Time You Handled Pressure

```text
In one release, a key UI flow had an issue close to deadline. I stayed focused, reproduced the issue, checked browser console and network calls, and found that the UI was not handling a null API field. I added a safe fallback, tested the affected flow, and informed backend about the contract issue. The release continued without blocking the team.
```

### 9. How Do You Handle Tight Deadlines?

```text
I first clarify the must-have scope and identify risks. Then I break the task into smaller deliverables, focus on the highest-impact parts, and communicate progress regularly. If something cannot be completed safely, I raise it early with options instead of silently compromising quality.
```

### 10. Tell Me About A Time Requirements Changed Suddenly

```text
In one task, the validation rules changed after development had already started. I reviewed the impact, updated the reactive form validators, adjusted error messages, and retested existing scenarios to make sure nothing broke. I also confirmed the updated behavior with QA so everyone had the same understanding.
```

### 11. How Do You Prioritize Multiple Tasks?

```text
I prioritize based on business impact, urgency, dependencies, and risk. Production issues and blockers come first. For feature work, I check deadlines and dependencies with backend or QA. If priorities conflict, I discuss with the lead or manager and make the tradeoff visible.
```

### 12. Tell Me About A Time You Took Initiative

```text
I noticed repeated code in multiple components for loading and error handling. I suggested moving the common logic into a shared pattern/service and updated one flow as an example. This reduced duplication and made future screens easier to maintain.
```

## Conflict And Communication

### 13. Tell Me About A Time You Disagreed With A Teammate

```text
I once disagreed with a teammate about keeping too much business logic inside a component. I explained that it would make the component harder to test and reuse. I suggested moving the logic into a service and keeping the component focused on UI. We discussed both approaches and agreed on the service approach, which made the code cleaner.
```

### 14. How Do You Handle Conflict?

```text
I try to focus on the problem, not the person. I listen to the other view, explain my reasoning with examples, and look for the option that is best for maintainability and delivery. If the decision affects architecture or timeline, I involve the lead early.
```

### 15. Tell Me About A Time Communication Helped Avoid A Problem

```text
During API integration, I noticed the API response shape did not match the frontend expectation. Instead of assuming, I shared the exact request, response, and expected contract with backend. We clarified the contract early, which avoided QA defects later.
```

### 16. How Do You Communicate With Non-Technical Stakeholders?

```text
I avoid deep technical terms unless needed. I explain impact, options, risk, and timeline in simple language. For example, instead of saying the observable stream failed, I would say the screen is not receiving the expected data from the API and we are validating the contract.
```

### 17. How Do You Say No To An Unrealistic Request?

```text
I do not directly reject it. I explain the impact, risk, and alternatives. For example, I may say that we can deliver the core flow by the deadline, but additional edge cases or enhancements need more time to test safely. Then I ask which scope should be prioritized.
```

## Feedback And Growth

### 18. How Do You Handle Feedback?

```text
I treat feedback as a way to improve the work. If the feedback is clear, I apply it and verify the result. If it is unclear, I ask questions to understand the reason. In code reviews, I also try to learn the team's preferred patterns so my future code aligns better.
```

### 19. Tell Me About A Time You Received Critical Feedback

```text
I once received feedback that a component had too many responsibilities. I reviewed the code, moved data preparation to a service, simplified the component, and added clearer method names. After that, I became more careful about separating UI logic from business logic.
```

### 20. How Do You Learn New Technology?

```text
I start with official documentation to understand the core concept. Then I build a small example and compare it with the existing project pattern. After that, I apply it in a limited area and ask for review if the change affects shared architecture.
```

### 21. What Have You Learned Recently?

```text
Recently I have focused more on modern Angular patterns like standalone components, cleaner RxJS usage, reactive forms, and performance practices such as lazy loading and avoiding unnecessary template work. I am also improving how I explain technical decisions in interviews and reviews.
```

## Bug, Debugging, And Risk

### 22. Describe A Bug You Fixed Under Deadline

```text
In a form flow, users could submit invalid data because one validation case was missing. I reproduced the issue, added the missing reactive form validator, showed a clear error message, and tested valid and invalid cases. I also checked the submit button state and API payload before closing the defect.
```

### 23. How Do You Debug A UI Issue?

```text
I reproduce the issue first, then check console errors, network calls, request and response payloads, component state, form values, and recent code changes. If needed, I isolate the issue in a smaller flow. Once fixed, I retest the main path and edge cases.
```

### 24. How Do You Handle A Production Issue?

```text
I first understand impact and severity. Then I reproduce the issue, check logs and browser/network details, identify the root cause, and prepare the smallest safe fix. I communicate progress clearly and escalate early if customer impact or data risk is involved.
```

### 25. How Do You Manage Risk In A Banking Application?

```text
I avoid shortcuts around security and data correctness. I do not log sensitive data, I validate important inputs, I handle authorization errors properly, and I remember that frontend validation supports but does not replace backend validation. If I see a risk, I raise it early.
```

### 26. What Would You Do If You Made A Mistake?

```text
I would accept it quickly, inform the right people, help fix it, and then understand how to prevent it next time. I prefer transparency because hiding mistakes creates bigger risk, especially in production or financial applications.
```

## Teamwork And Leadership

### 27. How Do You Work With QA?

```text
I share clear test scenarios, expected behavior, and known edge cases. When QA raises a defect, I try to reproduce it with their exact steps and environment. If it is not a frontend issue, I still help collect evidence like screenshots, console errors, or API payloads.
```

### 28. How Do You Work With Backend Teams?

```text
I align on API contracts, request payloads, response shape, status codes, and error messages. During integration, I share exact evidence when something does not match. This keeps the discussion factual and helps both teams debug faster.
```

### 29. Have You Mentored Anyone?

```text
I have helped teammates or juniors understand existing code, Angular patterns, and debugging steps. I usually explain the context first, then show the specific code path, and finally let them try while I review. I believe mentoring means helping someone become independent, not just giving the answer.
```

### 30. How Do You Handle Code Review Comments?

```text
I review each comment carefully. If I agree, I make the change. If I have a different view, I explain my reasoning with examples and stay open to the team's pattern. My goal in code review is to improve the code, not defend my ego.
```

### 31. What Do You Look For In Code Review?

```text
I check correctness, readability, edge cases, type safety, error handling, performance, accessibility, security, and whether the code follows project patterns. I also check if the code is easy for another developer to maintain.
```

### 32. How Do You Build Trust In A New Team?

```text
I build trust by being reliable, communicating clearly, asking good questions, and delivering what I commit to. I also try to understand the team's existing patterns before suggesting changes.
```

## Technical-Managerial Scenarios

### 33. A Backend API Is Delayed. What Do You Do?

```text
I confirm the expected API contract with backend and use mock data or a temporary local service to continue frontend development. I keep the integration points isolated so replacing mock data with the real API is simple later. I also communicate dependency risk to the lead.
```

### 34. QA Finds A Bug You Cannot Reproduce. What Do You Do?

```text
I ask for exact steps, test data, browser, environment, screenshots, console logs, and network details. I also check if it depends on user role, permissions, cache, or data state. If needed, I pair with QA to reproduce it together.
```

### 35. Product Wants A Shortcut That May Create Security Risk. What Do You Do?

```text
I explain the risk clearly and suggest a safer alternative. In a banking application, security and compliance cannot be compromised for speed. If the concern is serious, I escalate it to the lead or manager with facts and options.
```

### 36. A Junior Developer Is Stuck Before Deadline. What Do You Do?

```text
I first understand where they are stuck and how urgent the task is. I help them isolate the issue, explain the path, and pair if needed. If the deadline is at risk, I inform the lead early and help split the remaining work.
```

### 37. Your Lead Chooses A Different Technical Approach. What Do You Do?

```text
I share my concerns if I see risks, but once the decision is made, I align with the team. If the approach creates an issue later, I raise it with evidence and propose improvements. Team consistency is important.
```

### 38. You Have A Critical Bug And A New Feature Deadline Together. What Do You Do?

```text
I prioritize based on impact. A critical production bug usually comes first. I inform the lead about the conflict, estimate the impact on the feature timeline, and propose a revised plan. I avoid silently trying to do both and missing both.
```

## Citi-Focused Questions

### 39. How Would You Work In A Regulated Banking Environment?

```text
I would follow process carefully, document important decisions, avoid exposing sensitive data, respect access controls, test critical flows, and escalate risks early. In banking, stable and compliant delivery is as important as fast delivery.
```

### 40. What Does Data Integrity Mean To You?

```text
Data integrity means the data shown, submitted, and stored must be correct and consistent. From frontend side, I can support this through validation, correct API payload mapping, clear error handling, and avoiding stale or incorrect UI state.
```

### 41. How Do You Handle Sensitive Data In Frontend?

```text
I avoid logging sensitive data, avoid unnecessary storage in browser storage, mask sensitive fields where required, use HTTPS through backend infrastructure, handle tokens carefully according to the team's security model, and rely on backend authorization for real access control.
```

### 42. What Does Ownership Mean To You?

```text
Ownership means I do not just write code and forget it. I understand the requirement, clarify gaps, build the solution, test important cases, communicate blockers, support QA, fix defects, and care about how the feature behaves after release.
```

## Quick One-Line Answers

### 43. Are You Comfortable Working Independently?

```text
Yes. I can take a clarified requirement, break it down, implement it, test it, and communicate progress. If something is unclear or risky, I ask early.
```

### 44. Are You Comfortable With Agile?

```text
Yes. I have worked with sprint planning, daily updates, task tracking, code reviews, QA defects, and release timelines.
```

### 45. Are You Comfortable With Hybrid / Team Collaboration?

```text
Yes. I am comfortable collaborating through meetings, chat, ticket updates, code reviews, and pairing when needed.
```

### 46. What Motivates You?

```text
I am motivated by solving practical problems, building useful UI, learning better engineering practices, and becoming someone the team can rely on.
```

### 47. What Is Your Expected Role In A Team?

```text
I expect to own assigned frontend work, collaborate with backend and QA, follow team standards, improve quality where I can, and grow toward more responsibility.
```

### 48. How Do You Handle Repetitive Defects?

```text
I look for the pattern behind them. If the same type of issue repeats, I improve validation, add tests, create a reusable helper, or document the correct pattern.
```

### 49. How Do You Ensure You Understand A Requirement?

```text
I restate the requirement in my own words, ask about edge cases, confirm API contract and validation rules, and align on acceptance criteria before development.
```

### 50. Why Should We Hire You?

```text
You should hire me because I have practical Angular frontend experience, good ownership, and a production-focused mindset. I can build features, integrate APIs, debug issues, communicate clearly, and deliver maintainable code for enterprise applications.
```

## Your Questions For The Manager

Ask 2-3 at the end:

```text
What does success look like for this role in the first 3 months?
```

```text
What kind of Angular architecture and state management pattern does the team follow?
```

```text
Is the work mostly new development, enhancements, migration, or production support?
```

```text
How does the team handle code reviews and releases?
```

```text
What are the main challenges the frontend team is solving right now?
```
