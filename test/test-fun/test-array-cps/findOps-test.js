'use strict';

const test = require('ava');
const { findOps } = require('../../../src/fun/array-cps.js');

test.cb('`find` should return undefined when array is empty', t => {
  findOps(
    [],
    (_item, callback) => process.nextTick(callback),
    (_err, result) => {
      t.is(result, undefined);
      t.end();
    },
  );
});
