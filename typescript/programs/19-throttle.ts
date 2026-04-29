function throttle<TArgs extends unknown[]>(
  callback: (...args: TArgs) => void,
  delayMs: number,
): (...args: TArgs) => void {
  let lastRun = 0;

  return (...args: TArgs) => {
    const now = Date.now();

    if (now - lastRun >= delayMs) {
      lastRun = now;
      callback(...args);
    }
  };
}

const trackScroll = throttle((position: number) => {
  console.log(position);
}, 500);

trackScroll(120);
trackScroll(140);

