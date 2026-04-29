const buckets = new Map();

export function rateLimit({limit, windowMs}) {
  return (request, response, next) => {
    const key = request.ip ?? request.socket.remoteAddress;
    const now = Date.now();
    const bucket = buckets.get(key) ?? {count: 0, resetAt: now + windowMs};

    if (now > bucket.resetAt) {
      bucket.count = 0;
      bucket.resetAt = now + windowMs;
    }

    bucket.count += 1;
    buckets.set(key, bucket);

    if (bucket.count > limit) {
      response.status(429).json({message: 'Too many requests'});
      return;
    }

    next();
  };
}

