'use strict';

const test = require('ava');
const Lock = require('../src/lock');

test('should return false when nothing to release', async (t) => {
    const lock = new Lock();
    const released = await lock.release();
    t.false(released);
});

test('should return true when lock has been acquired and released', async (t) => {
    const lock = new Lock();
    const entered = await lock.acquire();
    const leaved = await lock.release();
    t.true(entered);
    t.true(leaved);
});

test('should ...', async (t) => {
    const lock = new Lock();
    const store = [];
    const t1 = task1(lock, store);
    const t2 = task2(lock, store);
    await Promise.all([t1, t2]);
    t.deepEqual([1, 2], store);
});

function delay(ms) {
    return new Promise((resolve, _) => {
        setTimeout(resolve, ms);
    });
}

async function task1(lock, store) {
    await lock.acquire();
    await delay(100);
    store.push(1);
    await lock.release();
}

async function task2(lock, store) {
    await lock.acquire();
    store.push(2);
    await lock.release();
}
