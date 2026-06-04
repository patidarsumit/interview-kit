function arrayRotation(arr) {
  const rotations = Number(arr[0]);
  let result = "";

  for (let i = rotations; i < arr.length; i++) {
    result = result + arr[i];
  }

  for (let i = 0; i < rotations; i++) {
    result = result + arr[i];
  }

  return result;
}

console.log(arrayRotation("3216")); // 6321
console.log(arrayRotation("434312")); // 124343
