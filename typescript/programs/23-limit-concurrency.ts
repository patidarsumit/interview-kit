async function limitConcurrency<T>(
  tasks: Array<() => Promise<T>>,
  limit: number,
): Promise<T[]> {
  const results: T[] = [];
  let nextIndex = 0;

  async function worker(): Promise<void> {
    while (nextIndex < tasks.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      results[currentIndex] = await tasks[currentIndex]();
    }
  }

  const workers = Array.from(
    { length: Math.min(limit, tasks.length) },
    () => worker(),
  );

  await Promise.all(workers);
  return results;
}

async function demo(): Promise<void> {
  const tasks = [1, 2, 3, 4].map((value) => async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return value * 2;
  });

  console.log(await limitConcurrency(tasks, 2));
}

void demo();

