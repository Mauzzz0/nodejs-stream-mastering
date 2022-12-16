// for i in `seq 1 100`; do node -e "process.stdout.write('$i-hello world\n')" >> text.txt; done;

import {
  readFile
} from 'fs/promises';

// if it's a big file, it'd crash or make your programm slow down
// - gonna fix it in the next class with node.js streams
const data = (await readFile('./text.txt')).toString().split('\n');
const LINES_PER_ITERATION = 10;
const iterations = data.length / LINES_PER_ITERATION; // ten in ten lines (not bytes!)

let page = 0;
for (let index = 1; index < iterations; index++) {
  const chunk = data.slice(page, page += LINES_PER_ITERATION).join("\n");

  // imagine this as the maximum 2GB buffer Node.js can handle per time
  const buffer = Buffer.from(chunk);
  const amountOfBytes = buffer.byteOffset;
  const bufferedData = buffer.toString().split("\n");
  const amountOfLines = bufferedData.length;

  // now the bufferData would be splitted into small pieces and process individually, on-demand
  console.log('processing', bufferedData, `lines: ${amountOfLines}, bytes: ${amountOfBytes}`)
}