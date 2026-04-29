function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!promises.length) return resolve([]);
    const results = [];
    let count = 0;
    promises.forEach((p, i) => {
      Promise.resolve(p).then(val => {
        results[i] = val;  // preserve order
        if (++count === promises.length) resolve(results);
      }).catch(reject);    // any rejection kills all
    });
  });
}

const p1 = Promise.resolve(1);
const p2 = 2;
const p3 = new Promise(resolve => setTimeout(() => resolve(3), 100));

myPromiseAll([p1, p2, p3]).then(console.log); // [1, 2, 3]
