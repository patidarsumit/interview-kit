function characterFrequency(s) {
  const frequency = {};

  for (const char of s) {
    frequency[char] = (frequency[char] || 0) + 1;
  }

  return frequency;
}

console.log(characterFrequency('interview')); // { i: 2, n: 1, t: 1, e: 2, r: 1, v: 1, w: 1 }
