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

const isSum = expr => isPair(expr) && car(expr) === '+';
const isProduct = expr => isPair(expr) && car(expr) === '*';
const addend = expr => cadr(expr);
const augend = expr => caddr(expr);
const multiplier = expr => cadr(expr);
const multiplicand = expr => caddr(expr);
const makeSum = (a, b) => list('+', a, b);
const makeProduct = (a, b) => list('*', a, b);


exports.deriv = deriv;
exports.isSum = isSum;
exports.isProduct = isProduct;
exports.addend = addend;
exports.augend = augend;
exports.multiplier = multiplier;
exports.multiplicand = multiplicand;
exports.makeSum = makeSum;
exports.makeProduct = makeProduct;