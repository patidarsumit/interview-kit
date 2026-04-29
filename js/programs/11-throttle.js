function throttle(fn, limit) {
  let flag = true;

  return function (...args) {
    if (flag) {
      fn.apply(this, args);
      flag = false;

      setTimeout(() => {
        flag = true;
      }, limit);
    }
  };
}

function log(message) {
  console.log(message);
}

const throttledLog = throttle(log, 2000);

throttledLog('First call runs'); // First call runs
throttledLog('Second call ignored'); // Ignored
setTimeout(() => throttledLog('Third call runs after 3 seconds'), 3000);
