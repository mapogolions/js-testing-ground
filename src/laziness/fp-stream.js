'use strict';

const { cons, nil, list, empty, car, cdr } = require('../abstract data/cons.js');

function of(n) {
  return cons(n, () => of(n + 1));
}

function from(xs) {
  if (xs.length === 0) return nil;
  else return cons(xs[0], () => from(xs.slice(1)));
}

const head = ss => car(ss);
const tail = ss => cdr(ss)();
const str = ss => empty(ss) ? '()' : `(${head(ss)} <thunk>)`;
const take = (n, ss) => {
  // tailrec
  const loop = (acc, ss, n) => {
    if (n <= 0 || empty(ss)) return acc;
    else return loop([...acc, head(ss)], tail(ss), n - 1);
  };
  return loop([], ss, n);
};

const map = (f, ss) => {
  if (empty(ss)) return nil;
  else return cons(f(head(ss)), () => map(f, tail(ss)));
};

const filter = (f, ss) => {
  if (empty(ss)) return nil;
  else return f(head(ss)) ? cons(head(ss), () => filter(f, tail(ss)))
                          : filter(f, tail(ss));
};

const Stream = {
  of, 
  from,
  head,
  tail,
  str,
  take,
  map,
  filter
};

module.exports = Stream;