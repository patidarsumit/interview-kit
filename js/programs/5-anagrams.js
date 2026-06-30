function findAnagrams(s, p) {
  const result = [];
  const pCount = new Array(26).fill(0);
  const sCount = new Array(26).fill(0);
  const a = "a".charCodeAt(0);
  for (const c of p) pCount[c.charCodeAt(0) - a]++;
  for (let i = 0; i < s.length; i++) {
    sCount[s.charCodeAt(i) - a]++;
    if (i >= p.length) sCount[s.charCodeAt(i - p.length) - a]--;
    if (sCount.join(",") === pCount.join(",")) result.push(i - p.length + 1);
  }
  return result;
}

const s = "cbaebabacd",
  p = "abc";
console.log(findAnagrams(s, p)); // Output: [0, 6]

// function findAnagrams(str, s) {
//     const result = [];
//     const sortedS = s.split('').sort().join('');

//     for(let i= 0; i<=str.length; i++) {
//         const sub = str.substring(i, i+ s.length)

//         if(sub.split('').sort().join('') === sortedS) {
//             result.push(i);
//         }
//     }

//     return result;
// }

// console.log(findAnagrams("cbaebabacd", "abc")); // [0, 6]
