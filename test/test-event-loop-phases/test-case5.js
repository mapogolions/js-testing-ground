'use strict';

const assert = require('assert');

const actual = [];

setImmediate(() => {
    actual.push('immediate');
});

setTimeout(() => {
    actual.push('timeout');
});

nextTick(1000);


function microTask(n) {
    if (n <= 0) return;
    queueMicrotask(() => {
        actual.push('micro-1');
        nextTick(n - 1);
    });
}

function nextTick(n) {
    if (n <= 0) return;
    process.nextTick(() => {
        actual.push('tick-1');
        microTask(n - 1);
    });
}

process.on('exit', _ => {
    assert.equal(actual.length, 1002);
})
