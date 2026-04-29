import {http, HttpResponse} from 'msw';

export const handlers = [
  http.get('/api/users', () => {
    return HttpResponse.json([{id: 'u1', name: 'Sumit'}]);
  }),
];

