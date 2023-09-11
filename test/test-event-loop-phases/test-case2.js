'use strict';

// process.nextTick causes starvation

const assert = require('assert');

const expected = [
    'tick', 'tick', 'tick', 'tick', 'tick', 'tick', 'tick', 'tick', 'tick', 'tick',
    'task',
    'timeout',
    'immediate'
]
const actual = [];

setImmediate(() => actual.push('immediate'));
setTimeout(() => actual.push('timeout'));
queueMicrotask(() => actual.push('task'));

nextTick(10);


process.on('exit', () => {
    assert.deepEqual(actual, expected);
});



function nextTick(n) {
    if (n <= 0) return;
    process.nextTick(() => {
        actual.push('tick');
        nextTick(n - 1);
    });
}
