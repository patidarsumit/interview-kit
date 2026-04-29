import http from 'node:http';

const server = http.createServer((request, response) => {
  if (request.url === '/health' && request.method === 'GET') {
    response.writeHead(200, {'content-type': 'application/json'});
    response.end(JSON.stringify({status: 'ok'}));
    return;
  }

  response.writeHead(404, {'content-type': 'application/json'});
  response.end(JSON.stringify({message: 'Not found'}));
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

