function debounce(fn, delay) {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

function search(query) {
  console.log(`Searching for ${query}`);
}

const debouncedSearch = debounce(search, 500);
debouncedSearch('j');
debouncedSearch('js');
debouncedSearch('javascript'); // Only this call runs after 500ms
