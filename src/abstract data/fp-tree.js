'use strict';

const { cons, car, cdr } = require('./cons.js');

const isPair = xs => typeof xs === 'function';

const nil = null;
const empty = xs => Object.is(xs, nil);

const list = (...values) => 
  values.length == 0 ? nil : cons(values[0], list(...values.slice(1)));

const array = xs => {
  const loop = (acc, xs) => {
    if (empty(xs)) return acc;
    else if (isPair(car(xs))) return loop([...acc, array(car(xs))], cdr(xs));
    else return loop([...acc, car(xs)], cdr(xs));
  };
  return loop([], xs);
};

const str = xs => {
  const loop = (acc, xs) => {
    if (empty(xs)) return `${acc.trim()})`;
    else if (isPair(car(xs))) return loop(`${acc}${str(car(xs))} `, cdr(xs));
    else return loop(`${acc}${car(xs)} `, cdr(xs));
  };
  return loop('(', xs);
};

exports.list = list;
exports.array = array;
exports.str = str;
exports.cons = cons;
exports.car = car;
exports.cdr = cdr;