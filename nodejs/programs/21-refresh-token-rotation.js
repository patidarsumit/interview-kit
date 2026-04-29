import {randomUUID} from 'node:crypto';

const refreshTokens = new Map();

export function rotateRefreshToken(oldToken, userId) {
  if (oldToken && !refreshTokens.has(oldToken)) {
    throw new Error('Refresh token reuse detected');
  }

  if (oldToken) {
    refreshTokens.delete(oldToken);
  }

  const nextToken = randomUUID();
  refreshTokens.set(nextToken, {userId, createdAt: Date.now()});

  return nextToken;
}
