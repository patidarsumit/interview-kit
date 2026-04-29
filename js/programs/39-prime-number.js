function isPrime(n) {
  if (n <= 1) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;

  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }

  return true;
}

function primesUpTo(n) {
  const result = [];

  for (let num = 2; num <= n; num++) {
    if (isPrime(num)) result.push(num);
  }

  return result;
}

console.log(isPrime(17)); // true
console.log(isPrime(18)); // false
console.log(primesUpTo(20)); // [2, 3, 5, 7, 11, 13, 17, 19]
