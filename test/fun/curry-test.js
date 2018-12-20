'use strict';

const test = require('ava');

const { curry } = require('../../src/fun/curry.js');


test("test `partial`", t => {
  const add = (a, b) => a + b;
  const add2 = curry(add)(2);
  t.is(typeof add2, 'function');
  t.deepEqual([2, 3, 4, 5], [0, 1, 2, 3].map(add2));
});

test("test `curry`", t => {
  const concat = (a, b, c) => a + b + c;
  t.is(curry(concat)("hello", " ", "world"), "hello world");
});