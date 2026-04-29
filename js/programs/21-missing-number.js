function missingNumber(nums) {
  let expected = nums.length;

  for (let i = 0; i < nums.length; i++) {
    expected += i - nums[i];
  }

  return expected;
}

console.log(missingNumber([3, 0, 1])); // 2
console.log(missingNumber([0, 1])); // 2
