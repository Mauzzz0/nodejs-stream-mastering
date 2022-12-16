import { Duplex, Transform } from 'node:stream';

const server = Duplex({
  objectMode: true,

  write(chunk, enc, cb) {
    console.log('[writable] saving', chunk);
    cb();
  },

  read() {
    const everySeconds = (intervalContext) => {
      this.counter = this.counter ?? 0;
      if(this.counter++ <= 5) {
        this.push(`My name is Ruslan[${this.counter}]`);
        return;
      }

      clearInterval(intervalContext);
      this.push(null);
    }

    setInterval(function () {everySeconds(this)});
  }
})

// to prove that they're different communication channels
// write triggers the writable stream from our duplex
server.write('[duplex] hey this is a writable\n');

// on data -> our serve.on(data) will be triggered everytime
// we call the push function
server.push(`[duplex] hey this is also readable`);
const transformToUpperCase = Transform({
  objectMode: true,
  transform(chunk, enc, cb){
    cb(null, chunk.toUpperCase());
  }
});

transformToUpperCase.write(`[transform] hello from writer`);
// thw push method will ignore what you have in the transform function
transformToUpperCase.push(`[transform] hello from reader`);

server
  .pipe(transformToUpperCase)
  // it'll redirect all data to the duplex's writable channel
  .pipe(server);