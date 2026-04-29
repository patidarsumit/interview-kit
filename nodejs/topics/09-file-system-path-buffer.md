# 09. File System, Path, And Buffers

Node.js has strong file system and binary data APIs.

These are commonly asked because backend code often handles uploads, logs, reports, and files.

## fs

Use `node:fs/promises` for promise-based file APIs.

```js
import {readFile} from 'node:fs/promises';

const data = await readFile('users.json', 'utf8');
```

Avoid sync APIs in request handlers.

```js
readFileSync('large-file.txt');
```

This blocks the event loop.

## path

Use `path` to build safe cross-platform paths.

```js
import path from 'node:path';

const filePath = path.join(process.cwd(), 'uploads', fileName);
```

Do not manually concatenate paths with `/`.

## Path Traversal Risk

Bad:

```js
const filePath = `uploads/${request.query.file}`;
```

An attacker may send:

```text
../../etc/passwd
```

Validate and constrain paths.

## Buffer

`Buffer` handles binary data.

```js
const buffer = Buffer.from('hello');
console.log(buffer.toString('hex'));
```

Use buffers for:

- file data
- network packets
- binary protocols
- cryptography
- uploads

## Encoding

Common encodings:

- `utf8`
- `base64`
- `hex`

```js
const encoded = Buffer.from('hello').toString('base64');
```

## Common Mistakes

- using sync file APIs in server request path
- trusting user-provided file paths
- loading huge files fully into memory
- confusing string length and byte length
- not handling file errors

## Senior Best Practices

- use async file APIs
- use streams for large files
- validate file paths and extensions
- store uploads outside public executable paths
- enforce file size limits
- understand buffers and encodings

## Interview Questions

### What is Buffer?

A Node.js object for handling binary data.

### Why avoid readFileSync in APIs?

It blocks the event loop and delays all concurrent requests.

### What is path traversal?

An attack where user input escapes the intended directory using paths like `../`.

