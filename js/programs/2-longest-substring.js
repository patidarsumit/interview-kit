function lengthOfLongestSubstring(s) {
  const map = new Map();
  let left = 0,
    max = 0;
  for (let right = 0; right < s.length; right++) {
    if (map.has(s[right])) {
      left = Math.max(left, map.get(s[right]) + 1);
    }
    map.set(s[right], right);
    max = Math.max(max, right - left + 1);
  }
  return max;
}
// Time: O(n)  Space: O(n)

const s = "abcabcdabcdbb";
console.log(lengthOfLongestSubstring(s)); // Output: 3


// const s = "abcabcbb";

// function lengthOfLongestSubstringBruteForce(s) {
//     let max = 0;

//     for (let i = 0; i < s.length; i++) {
//         const set = new Set();

//         for (let j = i; j < s.length; j++) {
//             if (set.has(s[j])) {
//                 break;
//             }

//             set.add(s[j]);

//             max = Math.max(max, j - i + 1);
//         }
//     }

//     return max;
// }

// console.log(lengthOfLongestSubstringBruteForce(s)); // 3
