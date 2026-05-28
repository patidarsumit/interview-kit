function removeDuplicatesAndSort(arr) {
  return [...new Set(arr)].sort((a, b) => a - b);
}

console.log(removeDuplicatesAndSort([4, 2, 1, 2, 4, 3])); // [1, 2, 3, 4]
