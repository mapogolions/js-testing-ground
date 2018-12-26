'use strict';

const test = require('ava');
const { isSum, isProduct, addend, augend, makeSum, makeProduct, multiplicand, multiplier } = require('../../src/differentiation/derivative.js');
const { list } = require('../../src/abstract data/cons.js');
const List = require('../../src/abstract data/fp-list.js');


test("derivative `makeProduct`", t => {
  t.deepEqual(List.array(makeProduct(10, -1)), ['*', 10, -1]);
  t.is(List.str(makeProduct(0, 20)), '(* 0 20)');
});

test("derivative `makeSum`", t => {
  t.deepEqual(List.array(makeSum(10, -1)), ['+', 10, -1]);
  t.is(List.str(makeSum(0, 20)), '(+ 0 20)');
});

test("derivative `multiplicand`", t => {
  t.is(multiplicand(list('+', 10, -1)), -1);
  t.is(multiplicand(list('+', 2, 5)), 5);
});

test("derivative `multiplier`", t => {
  t.is(multiplier(list('*', 10, -1)), 10);
  t.is(multiplier(list('*', 2, 5)), 2);
});

test("derivative `augend`", t => {
  t.is(augend(list('+', 10, -1)), -1);
  t.is(augend(list('+', 2, 5)), 5);
});

test("derivative `addend`", t => {
  t.is(addend(list('+', 10, -1)), 10);
  t.is(addend(list('+', 2, 5)), 2);
});

test("derivative `isProduct`", t => {
  t.true(isProduct(list('*', 3, 4)));
  t.false(isProduct(list()));
});
test("derivative `isSum`", t => {
  t.true(isSum(list('+', 1, 3)));
  t.false(isSum(list()));
});