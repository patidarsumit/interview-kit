# Karat Interviewer Simulation Guide

Use this file to understand how your Karat interview may feel from start to finish.

I am writing this as if I am your Karat Interview Engineer.

## My Interviewer Mindset

I want the interview to feel as close to normal programming work as possible.

You will still feel time pressure, because this is an interview, but the goal is not to trick you.

I am mainly checking:

- can you understand a problem?
- can you turn an idea into working code?
- can you fix bugs and edge cases?
- can you explain final time and space complexity?

The most important thing is working code.

Optimality matters, but it is secondary to solving the problem.

Code quality, naming, and testing are useful, but they are not the main scoring criteria.

## Full Interview Flow

## 1. Joining the Interview

I will start with a quick introduction.

I may say:

```txt
Hi, I am your Karat Interview Engineer today.
We will start with a short discussion section, then spend most of the time coding.
You can use JavaScript.
You can run your code as much as you want.
You can ask clarifying questions at any time.
```

What you should do:

- greet politely
- confirm you will use JavaScript
- keep your editor ready
- keep calm

Good response:

```txt
Sounds good. I will use JavaScript.
```

## 2. First Section: Discussion, Analysis, or Code Review

This section may be around `10-20 minutes`.

Depending on the role, it may be:

- project discussion
- JavaScript concept questions
- system/design discussion
- code review
- short skills test

I should explain how this section will be evaluated.

If I do not explain clearly, you can ask:

```txt
Before we start, could you clarify what you are mainly evaluating in this section?
```

## If It Is A Project Discussion

I may ask:

```txt
Tell me about a project you worked on recently.
```

You should answer using this structure:

```txt
Project context
Your responsibility
Technical challenge
What you implemented
Result
What you learned
```

Example:

```txt
I worked on a dashboard feature where users could filter and view transaction data.
My responsibility was building the frontend flow and integrating APIs.
The main challenge was handling large data and keeping filters responsive.
I used debouncing for search, memoized derived data, and handled loading and error states.
The feature improved usability and reduced unnecessary API calls.
```

## If It Is JavaScript Concept Questions

I may ask:

- What is closure?
- What is hoisting?
- Difference between `var`, `let`, and `const`
- What is event loop?
- What is debounce?
- What is throttle?
- Difference between `call`, `apply`, and `bind`
- Difference between `map`, `filter`, and `reduce`
- Difference between `slice` and `splice`
- What is a Promise?
- What is `Promise.all`?

Best answer format:

```txt
Definition
Small example
Use case
Important warning
```

Example:

```txt
Debounce delays a function until calls stop for a certain time.
It is useful for search input.
If a user types quickly, we do not call the API for every key press.
Only the final call runs after the delay.
```

## If It Is Code Review

I may show code and ask:

```txt
What issues do you see here?
How would you improve this?
```

Look for:

- correctness bugs
- missing edge cases
- inefficient loops
- bad variable names
- mutation bugs
- async bugs
- missing error handling
- unsafe DOM usage like `innerHTML`
- repeated code

Good response:

```txt
I see one correctness issue first...
Then I see a possible edge case...
After that I would improve readability...
```

Prioritize bugs first.

## 3. Programming Section Starts

This section is usually `30` or `45 minutes`.

I will make sure you get the full programming time, even if the first section ran long.

I will present a problem.

I may say:

```txt
Here is the first programming problem.
Take a moment to read it.
You can ask clarifying questions before coding.
```

Your job:

- understand the problem
- ask clarifying questions
- describe an algorithm
- code it
- run it
- fix bugs
- check edge cases
- explain complexity

## 4. How You Should Start Every Problem

Do not start typing immediately.

Say:

```txt
Let me restate the problem to make sure I understand it.
```

Then say what input is and what output should be.

Example:

```txt
We are given an array of numbers and a target.
We need to return the indices of two numbers that add up to the target.
```

## 5. Clarifying Questions

