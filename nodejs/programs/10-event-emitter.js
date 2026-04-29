import {EventEmitter} from 'node:events';

const events = new EventEmitter();

events.on('user.created', (user) => {
  console.log('Send welcome email to', user.email);
});

events.emit('user.created', {
  id: 'u1',
  email: 'sumit@example.com',
});

