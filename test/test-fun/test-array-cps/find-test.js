'use strict';

const test = require('ava');
const { find } = require('../../../src/fun/array-cps.js');

test.cb('`find` should return undefined when array is empty', t => {
  find(
    [],
    (_item, callback) => process.nextTick(callback),
    (_err, result) => {
      t.is(result, undefined);
      t.end();
    },
  );
});

test.cb('`find` should ignore an error & iterate over each element', t => {
  const failure = new Error();
  const sideEffect = [];
  find(
    [1, 2, -3, 5],
    (item, callback) => setTimeout(() => {
      sideEffect.push(item);
      callback(failure, false);
    }, 0),
    (err, _result) => {
      t.is(err, null);
      t.deepEqual(sideEffect, [1, 2, -3, 5]);
      t.end();
    },
  );
});

test.cb('`find` should return resolved element', t => {
  find(
    [6, 4, 2],
    (item, callback) => setTimeout(() => callback(null, true), item * 10),
    (_err, result) => {
      t.is(result, 6);
      t.end();
    },
  );
});

test.cb('`find`should have sequential (series) semantics', t => {
  const sideEffect = [];
  find(
    [1, 2, 3, 4],
    (item, callback) => {
      const delay = 100 - (item * 10);
      setTimeout(() => {
        sideEffect.push(item);
        callback(null, item % 2 === 0);
      }, delay);
    },
    (_err, _result) => {
      t.deepEqual(sideEffect, [1, 2]);
      t.end();
    },
  );
});
