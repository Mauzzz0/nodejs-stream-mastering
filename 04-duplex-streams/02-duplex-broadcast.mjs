import {
  Duplex,
  PassThrough,
  Writable
} from 'node:stream';
import {
  createReadStream,
  createWriteStream
} from 'node:fs';
import {
  randomUUID
} from 'node:crypto';

const consumers = [randomUUID(), randomUUID()].map(id => {
  return Writable({
    write(chunk, enc, cb) {
      console.log(`[${id}]bytes: ${chunk.length}, received a message at: ${new Date().toISOString()}`);
      cb(null, chunk)
    }
  });
});

const onData = (chunk) => {
  consumers.forEach((consumer, idx) => {
    // check if the consumer is still active
    if (consumer.writableEnded) {
      delete consumers[idx];
      return;
    }

    consumer.write(chunk);
  })
}

const broadcaster = PassThrough();
broadcaster.on('data', onData);

const stream = Duplex.from({
  readable: createReadStream('./big.file'),
  writable: createWriteStream('./output.txt')
});

stream
  .pipe(broadcaster)
  .pipe(stream);