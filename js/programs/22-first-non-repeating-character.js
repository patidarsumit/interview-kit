function firstNonRepeatingCharacter(s) {
  const count = new Map();

  for (const char of s) {
    count.set(char, (count.get(char) || 0) + 1);
  }

  for (let i = 0; i < s.length; i++) {
    if (count.get(s[i]) === 1) return i;
  }

  return -1;
}

console.log(firstNonRepeatingCharacter('leetcode')); // 0
console.log(firstNonRepeatingCharacter('loveleetcode')); // 2
