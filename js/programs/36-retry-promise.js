function retryPromise(fn, retries, delay = 0) {
  return fn().catch(error => {
    if (retries === 0) throw error;

    return new Promise(resolve => setTimeout(resolve, delay))
      .then(() => retryPromise(fn, retries - 1, delay));
  });
}

let attempts = 0;

function unstableRequest() {
  attempts++;
  if (attempts < 3) return Promise.reject(new Error('Failed'));
  return Promise.resolve('Success');
}

retryPromise(unstableRequest, 3, 100).then(console.log); // Success
