'use strict';


const { cons, nil, empty, nil, isPair, list, car, cdr } = require('../abstract data/cons.js');


function deriv(x, expr) {
  if (isNumber(expr)) return 0;
  else if (isVar(expr))
    return sameVar(expr, x) ? 1 : 0;
  else if (isSum(expr)) 
    return makeSum(deriv(x, addend(expr)), deriv(x, augend(expr)));
  else if (isProduct(expr))
    return makeSum(
      makeProduct(multiplier(expr), deriv(x, multiplicant(expr))),
      makeProduct(derive(x, multiplier(expr)), multiplicant(expr))
    );
  else throw new Error(`unknown expression type -- DERIV ${expr}`);
}

const isSum = expr => isPair(expr) && car(expr) === '+';
const isProduct = expr => isPair(expr) && car(expr) === '*';


exports.quote = list;