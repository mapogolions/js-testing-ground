'use strict';


/* const cons = (fst, snd) => f => f(fst, snd);
const car = pair => pair((x, y) => x);
const cdr = pair => pair((x, y) => y);
const empty = xs => Object.is(xs, nil);
const isPair = xs => typeof xs === 'function'; */

const cons = (head, tail) => Object.freeze({ head, tail, ['@@__cons__@@']: true });
const car = ({ head }) => head;
const cdr = ({ tail }) => tail;
const empty = xs => Object.is(xs, nil);
const isPair = xs => xs['@@__cons__@@'];
const nil = undefined;

const list = (...values) => 
  values.length <= 0 ? nil : cons(values[0], list(...values.slice(1)));


exports.cons = cons;
exports.car = car;
exports.cdr = cdr;
exports.list = list;
exports.nil = nil;
exports.empty = empty;
exports.isPair = isPair;