import net from 'node:net';
import { Writable, PassThrough } from 'node:stream';
import readline from 'node:readline';

function log(message) {
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(message);
}

const output = Writable({
    write(chunk, enc, cb) {
        const { id, message } = JSON.parse(chunk);

        if (message){
            log(`reply from ${id}: ${message}`);

        }
        else {
            log(`my username: ${id}\n`)
        }

        log(`type: `)
        cb(null, chunk);
    }
})

const resetChatAfterSend = PassThrough()
resetChatAfterSend.on('data', _ => {
    log('type: ')
})

process.stdin
  .pipe(resetChatAfterSend)
  .pipe(net.connect(3000))
  .pipe(output);