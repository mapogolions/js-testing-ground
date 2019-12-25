'use strict';

const {
  cons,
  car,
  cdr,
  list,
  empty,
  nil,
} = require('./cons.js');

/**
 * Persistent single linked list (canonical definition).
 * It's a recursive data structure.
 *  type list 'a = nil | cons 'a (list 'a)
 *   where - `nil` is marker of list end
 *
 * (cons 1
 *    (cons 2
 *      (cons 3
 *        (cons 4 nil)))) or (another way)
 * (list 1 2 3 4)
 */

const length = pair => {
  const loop = (xs, count) => (empty(xs) ? count : loop(cdr(xs), count + 1));
  return loop(pair, 0);
};

const array = xs => {
  const loop = (xs, acc) => (empty(xs) ? acc : loop(cdr(xs), [...acc, car(xs)]));
  return loop(xs, []);
};

const str = xs => `(${array(xs).join(' ')})`;

const lastPair = xs => {
  if (empty(xs)) return xs;
  if (empty(cdr(xs))) return xs;
  return lastPair(cdr(xs));
};

const drop = (xs, n = 0) => {
  if (n <= 0 || empty(xs)) return xs;
  if (empty(cdr(xs))) return list();
  return drop(cdr(xs), n - 1);
};

const dropWhile = (p, xs) => {
  if (empty(xs)) return xs;
  if (p(car(xs))) return dropWhile(p, cdr(xs));
  return xs;
};

/**
 * xs = (cons 1 (cons 2 (cons 3 (cons 4 nil))))
 * foldl xs 0 + = ((((0 + 1) + 2) + 3) + 4)
 * foldl xs 1 * = ((((1 * 1) * 2) * 3) * 4)
 *
 * foldl :: ('b -> 'a -> 'b) -> 'b -> ['a]
 */
const foldl = (f, acc, xs) => {
  if (empty(xs)) return acc;
  return foldl(f, f(acc, car(xs)), cdr(xs));
};

/**
 * xs = (cons 1 (cons 2 (cons 3 (cons 4 nil))))
 * foldl xs 0 + = (1 + (2 + (3 + (4 + 0))))
 * foldl xs 1 * = (1 * (2 * (3 * (4 * 1))))
 *
 * foldr :: ('a -> 'b -> 'b) -> 'b -> ['a]
 */
const foldr = (f, end, xs) => {
  if (empty(xs)) return end;
  return f(car(xs), foldr(f, end, cdr(xs)));
};

const sum = xs => foldl((x, y) => x + y, 0, xs);
const product = xs => foldl((x, y) => x * y, 1, xs);

const append = (xs, ys) => {
  if (empty(xs)) return ys;
  return cons(car(xs), append(cdr(xs), ys));
};

const zip = (f, xs, ys) => {
  if (empty(xs) || empty(ys)) return nil;
  return cons(f(car(xs), car(ys)), zip(f, cdr(xs), cdr(ys)));
};

const reverse = xs => foldl((t, h) => cons(h, t), nil, xs);
const snapshot = xs => foldr((h, t) => cons(h, t), nil, xs);
const map = (f, xs) => foldr((h, t) => cons(f(h), t), nil, xs);
const flatMap = (f, xs) => foldr((h, t) => append(f(h), t), nil, xs);
const filter = (p, xs) => flatMap(x => (p(x) ? list(x) : list()), xs);
const sameParity = xs => cons(car(xs), filter(x => x % 2 === car(xs) % 2, cdr(xs)));


module.exports = {
  length,
  array,
  str,
  drop,
  dropWhile,
  foldl,
  foldr,
  zip,
  sum,
  product,
  append,
  reverse,
  snapshot,
  map,
  flatMap,
  filter,
  lastPair,
  sameParity,
};
