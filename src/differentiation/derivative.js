'use strict';

const {
  isPair,
  list,
  car,
  cadr,
  caddr,
} = require('../abstract-data/cons.js');


const isNumber = expr => typeof expr === 'number';
const checkNumber = (num, expr) => (isNumber(expr) && expr === num);
const isVar = expr => expr.length === 1 && expr >= 'a' && expr <= 'z';

const sameVar = (a, b) => {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  if (a.length !== 1 || b.length !== 1) return false;
  if (a !== b) return false;
  return true;
};

const isSum = expr => isPair(expr) && car(expr) === '+';
const isProduct = expr => isPair(expr) && car(expr) === '*';
const addend = expr => cadr(expr);
const augend = expr => caddr(expr);
const multiplier = expr => cadr(expr);
const multiplicand = expr => caddr(expr);

const makeSum = (a, b) => {
  if (checkNumber(0, a)) return b;
  if (checkNumber(0, b)) return a;
  if (isNumber(a) && isNumber(b)) return a + b;
  return list('+', a, b);
};

const makeProduct = (a, b) => {
  if (checkNumber(a) || checkNumber(b)) return 0;
  if (checkNumber(1, a)) return b;
  if (checkNumber(1, b)) return a;
  if (isNumber(a) && isNumber(b)) return a * b;
  return list('*', a, b);
};

function deriv(x, expr) {
  if (isNumber(expr)) return 0;
  if (isVar(expr)) return sameVar(expr, x) ? 1 : 0;
  if (isSum(expr)) return makeSum(deriv(x, addend(expr)), deriv(x, augend(expr)));
  if (isProduct(expr)) {
    return makeSum(
      makeProduct(multiplier(expr), deriv(x, multiplicand(expr))),
      makeProduct(deriv(x, multiplier(expr)), multiplicand(expr)),
    );
  }
  throw new Error(`unknown expression type -- DERIV ${expr}`);
}


module.exports = {
  deriv,
  isVar,
  isNumber,
  sameVar,
  isSum,
  isProduct,
  addend,
  augend,
  multiplier,
  multiplicand,
  makeSum,
  makeProduct,
};
