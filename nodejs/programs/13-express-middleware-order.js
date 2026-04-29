import express from 'express';

const app = express();

app.use((request, response, next) => {
  request.startedAt = Date.now();
  next();
});

app.use(express.json());

app.get('/example', (request, response) => {
  response.json({
    message: 'middleware ran before route',
    startedAt: request.startedAt,
  });
});

export {app};

