'use strict';

const test = require('ava');
const { map } = require('../../../src/fun/array-cps.js');

test.cb('`map` over an empty array should return an empty array', t => {
  map(
    [],
    (item, callback) => process.nextTick(() => callback(null, item + 1)),
    (err, result) => {
      t.is(err, null);
      t.deepEqual(result, []);
      t.end();
    },
  );
});

test.cb('error should break mapping', t => {
  const failure = new Error('Greater than zero');
  map(
    [-1, 0, 1, 2],
    (item, callback) => process.nextTick(() => item > 0 ? callback(failure) : callback(null, item)),
    (err, result) => {
      t.is(err, failure);
      t.is(result, undefined);
      t.end();
    },
  );
});

test.cb('`map` strings to numbers', t => {
  map(
    ['.', '..', '...'],
    (item, callback) => process.nextTick(() => callback(null, item.length)),
    (err, result) => {
      t.is(err, null);
      t.deepEqual(result, [1, 2, 3]);
      t.end();
    },
  );
});

test.cb('`map` should have parallel semantics', t => {
  const sideEffect = [];
  map(
    [1, 2, 3, 4],
    (item, callback) => {
      const delay = item % 2 === 0 ? 12 : 0;
      setTimeout(() => {
        sideEffect.push(item);
        callback(null, item);
      }, delay);
    },
    (_err, _result) => {
      t.deepEqual(sideEffect, [1, 3, 2, 4]);
      t.end();
    },
  );
});
