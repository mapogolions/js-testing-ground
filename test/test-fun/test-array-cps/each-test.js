'use strict';

const test = require('ava');
const { each } = require('../../../src/fun/array-cps.js');

test.cb('iteration over an empty array', t => {
  const sideEffect = [];
  each(
    [],
    (item, callback) => process.nextTick(() => {
      sideEffect.push(item);
      callback(null);
    }),
    (err) => {
      t.is(err, null);
      t.deepEqual(sideEffect, []);
      t.end();
    },
  );
});

test.cb('error should break iteration', t => {
  const sideEffect = [];
  const failure = new Error('Negative number');
  each(
    [1, -2, 2, -3],
    (item, callback) => process.nextTick(() => {
      if (item < 0) {
        callback(failure);
        return;
      }
      sideEffect.push(item);
      callback(null);
    }),
    (err) => {
      t.is(err, failure);
      t.deepEqual(sideEffect, [1]);
      t.end();
    },
  );
});

test.cb('successful iteration over an array', t => {
  const sideEffect = [];
  each(
    [1, 2, 3],
    (item, callback) => process.nextTick(() => {
      sideEffect.push(item);
      callback(null);
    }),
    (err) => {
      t.is(err, null);
      t.deepEqual(sideEffect, [1, 2, 3]);
      t.end();
    },
  );
});

test.cb('`each` should have parallel semantics', t => {
  const sideEffect = [];
  each(
    [1, 2, 3, 4],
    (item, callback) => {
      const delay = 100 - (item * 10);
      setTimeout(() => {
        sideEffect.push(item);
        callback(null);
      }, delay);
    },
    (_err, _result) => {
      t.deepEqual(sideEffect, [4, 3, 2, 1]);
      t.end();
    },
  );
});
