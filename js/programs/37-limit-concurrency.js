function limitConcurrency(tasks, limit) {
  return new Promise((resolve, reject) => {
    const results = [];
    let nextIndex = 0;
    let completed = 0;
    let running = 0;

    function runNext() {
      if (completed === tasks.length) return resolve(results);

      while (running < limit && nextIndex < tasks.length) {
        const currentIndex = nextIndex++;
        running++;

        Promise.resolve()
          .then(tasks[currentIndex])
          .then(result => {
            results[currentIndex] = result;
            completed++;
            running--;
            runNext();
          })
          .catch(reject);
      }
    }

    runNext();
  });
}

const tasks = [
  () => Promise.resolve('A'),
  () => Promise.resolve('B'),
  () => Promise.resolve('C'),
];

limitConcurrency(tasks, 2).then(console.log); // ['A', 'B', 'C']