Ask questions that affect code.

Good questions:

```txt
Can the input be empty?
Can there be duplicate values?
Are negative numbers allowed?
Should I return indices or values?
Is the input sorted?
What should I return if there is no valid answer?
Can I modify the input?
```

Bad questions:

```txt
Which algorithm should I use?
Is this easy?
Can you give me the answer?
```

## 6. Describe Your Algorithm

Before coding, explain your approach.

Example:

```txt
The brute force approach would check all pairs, which is O(n^2).
I can improve this using a Map.
As I loop through the array, I store each number and its index.
For every number, I check if target minus current number already exists in the map.
```

Important:

If you only know brute force, start with it.

Do not spend more than `1-2 minutes` searching for a perfect solution.

Working code matters most.

Good phrase:

```txt
I know this may not be optimal, but I can get a correct solution first and then improve it if time allows.
```

## 7. Choose Your Language

Use JavaScript.

I may ask:

```txt
What language would you like to use?
```

Say:

```txt
I will use JavaScript.
```

## 8. Coding Behavior I Like To See

You may speak as much or as little as you want while coding.

I can follow your code even if you are not explaining every line.

But it helps to say short updates:

```txt
I am creating a map for quick lookup.
```

```txt
This handles the empty input case.
```

```txt
Now I am checking if the complement exists.
```

Do not over-explain every character.

Just keep me aware of your reasoning.

## 9. Run Code Often

There is no penalty for running code.

In fact, candidates usually do better when they run code more.

Best approach:

- write a small part
- run it
- test sample input
- fix quickly
- add edge case
- run again

Do not wait until the end to test everything.

Good phrase:

```txt
Let me run this with the sample case first.
```

## 10. Debugging

If code fails, do not panic.

I am watching how you debug.

Say:

```txt
Let me trace the variables on this input.
```

Then check:

- loop start and end
- pointer movement
- map/set content
- return value
- off-by-one errors
- empty input
- duplicate values

Good debugging behavior:

```txt
The output is wrong because I am updating the map before checking the complement.
I will switch the order.
```

Bad debugging behavior:

```txt
I don't know why this is not working.
```

Better:

```txt
I am not sure yet, so I will test a smaller example and trace it.
```

## 11. Edge Case Check Before Saying Done

When you think the solution works, take `30-60 seconds`.

Ask yourself:

- empty input?
- one item?
- duplicates?
- negative numbers?
- no valid result?
- all same values?
- very large input?
- input already sorted?
- input with nested values?

Say:

```txt
Before I call this complete, let me quickly check edge cases.
```

Important:

There may be a small penalty if I have to point out an edge case that you could have found.

But do not spend too long.

One minute is enough.

## 12. Complexity Explanation

Once your solution is fully working, I will ask:

```txt
What is the time and space complexity?
```

Answer for the final code, not your original idea.

Format:

```txt
Time complexity is ___ because ___.
Space complexity is ___ because ___.
```

Example:

```txt
Time complexity is O(n) because we loop through the array once.
Space complexity is O(n) because the map can store up to n elements.
```

Do not just say:

```txt
O(n)
```

Explain why.

## 13. If You Finish A Problem

If time remains, I will give you another problem.

There are always multiple programming problems available.

I may say:

```txt
Great, let's move to the next problem.
```

Do not be surprised.

This is normal.

Your goal is to solve as many as you can correctly.

## 14. What I Am Actually Scoring

Main factor:

- did you solve the problem fully?

Secondary factor:

- how optimal was your solution in Big-O time and space?

Recorded but less important:

- code quality
- naming
- factoring
- testing amount

This does not mean code quality is useless.

Clean code helps you think clearly.

But do not waste time gold-plating.

## 15. What Not To Waste Time On

Do not spend too much time on:

- perfect formatting
- over-engineering helper classes
- clever one-liners
- advanced data structures not needed
- rewriting working code for style only
- proving every tiny case after it already works

