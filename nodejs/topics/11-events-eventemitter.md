# 11. Events And EventEmitter

Node.js uses event-driven programming heavily.

`EventEmitter` lets objects emit named events and listeners react to them.

## Basic Example

```js
import {EventEmitter} from 'node:events';

const emitter = new EventEmitter();

emitter.on('user.created', (user) => {
  console.log('User created', user.id);
});

emitter.emit('user.created', {id: 'u1'});
```

## Common Uses

- internal application events
- stream events
- socket events
- job lifecycle
- plugin systems
- decoupling modules

## once

Use `once` for one-time listeners.

```js
emitter.once('ready', () => {
  console.log('Ready once');
});
```

## error Event

Special case:

```js
emitter.emit('error', new Error('Failed'));
```

If no `error` listener exists, Node.js can throw.

Always handle error events on emitters that may emit errors.

## Listener Leaks

Adding listeners without removing them can cause memory leaks.

```js
emitter.on('data', handler);
emitter.off('data', handler);
```

Node.js warns when many listeners are added to the same event.

## Common Mistakes

- forgetting error listeners
- leaking listeners
- using events where direct function calls are clearer
- hiding important business flow in too many events
- no event naming convention

## Senior Best Practices

- use events for decoupled reactions
- handle `error`
- remove listeners when no longer needed
- keep event payloads typed/documented
- avoid overusing events for core business flow

## Interview Questions

### What is EventEmitter?

A Node.js class for emitting named events and registering listeners.

### Why is the `error` event special?

If emitted without an error listener, it can crash the process.

### What causes listener leak warnings?

Adding many listeners to the same event, often because cleanup is missing.

