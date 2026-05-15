# 01. Karat Citi Findings And Strategy

## What Karat Officially Says

Karat conducts live technical interviews for client companies. Their own candidate page says the interview is 60 minutes and includes:

- brief introduction
- discussion questions
- programming questions

Karat states that the programming portion is about 40 minutes. Karat support material also describes a 45-60 minute interview that can include past-work discussion, technical topics, design, writing, debugging, or reviewing code.

Important official details:

- The interviewer is a professional Interview Engineer.
- The interview happens through video and Karat Studio, their browser coding environment.
- The interview is recorded and shared with the hiring company.
- The hiring company receives video, code playback, and a structured report.
- At least half the interview is normally coding.
- You may ask clarifying questions.
- The interviewer can provide hints if you are stuck.
- Code does not always need to be perfect to be evaluated, but for multi-part problems you usually need a working current part before moving forward.
- They may ask runtime and space complexity.
- Documentation lookup may be allowed during coding if you tell the interviewer, but using AI to generate an approach or solution is not allowed.

## Citi-Specific Signals From Public Sources

Citi frontend Angular job descriptions emphasize:

- Angular SPA design and maintenance.
- Responsive, performant, accessible UI.
- REST API and microservice integration.
- TypeScript, JavaScript, HTML5, CSS3.
- Angular CLI, npm/yarn, build pipelines.
- RxJS and NgRx / state management.
- Jasmine, Karma, Jest, unit and integration testing.
- Enterprise Git / Bitbucket.
- Agile delivery.
- Debugging production issues.
- Financial-services reliability and security mindset.

Public Citi / Karat discussions are not guaranteed question lists, but they repeatedly point to this pattern:

- recruiter or Karat email may mention experience discussion, knowledge questions, and multi-part coding
- frontend candidates ask specifically about Angular + JavaScript
- some candidates report receiving existing code and being asked to add functionality
- some reports mention basic language questions before the coding exercise

Treat this as a practical screen, not only LeetCode. For Angular frontend, the coding can be:

- pure JavaScript / TypeScript algorithm
- frontend data transformation
- DOM / UI behavior
- debug or extend provided code
- Angular-flavored design discussion before/after coding

## How Karat Will Probably Evaluate You

They are not only checking final answer. They are watching:

- Can you understand requirements quickly?
- Do you clarify input and output?
- Can you choose simple data structures?
- Can you code in a browser editor without full IDE support?
- Do you test with examples?
- Do you handle edge cases?
- Can you explain time and space complexity?
- Do you communicate when stuck?
- Is the code readable enough for another engineer?

For Citi, add:

- Do you think about reliability?
- Do you avoid risky frontend security mistakes?
- Do you understand API integration and failure handling?
- Do you write maintainable enterprise code?
- Do you know Angular deeply enough to join an existing large app?

## Best Strategy For The 20-Minute Discussion

Keep answers short and strong. Do not spend 5 minutes explaining one topic unless asked.

Use this format:

```text
Definition -> project usage -> tradeoff / production concern
```

Example:

```text
An interceptor is a cross-cutting HTTP layer. I use it for auth headers, request correlation, centralized error handling, and retry rules. I keep business-specific logic out of it, because interceptors affect every request and can create hidden behavior.
```

For Citi, connect answers to enterprise frontend:

```text
In banking applications I would be careful with token storage, access control, auditability, accessible forms, API error states, and avoiding sensitive data in logs or browser storage.
```

## Best Strategy For The 40-Minute Coding

Use the first 2 minutes well:

1. Repeat the problem in your own words.
2. Ask about input type, output type, constraints, and edge cases.
3. Give a simple approach.
4. Code.

Use this spoken pattern:

```text
I will first solve it clearly with a map / set / two pointers. After that I will run the sample and add edge cases. The time complexity should be O(n), with O(n) extra space because of the map.
```

During coding:

- Narrate meaningful decisions.
- Keep variable names readable.
- Do not over-engineer.
- Build helper functions when they improve clarity.
- Run through examples manually if no test runner is available.
- Fix one bug at a time.

## What To Avoid

- Going silent for long stretches.
- Jumping to code without clarifying.
- Chasing the most optimal solution before a working solution.
- Writing Angular theory answers like textbook definitions only.
- Forgetting complexity.
- Using AI-generated solutions during the interview.
- Looking at documentation without telling the interviewer.
- Switching windows or using multiple screens in a way that could look suspicious.

## Recommended Setup

- Use Chrome or Firefox.
- Use stable internet.
- Use one monitor if possible.
- Keep only required tabs open.
- Keep camera and microphone tested.
- Practice in a plain editor before the interview.

## Most Likely Karat Frontend Flow

```text
0-5 min:
  Intro, resume summary, role context.

5-20 min:
  Angular / JavaScript / browser / project knowledge.

20-55 min:
  Live coding, often one multi-part problem or two smaller problems.

55-60 min:
  Complexity, edge cases, final questions.
```

## Confidence Levels

High confidence:

- 60-minute live video format.
- Discussion + coding split.
- Browser-based coding.
- Complexity and edge-case discussion.
- JavaScript / TypeScript / Angular relevance for your role.

Medium confidence:

- Existing-code extension or debugging task.
- 20-minute discussion + 40-minute coding exact split.
- Angular-specific coding rather than pure JS/TS.

Low confidence:

- Any exact question from Reddit or Glassdoor.
- Whether Citi uses Karat Studio, Codility, or another integrated coding environment for your exact requisition.

