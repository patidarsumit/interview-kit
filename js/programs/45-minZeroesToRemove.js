function minZeroesToRemove(s) {
  // Find first and last '1'
  const first = s.indexOf('1');
  const last = s.lastIndexOf('1');

  if (first === -1) return 0; // no 1s

  // Count 0s between first and last '1'
  let count = 0;
  for (let i = first; i <= last; i++) {
    if (s[i] === '0') count++;
  }
  return count;
}


// function minZeroesToRemove(s) {
//   const first = s.indexOf('1');
//   const last = s.lastIndexOf('1');

//   if (first === -1) return 0;

//   return s
//     .slice(first, last + 1)
//     .split('')
//     .filter(ch => ch === '0')
//     .length;
// }

// "0101100111" → first=1, last=9, zeros between: positions 2,4,5 → 3
console.log(minZeroesToRemove("0101100111")); // 3
console.log(minZeroesToRemove("10001"));     // 3
console.log(minZeroesToRemove("111"));       // 0