let accessToken = 'access-token';
let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken() {
  refreshPromise ??= fetch('/api/auth/refresh', {method: 'POST'})
    .then((response) => response.json())
    .then((body: {accessToken: string}) => body.accessToken)
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
}

export async function authFetch(input: RequestInfo, init: RequestInit = {}) {
  const response = await fetch(input, {
    ...init,
    headers: {
      ...init.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 401) {
    return response;
  }

  accessToken = await refreshAccessToken();

  return fetch(input, {
    ...init,
    headers: {
      ...init.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

