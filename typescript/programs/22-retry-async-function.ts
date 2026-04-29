async function retry<T>(
  operation: () => Promise<T>,
  attempts: number,
  delayMs: number,
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      if (attempt < attempts) {
        await sleep(delayMs);
      }
    }
  }

  throw lastError;
}

function sleep(delayMs: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}

async function demo(): Promise<void> {
  let count = 0;

  const result = await retry(async () => {
    count += 1;

    if (count < 2) {
      throw new Error('Try again');
    }

    return 'success';
  }, 3, 100);

  console.log(result);
}

void demo();

