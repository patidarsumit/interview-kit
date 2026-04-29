import test from 'node:test';
import request from 'supertest';
import {app} from './36-health-check.js';

test('GET /healthz returns alive', async () => {
  await request(app)
    .get('/healthz')
    .expect(200)
    .expect({status: 'alive'});
});

