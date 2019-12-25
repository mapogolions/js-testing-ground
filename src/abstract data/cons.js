'use strict';

/**
 * const cons = (fst, snd) => f => f(fst, snd);
 * const car = pair => pair((x, y) => x);
 * const cdr = pair => pair((x, y) => y);
 * const empty = xs => Object.is(xs, nil);
 * const isPair = xs => typeof xs === 'function';
 */
const CELL_SYMBOL = '@@__cons__@@';
const nil = Object.freeze({ [CELL_SYMBOL]: false });
const cons = (head, tail) => Object.freeze({ head, tail, [CELL_SYMBOL]: true });
const car = ({ head }) => head;
const cdr = ({ tail }) => tail;
const cadr = ({ tail }) => car(tail);
const caddr = ({ tail }) => car(cdr(tail));
const empty = xs => Object.is(xs, nil);
const isPair = xs => xs[CELL_SYMBOL];

const list = (...values) => (values.length <= 0
  ? nil : cons(values[0], list(...values.slice(1))));


module.exports = {
  cons,
  car,
  cdr,
  cadr,
  caddr,
  list,
  nil,
  empty,
  isPair,
};
