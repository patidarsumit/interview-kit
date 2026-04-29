import express from 'express';

const app = express();

app.get('/fail', async () => {
  throw new Error('Something failed');
});

app.use((error, request, response, next) => {
  console.error(error);

  response.status(500).json({
    message: 'Internal server error',
  });
});

export {app};

