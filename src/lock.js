'use strict';

class Lock {
    constructor() {
        this.state = -1;
        this.queue = [];
    }

    acquire() {
        return new Promise((resolve, reject) => {
            if (this.state < 0) {
                this.state = 1;
                resolve();
                return;
            }
            const awaiter = { resolve, reject };
            this.queue.push(awaiter);
        });
    }

    release() {
        return new Promise((resolve, reject) => {
            if (this.state < 0) {
                resolve();
                return;
            }
            if (!this.queue.length) {
                this.state = -1;
                resolve();
                return
            };
            const awaiter = this.queue.shift();
            awaiter.resolve();
            resolve();
        });
    }
}


module.exports = Lock;
