'use strict';

const assert = require('assert');

const expected = ['tick', 'task', 'timeout', 'immediate']
const actual = [];

setImmediate(() => actual.push('immediate'));
setTimeout(() => actual.push('timeout'));
queueMicrotask(() => actual.push('task'));
process.nextTick(() => actual.push('tick'));

process.on('exit', () => {
    assert.deepEqual(actual, expected);
});
