'use strict';


const { 
  cons, 
  nil, 
  empty, 
  isPair, 
  list, 
  car, 
  cdr, 
  cadr, 
  caddr 
} = require('../abstract data/cons.js');


function deriv(x, expr) {
  if (isNumber(expr)) return 0;
  else if (isVar(expr))
    return sameVar(expr, x) ? 1 : 0;
  else if (isSum(expr)) 
    return makeSum(deriv(x, addend(expr)), deriv(x, augend(expr)));
  else if (isProduct(expr))
    return makeSum(
      makeProduct(multiplier(expr), deriv(x, multiplicand(expr))),
      makeProduct(deriv(x, multiplier(expr)), multiplicand(expr))
    );
  else throw new Error(`unknown expression type -- DERIV ${expr}`);
}

const checkNumber = (num, expr) => isNumber(expr) && expr === num;
const isVar = expr => expr.length === 1 && expr >= 'a' && expr <= 'z';
const isNumber = expr => typeof expr === 'number';
const sameVar = (a, b) => {
  if (typeof a !== 'string' || typeof b !== 'string')
    return false;
  else if (a.length !== 1 || b.length !== 1)
    return false;
  else if (a !== b) return false;
  else return true;
};
const isSum = expr => isPair(expr) && car(expr) === '+';
const isProduct = expr => isPair(expr) && car(expr) === '*';
const addend = expr => cadr(expr);
const augend = expr => caddr(expr);
const multiplier = expr => cadr(expr);
const multiplicand = expr => caddr(expr);

const makeSum = (a, b) => {
  if (checkNumber(0, a)) return b;
  else if (checkNumber(0, b)) return a;
  else if (isNumber(a) && isNumber(b)) return a + b;
  else return list('+', a, b);
};

const makeProduct = (a, b) => {
  if (checkNumber(a) || checkNumber(b)) return 0;
  else if (checkNumber(1, a)) return b;
  else if (checkNumber(1, b)) return a;
  else if (isNumber(a) && isNumber(b)) return a * b;
  else return list('*', a, b);
};


exports.deriv = deriv;
exports.isVar = isVar;
exports.isNumber = isNumber;
exports.sameVar = sameVar;
exports.isSum = isSum;
exports.isProduct = isProduct;
exports.addend = addend;
exports.augend = augend;
exports.multiplier = multiplier;
exports.multiplicand = multiplicand;
exports.makeSum = makeSum;
exports.makeProduct = makeProduct;