# Karat Interview Process README

Use this file to understand what will happen in a Karat technical interview and how to prepare for it.

This is especially written for your Citi Bank preparation.

## What Is Karat?

Karat is a third-party technical interview platform used by companies to conduct live coding interviews.

You are usually interviewed by a Karat Interview Engineer, not directly by a Citi engineer.

The interviewer is a professional technical interviewer. Their job is to evaluate your coding, problem solving, communication, and debugging.

## Interview Duration

Most Karat interviews are around `45-60 minutes`.

Karat's public candidate page describes a typical 60-minute interview with:

- brief introduction
- around 10 minutes of discussion questions
- around 40 minutes of programming questions

## High-Level Process

### Step 1: Schedule Interview

You receive a Karat interview link from the recruiter or hiring team.

You select a time slot.

Karat often supports flexible scheduling, including evenings or weekends.

### Step 2: Prepare Your Setup

Before the interview:

- check internet connection
- check microphone
- check camera if required
- keep laptop charged
- join from a quiet place
- use Chrome or recommended browser
- test the coding environment if Karat gives a practice link

### Step 3: Join Interview

You join the live Karat session.

The interviewer introduces themselves and explains the format.

You may be asked:

- your preferred programming language
- whether you can hear and see properly
- whether you are ready to start

For you, use `JavaScript`.

### Step 4: Discussion Questions

This part is usually short.

They may ask JavaScript or computer science concepts.

Examples:

- What is closure?
- What is hoisting?
- Difference between `var`, `let`, and `const`
- What is event loop?
- Difference between debounce and throttle
- What is time complexity?
- What is space complexity?
- Difference between array and object
- Difference between `Map` and object
- What happens in `Promise.all`?

How to answer:

```txt
Definition
Small example
Use case
Any edge case
```

Example:

```txt
A closure is when an inner function remembers variables from its outer function even after the outer function has returned.
For example, a counter function can keep a private count variable.
Closures are used in debounce, throttle, memoization, and private variables.
```

### Step 5: Coding Questions

This is the main part.

You will solve one or more programming questions in a browser IDE.

Common Karat-style coding topics:

- strings
- arrays
- hash maps
- two pointers
- sliding window
- recursion
- DFS/BFS
- matrix traversal
- sorting
- binary search
- graphs
- async JavaScript for frontend roles

Your current practice files already cover these areas well.

## How To Solve During Interview

Use this structure for every problem.

### 1. Repeat the Problem

Say the problem back in your own words.

Example:

```txt
So we need to return the indices of two numbers whose sum equals the target.
```

### 2. Ask Clarifying Questions

Ask only useful questions.

Examples:

```txt
Can there be negative numbers?
Can the input be empty?
Should I return indices or values?
Can there be duplicate values?
Is there always one valid answer?
```

### 3. Explain Brute Force

Give the simple solution first.

Example:

```txt
The brute force approach is to check every pair using nested loops.
That would take O(n^2) time and O(1) space.
```

### 4. Explain Optimized Approach

Then explain the better solution.

Example:

```txt
We can optimize using a Map.
As we loop, we store numbers we have seen.
For each number, we check whether target minus current number already exists.
This gives O(n) time and O(n) space.
```

### 5. Write Code

Write clean code.

Use readable names.

Do not stay silent for too long.

Explain what you are coding.

### 6. Test With Example

After coding, run through the sample manually.

Example:

```txt
nums = [2, 7, 11, 15], target = 9
At 2, need 7, map empty, store 2
At 7, need 2, map has 2
Return [0, 1]
```

### 7. Mention Complexity

Always finish with time and space complexity.

Example:

```txt
Time complexity is O(n) because we loop once.
Space complexity is O(n) because the map can store up to n numbers.
```

## What Karat Evaluates

They mainly evaluate:

- correctness
- problem understanding
- ability to communicate
- code quality
- handling edge cases
- debugging skill
- time and space complexity
- whether your code actually solves the problem

Karat publicly says that the most important thing is how successfully your code solves the problem.

## What To Say While Coding

Good phrases:

```txt
I will start with the simple approach first.
```

```txt
This works, but we can improve the time complexity.
```

```txt
I am using a Map here for constant-time lookup.
```

```txt
Let me test this with the sample input.
```

```txt
One edge case is an empty array.
```

```txt
The time complexity is O(n), and the space complexity is O(n).
```

## What Not To Do

Avoid:

- coding silently for a long time
- jumping into code before understanding the problem
- ignoring edge cases
- saying complexity randomly without reason
- arguing with interviewer
- getting stuck on syntax without explaining your idea
- overcomplicating simple warmup questions

## Do and Don't Checklist

### Do

- speak your thought process clearly
- restate the problem before coding
- ask clarifying questions
- start with brute force if needed
- explain why you choose a data structure
- write simple readable code
- test with sample input
- test one edge case
- mention time and space complexity
- stay calm if the interviewer gives hints
- accept hints positively
- debug out loud
- keep variable names meaningful
- finish a correct solution before trying to make it clever

### Don't

- do not start coding immediately without confirming the problem
- do not stay silent for more than 20-30 seconds
- do not pretend you know something if you are unsure
- do not ignore the interviewer hint
- do not spend too long on syntax perfection
- do not rewrite everything unless needed
- do not jump to advanced algorithms when a simple map or two-pointer solution works
- do not say only `O(n)` without explaining why
- do not panic if the first idea is brute force
- do not argue about the problem constraints
- do not use copy-paste from notes during interview
- do not use AI tools unless explicitly allowed

