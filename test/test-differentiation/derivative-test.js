'use strict';

const test = require('ava');
const Tree = require('../../src/abstract-data/fp-tree.js');
const { list } = require('../../src/abstract-data/cons.js');
const {
  deriv,
  isSum,
  isProduct,
  isVar,
  isNumber,
  addend,
  augend,
  makeSum,
  makeProduct,
  multiplicand,
  multiplier,
  sameVar,
} = require('../../src/differentiation/derivative.js');


test('derivative of product', (t) => {
  t.is(Tree.str(deriv('x', list('*', 'x', 'y'))), '(+ (* x 0) y)');
  t.is(Tree.str(deriv('x', list('*', 20, 'x'))), '(+ 20 (* 0 x))');
});

test('derivative of sum', (t) => {
  t.is(deriv('x', list('+', 'x', 3)), 1);
  t.is(deriv('x', list('+', 1, 10)), 0);
  t.is(deriv('x', list('+', 'y', 'z')), 0);
  t.is(deriv('x', list('+', 'y', 'x')), 1);
});

test('derivative of variable', (t) => {
  t.is(deriv('x', 'x'), 1);
  t.is(deriv('y', 'x'), 0);
});

test('derivative of number `deriv`', (t) => {
  t.is(deriv('x', 10), 0);
  t.is(deriv('y', 0), 0);
});

test('derivative `isNumber`', (t) => {
  t.true(isNumber(1));
  t.false(isNumber('a'));
  t.true(isNumber(10));
  t.false(isNumber(''));
});

test('derivative `sameVar`', (t) => {
  t.true(sameVar('a', 'a'));
  t.false(sameVar('a', 'b'));
  t.false(sameVar('a', 'c'));
  t.false(sameVar('aa', 'aa'));
});

test('derivative `isVar`', (t) => {
  t.true(isVar('a'));
  t.true(isVar('z'));
  t.true(isVar('w'));
  t.false(isVar(1));
  t.false(isVar('0'));
  t.false(isVar('tot'));
});

test('derivative `makeProduct`', (t) => {
  t.is(Tree.str(makeProduct(10, 'x')), '(* 10 x)');
  t.is(makeProduct(10, -1), -10);
  t.is(makeProduct(0, 20), 0);
  t.is(makeProduct(20, 0), 0);
});

test('derivative `makeSum`', (t) => {
  t.is(Tree.str(makeSum(10, 'x')), '(+ 10 x)');
  t.is(makeSum(10, -1), 9);
  t.is(makeSum(0, 20), 20);
  t.is(makeSum(0, 0), 0);
});

test('derivative `multiplicand`', (t) => {
  t.is(multiplicand(list('+', 10, -1)), -1);
  t.is(multiplicand(list('+', 2, 5)), 5);
});

test('derivative `multiplier`', (t) => {
  t.is(multiplier(list('*', 10, -1)), 10);
  t.is(multiplier(list('*', 2, 5)), 2);
});

test('derivative `augend`', (t) => {
  t.is(augend(list('+', 10, -1)), -1);
  t.is(augend(list('+', 2, 5)), 5);
});

test('derivative `addend`', (t) => {
  t.is(addend(list('+', 10, -1)), 10);
  t.is(addend(list('+', 2, 5)), 2);
});

test('derivative `isProduct`', (t) => {
  t.true(isProduct(list('*', 3, 4)));
  t.false(isProduct(list()));
});

test('derivative `isSum`', (t) => {
  t.true(isSum(list('+', 1, 3)));
  t.false(isSum(list()));
});
