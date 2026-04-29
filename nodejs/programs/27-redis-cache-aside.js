export async function getCachedUser({redis, usersRepository, userId}) {
  const key = `user:${userId}`;
  const cached = await redis.get(key);

  if (cached) {
    return JSON.parse(cached);
  }

  const user = await usersRepository.findById(userId);

  if (user) {
    await redis.set(key, JSON.stringify(user), {EX: 60});
  }

  return user;
}

