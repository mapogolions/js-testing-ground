'use strict';

/* const cons = (fst, snd) => f => f(fst, snd);
const car = pair => pair((x, y) => x);
const cdr = pair => pair((x, y) => y);
const empty = xs => Object.is(xs, nil);
const isPair = xs => typeof xs === 'function';
 */
const nil = Object.freeze({ ['@@__cons__@@']: false });
const cons = (head, tail) => Object.freeze({ head, tail, ['@@__cons__@@']: true });
const car = ({ head }) => head;
const cdr = ({ tail }) => tail;
const cadr = ({ tail }) => car(tail);
const caddr = ({ tail }) => car(cdr(tail));
const empty = xs => Object.is(xs, nil);
const isPair = xs => xs['@@__cons__@@'];

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
