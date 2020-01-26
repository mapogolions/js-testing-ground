'use strict';

const test = require('ava');
const { some } = require('../../../src/fun/array-cps.js');

test.cb('empty array does not pass the test implemented by the provided function', t => {
  some(
    [],
    (_item, callback) => process.nextTick(callback),
    (err, result) => {
      t.is(err, null);
      t.false(result);
      t.end();
    },
  );
});

test.cb('`some` should ignore an error', t => {
  const failure = new Error('Some error');
  some(
    [1, 2, -1, 0],
    (item, callback) => process.nextTick(() => {
      if (item < 0) {
        callback(null, true);
        return;
      }
      callback(failure);
    }),
    (err, result) => {
      t.is(err, null);
      t.true(result);
      t.end();
    },
  );
});

test.cb('`some` should return true when at least one element is a negative number', t => {
  some(
    [1, 2, -1, 0],
    (item, callback) => process.nextTick(() => callback(null, item < 0)),
    (err, result) => {
      t.is(err, null);
      t.true(result);
      t.end();
    },
  );
});

test.cb('`some`should have parallel semantics', t => {
  const sideEffect = [];
  some(
    [1, 2, 3, 4],
    (item, callback) => {
      const delay = 100 - (item * 10);
      setTimeout(() => {
        sideEffect.push(item);
        callback(null, false);
      }, delay);
    },
    (_err, _result) => {
      t.deepEqual(sideEffect, [4, 3, 2, 1]);
      t.end();
    },
  );
});

test.cb('`some`should be lazy', t => {
  const sideEffect = [];
  some(
    [1, 2, 3, 4],
    (item, callback) => {
      const delay = 100 - (item * 10);
      setTimeout(() => {
        sideEffect.push(item);
        callback(null, item % 2 === 0);
      }, delay);
    },
    (_err, _result) => {
      t.deepEqual(sideEffect, [4]);
      t.end();
    },
  );
});
