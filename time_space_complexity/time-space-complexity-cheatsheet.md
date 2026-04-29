# Time and Space Complexity Cheat Sheet

Use this file before interviews. The goal is not to become a math expert. The goal is to quickly recognize the pattern and explain it clearly.

## The One-Line Meaning

Time complexity = how the number of operations grows when input grows.

Space complexity = how much extra memory grows when input grows.

If input size is `n`, ask:

- How many times am I looping?
- Am I using extra arrays, objects, maps, sets, stacks, queues, or recursion?

## Most Common Big O Values

| Big O | Meaning | Example |
| --- | --- | --- |
| `O(1)` | Constant | Access `arr[0]`, simple math |
| `O(log n)` | Cuts problem in half | Binary search |
| `O(n)` | One full pass | Loop through array once |
| `O(n log n)` | Sorting or divide + merge | `arr.sort()` |
| `O(n^2)` | Nested loop over same input | Compare every pair |
| `O(2^n)` | Try every subset/choice | Some recursion/backtracking |

## Rule 1: Single Loop Is Usually O(n)

```js
for (let i = 0; i < nums.length; i++) {
  console.log(nums[i]);
}
```

Time: `O(n)` because the loop runs once for each item.

Space: `O(1)` if you only use a few variables.

Examples from your files:

- `1-two-some.js` optimized solution: one loop
- `2-longest-substring.js`: one sliding window pass
- `16-max-sub-array.js`: one pass
- `21-missing-number.js`: one pass

## Rule 2: Two Separate Loops Are Still O(n)

```js
for (let i = 0; i < n; i++) {}
for (let j = 0; j < n; j++) {}
```

Time: `O(n + n) = O(2n) = O(n)`

We drop constants, so `2n` becomes `n`.

Interview line:

> I loop through the input twice, so it is still linear time: O(n).

## Rule 3: Nested Loops Are Usually O(n^2)

```js
for (let i = 0; i < nums.length; i++) {
  for (let j = 0; j < nums.length; j++) {
    console.log(nums[i], nums[j]);
  }
}
```

Time: `O(n * n) = O(n^2)`

This means for every item, you scan every item again.

Common brute force examples:

- Two Sum brute force
- Check duplicate pairs
- Compare every string with every other string

Interview line:

> The brute force solution uses nested loops, so the time complexity is O(n squared).

## Rule 4: Different Input Sizes Use Different Letters

```js
for (let i = 0; i < arr1.length; i++) {}
for (let j = 0; j < arr2.length; j++) {}
```

If `arr1` size is `n` and `arr2` size is `m`:

Time: `O(n + m)`

Example:

- `24-merge-two-sorted-arrays.js`

Interview line:

> I visit each array once, so the time is O(n + m).

## Rule 5: Sorting Is Usually O(n log n)

```js
nums.sort((a, b) => a - b);
```

Time: `O(n log n)`

Examples:

- `27-merge-intervals.js` sorts intervals first
- `4-group-anagrams.js` sorts each word

For group anagrams:

If there are `n` words and each word length is `k`:

Time: `O(n * k log k)`

Because each word is sorted.

Interview line:

> Sorting dominates the solution, so the time complexity is O(n log n).

## Rule 6: Binary Search Is O(log n)

Binary search cuts the search area in half every time.

```js
while (left <= right) {
  const mid = Math.floor((left + right) / 2);
}
```

Time: `O(log n)`

Space: `O(1)`

Examples:

- `25-binary-search.js`
- `26-search-in-rotated-array.js`

Interview line:

> Each step removes half of the remaining search space, so the time is O(log n).

## Rule 7: Hash Map or Set Usually Adds O(n) Space

```js
const map = new Map();
for (const num of nums) {
  map.set(num, true);
}
```

Time: `O(n)`

Space: `O(n)` because the map may store every item.

Examples:

