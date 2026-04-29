import express from 'express';

const app = express();

app.get('/healthz', (request, response) => {
  response.json({status: 'alive'});
});

app.get('/readyz', async (request, response) => {
  response.json({status: 'ready'});
});

export {app};

