# 04. Modules: CommonJS And ES Modules

Node.js supports two module systems:

- CommonJS
- ES Modules

Companies often ask this because many Node.js codebases contain both.

## CommonJS

CommonJS uses `require` and `module.exports`.

```js
// math.cjs
function add(a, b) {
  return a + b;
}

module.exports = {add};
```

```js
// app.cjs
const {add} = require('./math.cjs');
console.log(add(2, 3));
```

## ES Modules

ES Modules use `import` and `export`.

```js
// math.mjs
export function add(a, b) {
  return a + b;
}
```

```js
// app.mjs
import {add} from './math.mjs';
console.log(add(2, 3));
```

## package.json type

```json
{
  "type": "module"
}
```

With `"type": "module"`, `.js` files are treated as ES Modules.

Without it, `.js` files are usually CommonJS.

## Differences

CommonJS:

- synchronous `require`
- widely used in older Node.js
- `__dirname` and `__filename` available

ESM:

- standard JavaScript modules
- supports top-level `await`
- better for modern tooling
- no `__dirname` by default

## __dirname In ESM

```js
import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```

## Common Mistakes

- mixing CJS and ESM without understanding package type
- forgetting file extensions in ESM imports
- expecting `__dirname` in ESM
- using default import incorrectly from CommonJS package

## Senior Best Practices

- use one module style consistently per project
- prefer ESM for modern new packages when ecosystem supports it
- understand interop for older dependencies
- be careful during migration

## Interview Questions

### CommonJS vs ESM?

CommonJS uses `require/module.exports`. ESM uses `import/export` and is the JavaScript standard module system.

### What does `"type": "module"` do?

It makes `.js` files in that package use ES Module semantics.