## Best Approach For Karat Coding Questions

Use this exact approach.

### 1. Understand First

Do not code first.

Say:

```txt
Let me make sure I understand the problem.
We need to...
```

Then repeat the requirement.

### 2. Clarify Inputs and Outputs

Ask:

```txt
What should I return if there is no answer?
Can the input be empty?
Are duplicates allowed?
Should I return index or value?
Is the input sorted?
```

Only ask questions that affect your solution.

### 3. Start With Brute Force

Even if brute force is slow, explaining it shows that you understand the problem.

Say:

```txt
The brute force way is...
This would be O(...).
Now I can optimize it.
```

### 4. Move To Optimized Solution

Pick the right pattern:

| Problem clue | Best pattern |
| --- | --- |
| Need fast lookup | `Map` or `Set` |
| Sorted array | two pointers or binary search |
| Longest/shortest substring | sliding window |
| All combinations | recursion/backtracking |
| Grid/matrix connected area | DFS/BFS |
| Dependencies/order | graph/topological sort |
| Overlapping ranges | sort + merge intervals |
| Repeated async tasks | promise/concurrency pattern |

### 5. Code Cleanly

Good code habits:

- use `const` when value does not change
- use `let` when value changes
- avoid one-letter names except `i`, `j`
- keep helper functions small
- return early for edge cases
- avoid unnecessary clever tricks

### 6. Dry Run

After coding, do not just say "done".

Say:

```txt
Let me dry run with the sample input.
```

Walk through the important variables.

### 7. Test Edge Cases

Mention at least one or two:

```txt
Empty input
Single item
Duplicate values
Negative numbers
No match found
Already sorted input
All same characters
```

### 8. Complexity

End with:

```txt
Time complexity is ___ because ___.
Space complexity is ___ because ___.
```

Never give only the Big O. Always give the reason.

## Best Communication Style

Speak like this:

```txt
I am thinking of using a Map because it gives constant-time lookup.
```

```txt
This condition handles the empty input case.
```

```txt
Now I am moving the left pointer because the window is invalid.
```

```txt
This loop visits each element once, so the time complexity is O(n).
```

Avoid:

```txt
I don't know.
```

Better:

```txt
I am not sure of the optimal solution yet, but I can start with a correct brute force approach and improve it.
```

Avoid:

```txt
Wait, this is wrong.
```

Better:

```txt
I found an issue in this condition. Let me dry run and fix it.
```

## Best Debugging Approach

If output is wrong:

1. Do not panic.
2. Use a small input.
3. Print or trace key variables mentally.
4. Check loop bounds.
5. Check return value.
6. Check edge cases.

Common bugs:

- off-by-one error
- wrong loop condition
- forgot to update pointer
- forgot to return result
- mutating input accidentally
- using `if (map[key])` instead of checking existence
- using `slice` when you meant `splice`, or opposite
- comparing objects by value instead of reference

## Best Strategy If Time Is Running Out

If only a few minutes are left:

- finish the working version
- explain what you would optimize
- mention complexity
- test at least one example

Say:

```txt
Given the time, I will finish the correct version first.
If I had more time, I would optimize this part using...
```

## Best Mindset

Karat interviewers are not expecting silence and perfection.

They are looking for:

- can you understand a problem?
- can you communicate?
- can you write correct code?
- can you debug?
- can you improve your first idea?

Correct, simple, well-explained code is better than clever incomplete code.

## If You Get Stuck

Do this:

```txt
Let me step back and try a smaller example.
```

```txt
I think the issue is in this condition. I will dry run it once.
```

```txt
The brute force solution is clear. I will write that first, then optimize if time allows.
```

This is much better than staying silent.

## If You Do Not Know the Best Solution

Start with brute force.

Say:

```txt
I know this is not optimal, but I want to get a correct solution first.
Then I can improve it.
```

Correct working code is better than an incomplete clever solution.

## Common Citi/Karat Prep Focus

For your current prep, focus most on:

- arrays
- strings
- hash maps
- sliding window
- two pointers
- recursion
- matrix DFS
- graph basics
- time and space complexity
- JavaScript concepts
- output-based questions

Your files that help most:

- `javascript-concepts-cheatsheet.md`
- `javascript-output-questions.md`
- `time-space-complexity-cheatsheet.md`
- coding questions `1` to `39`

## Final 24-Hour Preparation Plan

### Morning

Revise:

- closures
- hoisting
- event loop
- promises
- array methods
- string methods

### Afternoon

Practice coding:

- two sum
- longest substring
- group anagrams
- product except self
- debounce
- promise all
- number of islands
- course schedule
- LRU cache

### Evening

Practice speaking:

- brute force
- optimized solution
- complexity
- edge cases
- dry run

### Before Interview

Review:

- `time-space-complexity-cheatsheet.md`
- `javascript-output-questions.md`
- `javascript-concepts-cheatsheet.md`

## Simple Interview Template

Use this in every coding question:

```txt
Let me restate the problem.

The brute force approach is...

The optimized approach is...

I will use this data structure because...

Now I will code it.

Let me dry run with an example.

Time complexity is...

Space complexity is...
```

## Sources

- Karat Candidate Experience: https://karat.com/candidate-experience/
- Karat Interview Questions Explained: https://karat.com/karat-interview-questions-explained/
- Karat Technical Interview Guide: https://karat.com/guide-to-technical-interviews/
- Karat Candidate FAQ: https://customer-operations.zendesk.com/hc/en-us/articles/30935741301527-Candidate-Resource-FAQ
