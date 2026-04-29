function maxSubArray(nums) {
  let curr = nums[0], max = nums[0];
  for (let i = 1; i < nums.length; i++) {
    curr = Math.max(nums[i], curr + nums[i]);
    max = Math.max(max, curr);
  }
  return max;
}
// [-2,1,-3,4,-1,2,1,-5,4] → 6

// Time: O(n)  Space: O(1)