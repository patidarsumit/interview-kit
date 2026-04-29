import {randomUUID} from 'node:crypto';

export function correlationId(request, response, next) {
  const requestId = request.headers['x-request-id'] ?? randomUUID();

  request.requestId = requestId;
  response.setHeader('x-request-id', requestId);

  next();
}

