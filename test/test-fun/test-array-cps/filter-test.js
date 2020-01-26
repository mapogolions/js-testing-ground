'use strict';

const test = require('ava');
const { filter } = require('../../../src/fun/array-cps.js');

test.cb('empty array filtering returns an empty array', t => {
  filter(
    [],
    (item, callback) => process.nextTick(() => callback(null, item > 0)),
    (err, result) => {
      t.deepEqual(result, []);
      t.is(err, null);
      t.end();
    },
  );
});

test.cb('`filter` should treat an error as false value', t => {
  const even = x => x % 2 === 0;
  const failure = new Error('This error should be ignored');
  filter(
    [1, 2, 3, 4],
    (item, callback) => process.nextTick(() => even(item) ? callback(null, true) : callback(failure)),
    (err, result) => {
      t.deepEqual(result, [2, 4]);
      t.is(err, null);
      t.end();
    },
  );
});

test.cb('`filter` should ignore even numbers', t => {
  const odd = x => x % 2 !== 0;
  filter(
    [1, 2, 3, 4, 5, 6],
    (item, callback) => process.nextTick(() => callback(null, odd(item))),
    (err, result) => {
      t.deepEqual(result, [1, 3, 5]);
      t.is(err, null);
      t.end();
    },
  );
});

test.cb('`filter` should have parallel semantics', t => {
  const sideEffect = [];
  filter(
    [1, 2, 3, 4],
    (item, callback) => {
      const delay = item % 2 === 0 ? 12 : 0;
      setTimeout(() => {
        sideEffect.push(item);
        callback(null, item > 0);
      }, delay);
    },
    (_err, _result) => {
      t.deepEqual(sideEffect, [1, 3, 2, 4]);
      t.end();
    },
  );
});
