'use strict';

const test = require('ava');
const { reduce } = require('../../../src/fun/array-cps.js');

test.cb('reduce of empty array with no initial value should throw TypeError', t => {
  reduce(
    [],
    (prev, curr, callback) => process.nextTick(() => {
      callback(null, prev + curr);
    }),
    (err, result) => {
      t.is(result, undefined);
      t.true(err instanceof TypeError);
      t.end();
    },
    /* no initial value */
  );
});

test.cb('`reduce` of empty array with initial value', t => {
  const initial = Symbol();
  reduce(
    [],
    (prev, curr, callback) => process.nextTick(() => {
      callback(null, prev + curr);
    }),
    (err, result) => {
      t.is(err, null);
      t.is(result, initial);
      t.end();
    },
    initial
  );
});

test.cb('`reduce` of array with no initial value', t => {
  reduce(
    [1, 2, 3, 4],
    (prev, curr, callback) => process.nextTick(() => {
      callback(null, prev + curr);
    }),
    (err, result) => {
      t.is(err, null);
      t.is(result, 10);
      t.end();
    },
    /* no initial value */
  );
});

test.cb('`reduce` of array with initial value', t => {
  reduce(
    [1, 2, 3, 4, 5],
    (previous, current, callback) => process.nextTick(() => {
      callback(null, previous + current);
    }),
    (err, result) => {
      t.is(err, null);
      t.is(result, 25);
      t.end();
    },
    10, /* initial value */
  );
});

test.cb('`reduce` with error', t => {
  const divisionByZeroError = new TypeError('Division by zero');
  reduce(
    [0, 1, 2, 4],
    (prev, curr, callback) => process.nextTick(() => {
      if (prev === 0) {
        callback(divisionByZeroError);
        return;
      }
      callback(null, curr / prev);
    }),
    (err, result) => {
      t.is(err, divisionByZeroError);
      t.is(result, undefined);
      t.end();
    },
    /* no initial value */
  );
});
