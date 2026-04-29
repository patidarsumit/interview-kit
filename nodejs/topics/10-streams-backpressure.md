# 10. Streams And Backpressure

Streams process data chunk by chunk.

They are essential for large files, uploads, downloads, compression, and network data.

## Why Streams

Without streams:

```js
const data = await readFile('large-video.mp4');
response.end(data);
```

This loads the whole file into memory.

With streams:

```js
createReadStream('large-video.mp4').pipe(response);
```

Data flows in chunks.

## Stream Types

Readable:

- source of data
- file read stream
- HTTP request body

Writable:

- destination for data
- file write stream
- HTTP response

Duplex:

- readable and writable
- socket

Transform:

- changes data while passing through
- compression
- encryption
- CSV parsing

## pipeline

Use `pipeline` for safe stream error handling.

```js
import {pipeline} from 'node:stream/promises';

await pipeline(
  createReadStream('input.txt'),
  createWriteStream('output.txt'),
);
```

## Backpressure

Backpressure happens when the destination cannot consume data as fast as the source produces it.

Streams handle this by pausing/resuming flow.

Senior point:

Ignoring backpressure can cause memory growth and crashes.

## Common Use Cases

- file upload
- video streaming
- log processing
- CSV import
- compression
- proxying HTTP responses

## Common Mistakes

- loading huge files into memory
- using `.pipe()` without error handling
- ignoring backpressure
- not limiting upload size
- not destroying streams on errors

## Senior Best Practices

- use streams for large data
- use `pipeline`
- handle stream errors
- enforce file size limits
- monitor memory usage
- understand backpressure

## Interview Questions

### What is a stream?

An abstraction for reading or writing data in chunks.

### What is backpressure?

When a writable destination is slower than the readable source, requiring flow control.

### Why use pipeline?

It handles stream completion and errors more safely than manual piping.

