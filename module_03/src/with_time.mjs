import { EventEmitter } from "./event_emitter.mjs"
export class WithTime extends EventEmitter {
  execute(asyncFunc, ...args) {
    this.emit('start');
    console.time('execute')
    asyncFunc(...args, (err, data) => {
      if (err) {
        console.timeEnd('execute');
        return this.emit('error', err);
      }
      this.emit('data', data);
      console.timeEnd('execute');
      this.emit('end');
    });
  }
}
