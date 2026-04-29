function floodFill(image, sr, sc, color) {
  const original = image[sr][sc];
  if (original === color) return image;

  const rows = image.length;
  const cols = image[0].length;

  function dfs(row, col) {
    if (row < 0 || col < 0 || row >= rows || col >= cols || image[row][col] !== original) {
      return;
    }

    image[row][col] = color;
    dfs(row + 1, col);
    dfs(row - 1, col);
    dfs(row, col + 1);
    dfs(row, col - 1);
  }

  dfs(sr, sc);
  return image;
}

console.log(floodFill([[1, 1, 1], [1, 1, 0], [1, 0, 1]], 1, 1, 2));
// [[2, 2, 2], [2, 2, 0], [2, 0, 1]]
