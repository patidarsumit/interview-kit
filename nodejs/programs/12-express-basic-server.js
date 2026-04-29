import express from 'express';

const app = express();

app.use(express.json());

app.get('/health', (request, response) => {
  response.json({status: 'ok'});
});

app.listen(3000, () => {
  console.log('API running on http://localhost:3000');
});

