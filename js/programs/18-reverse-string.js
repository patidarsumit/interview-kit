function reverseString(s) {
  const arr = s.split('');
  let l = 0, r = arr.length - 1;
  while (l < r) {
    [arr[l], arr[r]] = [arr[r], arr[l]];
    l++; r--;
  }
  return arr.join('');
}
// Or: s.split('').reverse().join('') — but mention you know why

// Time: O(n)  Space: O(n)

const s = "hello";
console.log(reverseString(s)); // Output: "olleh"