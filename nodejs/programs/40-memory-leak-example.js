const badCache = new Map();

export function leakyHandler(request, response) {
  badCache.set(request.url, {
    time: Date.now(),
    headers: request.headers,
  });

  response.end('This cache grows forever');
}

const betterCache = new Map();

export function boundedCacheSet(key, value, maxSize = 1000) {
  if (betterCache.size >= maxSize) {
    const oldestKey = betterCache.keys().next().value;
    betterCache.delete(oldestKey);
  }

  betterCache.set(key, value);
}