If I think you are spending time on something that does not help your score, I may guide you.

Example:

```txt
This looks good enough. Let's move on.
```

Listen to that.

## 16. Data Structures You Should Expect

Problems should be solvable with common data structures:

- arrays
- strings
- objects
- maps
- sets
- stacks
- queues
- lists

You should not need rare or esoteric data structures.

For JavaScript, know these well:

```js
const map = new Map();
map.set(key, value);
map.get(key);
map.has(key);
map.delete(key);
```

```js
const set = new Set();
set.add(value);
set.has(value);
set.delete(value);
```

```js
const stack = [];
stack.push(value);
stack.pop();
```

```js
const queue = [];
queue.push(value);
queue.shift();
```

For large queues, avoid repeated `shift()` if performance matters. Use an index pointer.

## 17. Looking Up APIs

You are allowed to look up API references while programming.

But knowing common methods saves time.

Know these:

- `push`
- `pop`
- `shift`
- `unshift`
- `slice`
- `splice`
- `map`
- `filter`
- `reduce`
- `sort`
- `includes`
- `indexOf`
- `split`
- `join`
- `substring`
- `toLowerCase`
- `trim`
- `Map`
- `Set`

## 18. My Best Advice As Your Karat Interviewer

Your best strategy:

```txt
Correct first.
Optimal second.
Clean enough.
Test quickly.
Move on.
```

If you have a working approach, do not spend too long searching for a better one.

If you have extra time after it works, then optimize.

## 19. Ideal Candidate Behavior

This is what a strong candidate sounds like:

```txt
I understand the input and output.
I will ask one clarification about duplicates.
The brute force solution is O(n^2).
I can optimize with a Map to O(n).
I will code that.
Let me run the sample.
Now I will check an edge case.
The final time is O(n), and space is O(n).
```

## 20. Bad Candidate Behavior

Avoid this:

```txt
Starts coding immediately.
Does not clarify return value.
Gets stuck silently.
Does not run code.
Says done without testing.
Cannot explain complexity.
Spends five minutes renaming variables after code works.
```

## 21. End Of Interview

At the end, I may say:

```txt
That's all the time we have.
Thank you for interviewing today.
Your recruiter will follow up with next steps.
```

You can ask a quick final question if there is time.

Good question:

```txt
Is there anything you recommend I continue practicing?
```

Do not ask:

```txt
Did I pass?
```

I usually cannot answer that.

## 22. Your Final Day Checklist

Before interview:

- revise JavaScript basics
- revise output questions
- revise time and space complexity
- solve 3-5 easy/medium problems
- practice explaining out loud
- sleep properly
- test internet and microphone

During interview:

- restate problem
- clarify
- describe algorithm
- code
- run often
- debug calmly
- check edge cases
- explain complexity
- move on when solved

## 23. One Page Memory Version

```txt
1. Restate problem
2. Ask clarification
3. Explain brute force
4. Explain chosen algorithm
5. Code in JavaScript
6. Run sample tests
7. Fix bugs
8. Check edge cases for 30-60 seconds
9. Explain time and space complexity
10. Move to next problem if time remains
```

## 24. Best Phrases To Use

```txt
Let me restate the problem first.
```

```txt
Can I assume the input can be empty?
```

```txt
The brute force approach is...
```

```txt
I can optimize this using a Map.
```

```txt
I will get a correct solution first, then optimize if time allows.
```

```txt
Let me run this with the sample input.
```

```txt
Before I say this is complete, let me check edge cases.
```

```txt
Time complexity is O(...) because...
```

```txt
Space complexity is O(...) because...
```

## 25. Final Reminder

Karat is not mainly judging whether you write beautiful production code in 30 minutes.

They are mainly judging whether you can solve programming problems under realistic constraints.

So your priority should be:

```txt
working solution > optimal solution > clean polish
```

Do not ignore clean code, but do not let polish stop you from solving more problems.
