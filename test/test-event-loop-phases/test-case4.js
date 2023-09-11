'use strict';

const assert = require('assert');


const expected = ['tick-1', 'tick-2', 'task-1', 'task-2', 'timeout', 'immediate'];
const actual = [];


setImmediate(() => {
    actual.push('immediate');
});

setTimeout(() => {
    actual.push('timeout');
});

// causes starvation
queueMicrotask(() => {
    actual.push('task-1');
    queueMicrotask(() => {
        actual.push('task-2');
    })
})

// causes starvation
process.nextTick(() => {
    actual.push('tick-1');
    process.nextTick(() => {
        actual.push('tick-2')
    })
});


process.on('exit', () => {
    assert.deepEqual(actual, expected);
});
