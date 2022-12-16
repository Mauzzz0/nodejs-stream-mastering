const buffer = Buffer.alloc(5);
buffer.fill('hi', 0, 2);
buffer.fill(0x3a, 2, 3); // hexadecimal char code for :
buffer.fill(0x29, 4, 5); // hexadecimal char code for )

// error, when it reaches max value, it should be moved to another buffer
// buffer.fill('h', 5, 6);

const anotherBuffer = Buffer.alloc(6);
anotherBuffer.set(buffer, buffer.byteOffset);
anotherBuffer.fill('four', 5, 6); // hif:)f

console.log(buffer, buffer.toString(), buffer.byteLength);
console.log(anotherBuffer, anotherBuffer.toString(), anotherBuffer.byteLength);


// or with full data
const msg = 'Hey there!';
const preAllocated = Buffer.alloc(msg.length, msg);

// same thing of Buffer.from(msg)
const withBufferFrom = Buffer.from(msg);

console.log(preAllocated, preAllocated.toString(), preAllocated.byteLength);
console.log(withBufferFrom, withBufferFrom.toString(), withBufferFrom.byteLength);

// -------------
const charCodes = [];
const bytes =[];

const str = 'Hello World';
for (const index in str) {
  // integer / decimals
  const code = str.charCodeAt(index);
  const byteCode = '0x' + Math.abs(code).toString(16);

  charCodes.push(code);
  bytes.push(byteCode);

  console.log({byteCode});
}

console.log({
  charCodes,
  bytes,
  contentFromChar: Buffer.from(charCodes).toString(),
  contentFromHexaBytes: Buffer.from(bytes).toString()
})