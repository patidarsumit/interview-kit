import http from 'node:http';

const server = http.createServer((request, response) => {
  response.end('ok');
});

server.listen(3000);

function shutdown(signal) {
  console.log(`Received ${signal}. Closing server.`);

  server.close((error) => {
    if (error) {
      console.error(error);
      process.exit(1);
    }

    process.exit(0);
  });
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