- `1-two-some.js`
- `22-first-non-repeating-character.js`
- `23-character-frequency.js`
- `28-valid-sudoku.js`

Interview line:

> I use extra hash storage that can grow with the input, so the space complexity is O(n).

## Rule 8: Output Array Usually Does Not Count Unless Asked

Example:

```js
function productExceptSelf(nums) {
  const result = new Array(nums.length).fill(1);
}
```

Sometimes interviewers say output space does not count as extra space.

So:

- Extra space excluding output: `O(1)`
- Including output: `O(n)`

Example:

- `6-product-of-array.js`

Interview line:

> Excluding the output array, space is O(1). Including the returned result, space is O(n).

## Rule 9: Recursion Uses Stack Space

```js
function dfs(node) {
  if (!node) return;
  dfs(node.left);
  dfs(node.right);
}
```

Space is based on recursion depth.

For a grid DFS:

Time: `O(rows * cols)`

Space: `O(rows * cols)` in the worst case because the recursion stack can grow that large.

Examples:

- `29-number-of-islands.js`
- `30-flood-fill.js`
- `38-flatten-object.js`

Interview line:

> Every cell is visited once, so time is O(rows times cols). The recursion stack can hold many cells in the worst case, so space is also O(rows times cols).

## Rule 10: Queue or Stack Usually Adds O(n) Space

```js
const queue = [];
queue.push(start);
```

If the queue can hold many input items:

Space: `O(n)`

Examples:

- `31-course-schedule.js`

Course schedule:

Let:

- `V` = number of courses
- `E` = number of prerequisites

Time: `O(V + E)`

Space: `O(V + E)`

Interview line:

> I build a graph and process each course and prerequisite once, so time and space are O(V + E).

## Quick Pattern Table

| Pattern | Time | Space |
| --- | --- | --- |
| One loop | `O(n)` | `O(1)` unless storing data |
| Two separate loops | `O(n)` | depends |
| Nested loops same input | `O(n^2)` | usually `O(1)` |
| Hash map counting | `O(n)` | `O(n)` |
| Sorting | `O(n log n)` | depends on sort |
| Binary search | `O(log n)` | `O(1)` |
| Sliding window | `O(n)` | `O(k)` or `O(n)` |
| DFS/BFS grid | `O(rows * cols)` | `O(rows * cols)` |
| Graph traversal | `O(V + E)` | `O(V + E)` |
| Recursion over object/tree | `O(n)` | `O(depth)` |

## How To Say It In Interview

Use this exact structure:

```txt
Time complexity is __ because __.
Space complexity is __ because __.
```

Examples:

```txt
Time complexity is O(n) because I loop through the array once.
Space complexity is O(n) because the map can store up to n items.
```

```txt
Time complexity is O(n log n) because sorting dominates the solution.
Space complexity is O(n) because I store the merged intervals in a result array.
```

```txt
Time complexity is O(rows * cols) because each cell is visited once.
Space complexity is O(rows * cols) in the worst case because of the recursion stack.
```

## Common Mistakes

Do not say nested loops are always `O(n^2)`.

If one loop is over `arr1` and the other is over `arr2`, it may be `O(n * m)`.

Do not count fixed variables as `O(n)` space.

```js
let left = 0;
let right = nums.length - 1;
let max = 0;
```

This is `O(1)` space.

Do not forget recursion stack space.

DFS may look like no extra memory, but recursion uses call stack.

## Memory Trick

Remember this:

```txt
Loop once = O(n)
Loop inside loop = O(n^2)
Cut in half = O(log n)
Sort = O(n log n)
Map/Set = O(n) space
Recursion = stack space
Grid = rows * cols
Graph = vertices + edges
```

## Practice Formula

For every problem, ask these 4 questions:

1. How many times does each input item get touched?
2. Is there sorting?
3. Is there nested looping?
4. Am I storing input-sized data?

If you can answer these, you can calculate complexity in most Karat interviews.
