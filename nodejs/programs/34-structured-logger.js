export function log(level, message, fields = {}) {
  console.log(JSON.stringify({
    level,
    message,
    time: new Date().toISOString(),
    ...fields,
  }));
}

log('info', 'request completed', {
  requestId: 'req-1',
  statusCode: 200,
});

