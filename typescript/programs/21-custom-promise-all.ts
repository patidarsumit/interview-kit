type AwaitedTuple<T extends readonly unknown[]> = {
  [K in keyof T]: Awaited<T[K]>;
};

function promiseAll<T extends readonly unknown[]>(
  values: readonly [...T],
): Promise<AwaitedTuple<T>> {
  return new Promise((resolve, reject) => {
    const results: unknown[] = [];
    let completed = 0;

    if (values.length === 0) {
      resolve([] as AwaitedTuple<T>);
      return;
    }

    values.forEach((value, index) => {
      Promise.resolve(value)
        .then((result) => {
          results[index] = result;
          completed += 1;

          if (completed === values.length) {
            resolve(results as AwaitedTuple<T>);
          }
        })
        .catch(reject);
    });
  });
}

async function demo(): Promise<void> {
  const result = await promiseAll([
    Promise.resolve(1),
    Promise.resolve('hello'),
    true,
  ] as const);

  console.log(result);
}

void demo();

