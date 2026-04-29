import path from 'node:path';

export function safeJoin(baseDirectory, userPath) {
  const resolvedBase = path.resolve(baseDirectory);
  const resolvedTarget = path.resolve(resolvedBase, userPath);

  if (!resolvedTarget.startsWith(resolvedBase + path.sep)) {
    throw new Error('Invalid path');
  }

  return resolvedTarget;
}

