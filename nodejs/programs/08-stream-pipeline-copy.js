import {createReadStream, createWriteStream} from 'node:fs';
import {pipeline} from 'node:stream/promises';

export async function copyFileWithStream(source, destination) {
  await pipeline(
    createReadStream(source),
    createWriteStream(destination),
  );
}

