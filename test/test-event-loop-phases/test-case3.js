'use strict';

// queueMicrotask causes starvation

const assert = require('assert');

const expected = [
    'tick',
    'task', 'task', 'task', 'task', 'task', 'task', 'task', 'task', 'task', 'task',
    'timeout',
    'immediate'
]
const actual = [];

setImmediate(() => actual.push('immediate'));
setTimeout(() => actual.push('timeout'));

queueTask(10);

process.nextTick(() => actual.push('tick'));


process.on('exit', () => {
    assert.deepEqual(actual, expected);
});



function queueTask(n) {
    if (n <= 0) return;
    queueMicrotask(() => {
        actual.push('task');
        queueTask(n - 1);
    });
}
