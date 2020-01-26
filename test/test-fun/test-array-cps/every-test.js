'use strict';

const test = require('ava');
const { every } = require('../../../src/fun/array-cps.js');

test.cb('empty array passes the test implemented by the provided function', t => {
  every(
    [],
    (_item, callback) => process.nextTick(callback),
    (err, result) => {
      t.is(err, null);
      t.true(result);
      t.end();
    },
  );
});

test.cb('`every` should treat an error as false', t => {
  const failure = new Error();
  every(
    [1, 2, -3, 5],
    (item, callback) => process.nextTick(() => callback(item < 0 ? failure : null)),
    (err, result) => {
      t.is(err, null);
      t.false(result);
      t.end();
    },
  );
});

test.cb('`every` should return false when an array contains at least one odd number', t => {
  const even = x => x % 2 === 0;
  every(
    [2, 1, 6],
    (item, callback) => process.nextTick(() => callback(null, even(item))),
    (err, result) => {
      t.false(result);
      t.is(err, null);
      t.end();
    },
  );
});

test.cb('`every` should return true when each number in array is even', t => {
  const even = x => x % 2 === 0;
  every(
    [2, 4, 6],
    (item, callback) => process.nextTick(() => {
      if (even(item)) {
        callback(null, true);
        return;
      }
      callback(null, false);
    }),
    (err, result) => {
      t.true(result);
      t.is(err, null);
      t.end();
    },
  );
});

test.cb('`every`should have parallel semantics', t => {
  const sideEffect = [];
  every(
    [1, 2, 3, 4],
    (item, callback) => {
      const delay = 100 - (item * 10);
      setTimeout(() => {
        sideEffect.push(item);
        callback(null, true);
      }, delay);
    },
    (_err, _result) => {
      t.deepEqual(sideEffect, [4, 3, 2, 1]);
      t.end();
    },
  );
});

test.cb('`every`should be lazy', t => {
  const sideEffect = [];
  every(
    [1, 2, 3, 4],
    (item, callback) => {
      const delay = 100 - (item * 10);
      setTimeout(() => {
        sideEffect.push(item);
        callback(null, item % 2 === 0);
      }, delay);
    },
    (_err, _result) => {
      t.deepEqual(sideEffect, [4, 3]);
      t.end();
    },
  );
});
