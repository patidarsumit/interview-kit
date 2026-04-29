console.log('sync start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

setImmediate(() => {
  console.log('setImmediate');
});

Promise.resolve().then(() => {
  console.log('promise microtask');
});

process.nextTick(() => {
  console.log('nextTick');
});

console.log('sync end');

