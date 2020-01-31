'use strict';

const test = require('ava');
const { raceFindIndex } = require('../../../src/fun/array-cps.js');

test.cb('`raceFindIndex` should return -1 when array is empty', t => {
  raceFindIndex(
    [],
    (_item, callback) => process.nextTick(callback),
    (_err, index) => {
      t.is(index, -1);
      t.end();
    },
  );
});

test.cb('`raceFindIndex` should ignore an error & iterate over each element', t => {
  const failure = new Error();
  const sideEffect = [];
  raceFindIndex(
    [1, 2, -3, 5],
    (item, callback) => setTimeout(() => {
      sideEffect.push(item);
      callback(failure, false);
    }, 0),
    (err, _index) => {
      t.is(err, null);
      t.deepEqual(sideEffect, [1, 2, -3, 5]);
      t.end();
    },
  );
});

test.cb('`raceFindIndex` should return firstly resolved index', t => {
  raceFindIndex(
    [6, 4, 2],
    (item, callback) => setTimeout(() => callback(null, true), item * 10),
    (_err, index) => {
      t.is(index, 2);
      t.end();
    },
  );
});

test.cb('`raceFindIndex`should be lazy & have parallel semantics', t => {
  const sideEffect = [];
  raceFindIndex(
    [1, 2, 3, 4],
    (item, callback) => {
      const delay = 100 - (item * 10);
      setTimeout(() => {
        sideEffect.push(item);
        callback(null, item % 2 === 0);
      }, delay);
    },
    (_err, _index) => {
      t.deepEqual(sideEffect, [4]);
      t.end();
    },
  );
});
