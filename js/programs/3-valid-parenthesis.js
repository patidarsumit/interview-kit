function isValid(s) {
  const stack = [];
  const map = { ")": "(", "]": "[", "}": "{" };
  for (const c of s) {
    if ("([{".includes(c)) {
      stack.push(c);
    } else {
      if (stack.pop() !== map[c]) return false;
    }
  }
  return stack.length === 0;
}
// Time: O(n)  Space: O(n)

const s = "()[]{}";
console.log(isValid(s)); // Output: true
