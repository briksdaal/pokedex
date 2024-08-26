import pokemon from './pokemon.js';
import fs from 'fs';
import fsPromises from 'fs/promises';
import debug from 'debug';
import path from 'path';
import { Readable } from 'stream';
import { finished } from 'stream/promises';

const downloadDebugger = debug('pokedex:download');
const destinationDir = './populate/downloaded_images/';

async function createDirectory() {
  if (!fs.existsSync(destinationDir)) {
    return fsPromises.mkdir(destinationDir);
  }
}

async function downloadAndWriteFile(url) {
  const filename = url.split('/').pop();
  const destination = path.resolve(destinationDir, filename);
  const imageRes = await fetch(url);
  const writeStream = fs.createWriteStream(destination);
  return finished(Readable.fromWeb(imageRes.body).pipe(writeStream));
}

async function main() {
  try {
    downloadDebugger('Checking if directory exists, creating if needed...');
    await createDirectory();
    downloadDebugger('Starting image downloads...');
    for (let p of pokemon) {
      if (!p.image || !p.image.includes('http')) {
        downloadDebugger(`Skipping ${p.name}, doesn't seem like a url...`);
        continue;
      }
      downloadDebugger(`Downloading ${p.name} image...`);
      await downloadAndWriteFile(p.image);
    }
    downloadDebugger('Finished all downloads');
  } catch (e) {
    downloadDebugger(e);
  }
}

main();
