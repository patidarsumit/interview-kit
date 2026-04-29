import {Worker, isMainThread, parentPort, workerData} from 'node:worker_threads';

function fibonacci(n) {
  if (n <= 1) {
    return n;
  }

  return fibonacci(n - 1) + fibonacci(n - 2);
}

if (isMainThread) {
  const worker = new Worker(new URL(import.meta.url), {
    workerData: 40,
  });

  worker.on('message', (result) => {
    console.log('Result:', result);
  });
} else {
  parentPort.postMessage(fibonacci(workerData));
}

