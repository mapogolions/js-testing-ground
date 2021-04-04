'use strict';

const test = require('ava');
const {
  list,
  cons,
  nil,
  car,
  cdr,
  cadr,
  caddr,
  isPair,
} = require('../../src/abstract-data/cons.js');


test('check is pair', (t) => {
  t.true(isPair(cons('a', nil)));
  t.true(isPair(list(1, 2)));
  t.false(isPair(list()));
  t.false(isPair(nil));
});

test('`cadr` & `caddr`', (t) => {
  t.is(caddr(list(1, 2, 3)), 3);
  t.is(cadr(list(1, 2, 3)), 2);
  t.is(car(cdr((list(1, 2)))), 2);
});

test('test: pair, car and cdr', (t) => {
  t.is(car(cons(1, 'text')), 1);
  t.is(cdr(cons(1, 'text')), 'text');
});
