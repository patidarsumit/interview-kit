import express from 'express';
import {randomUUID} from 'node:crypto';

const app = express();
const users = new Map();

app.use(express.json());

app.get('/users', (request, response) => {
  response.json([...users.values()]);
});

app.post('/users', (request, response) => {
  const id = randomUUID();
  const user = {id, ...request.body};
  users.set(id, user);
  response.status(201).json(user);
});

app.get('/users/:id', (request, response) => {
  const user = users.get(request.params.id);

  if (!user) {
    response.status(404).json({message: 'User not found'});
    return;
  }

  response.json(user);
});

app.delete('/users/:id', (request, response) => {
  users.delete(request.params.id);
  response.status(204).send();
});

export {app};
