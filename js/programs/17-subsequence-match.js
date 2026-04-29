function isSubsequence(str, search) {
  let i = 0;
  for (let j = 0; j < str.length && i < search.length; j++) {
    if (str[j] === search[i]) i++;
  }
  return i === search.length;
}

function autocomplete(functions, query) {
  return functions.filter(fn => isSubsequence(fn, query)).length;
}
// autocomplete(["replacefirst","listnodes"], "li") → 1