'use strict';

const test = require('ava');

const { fib } = require('../../src/recursive/fib.js');

test("`fib` recursive process", t => {
  t.is(fib(1), 1);
});