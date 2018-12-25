'use strict';


const test = require('ava');
const { list, nil, cons, car, cdr, cadr, caddr } = require('../../src/abstract data/cons.js');


test("`cadr`", t => {
  t.is(caddr(list(1, 2, 3)), 3);
  t.is(cadr(list(1, 2, 3)), 2);
  t.is(car(cdr((list(1, 2)))), 2);
});

test("test: pair, car and cdr", t => {
  t.is(car(cons(1, "text")), 1);
  t.is(cdr(cons(1, "text")), "text");
});

