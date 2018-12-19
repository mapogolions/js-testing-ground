'use strict';


const test = require('ava');
const { cons, car, cdr } = require('../../src/abstract data/cons.js');


test("test: pair, car and cdr", t => {
  t.is(car(cons(1, "text")), 1);
  t.is(cdr(cons(1, "text")), "text");
});

