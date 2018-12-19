'use strict';

const { cons, car, cdr } = require('./cons.js');

/**
 * Canonical definition persistent single linked list.
 * It's recursive data structure.
 *  type list 'a = nil | cons 'a (list 'a)
 *   where - `nil` is marker of list end
 * 
 * (cons 1
 *    (cons 2
 *      (cons 3
 *        (cons 4 nil)))) or (another way)
 * (list 1 2 3 4)
 */
const nil = null;
const list = (...values) => values.length == 0 ? nil : cons(values[0], list(...values.slice(1)));
const empty = xs => Object.is(xs, nil);

const len = pair => {
  const loop = (xs, count) => empty(xs) ? count : loop(cdr(xs), count + 1);
  return loop(pair, 0);
};

const asArray = xs => {
  const loop = (xs, values) => empty(xs) ? values : loop(cdr(xs), [...values, car(xs)]);
  return loop(xs, []);
};

const asString = xs => `list(${asArray(xs).join(' ')})`;

const lastPair = xs => {
  if (empty(xs)) return xs;
  else if (empty(cdr(xs))) return xs;
  else return lastPair(cdr(xs));
};

const drop = (xs, n = 0) => {
  if (n <= 0 || empty(xs)) return xs;
  else if (empty(cdr(xs))) return list();
  else return drop(cdr(xs), n - 1);
};

const dropWhile = (xs, p) => {
  if (empty(xs)) return xs;
  else if (p(car(xs))) return dropWhile(cdr(xs), p);
  else return xs;
};

/**
 * xs = (cons 1 (cons 2 (cons 3 (cons 4 nil))))
 * foldl xs 0 + = ((((0 + 1) + 2) + 3) + 4)
 * foldl xs 1 * = ((((1 * 1) * 2) * 3) * 4)
 * 
 * foldl :: ['a] -> 'b -> ('b -> 'a -> 'b)
 */
const foldl = (xs, acc, f) => {
  if (empty(xs)) return acc;
  else return foldl(cdr(xs), f(acc, car(xs)), f);
};

/**
 * xs = (cons 1 (cons 2 (cons 3 (cons 4 nil))))
 * foldl xs 0 + = (1 + (2 + (3 + (4 + 0))))
 * foldl xs 1 * = (1 * (2 * (3 * (4 * 1))))
 * 
 * foldr :: ['a] -> 'b -> ('a -> 'b -> 'b)
 */
const foldr = (xs, end, f) => {
  if (empty(xs)) return end;
  else return f(car(xs), foldr(cdr(xs), end, f));
};

const sum = xs => foldl(xs, 0, (x, y) => x + y);
const product = xs => foldl(xs, 1, (x, y) => x * y);

const append = (xs, ys) => {
  if (empty(xs)) return ys;
  else return cons(car(xs), append(cdr(xs), ys));
};

const reverse = xs => foldl(xs, nil, (t, h) => cons(h, t));
const snapshot = xs => foldr(xs, nil, (h, t) => cons(h, t));
const map = (xs, f) => foldr(xs, nil, (h, t) => cons(f(h), t));
const flatMap = (xs, f) => foldr(xs, nil, (h, t) => append(f(h), t));
const filter = (xs, p) => flatMap(xs, _ => p(_) ? list(_) : list());
const sameParity = xs => cons(car(xs), filter(cdr(xs), x => x % 2 === car(xs) % 2));

exports.list = list;
exports.cons = cons;
exports.nil = nil;
exports.car = car;
exports.cdr = cdr;
exports.len = len;
exports.empty = empty;
exports.asArray = asArray;
exports.asString = asString;
exports.drop = drop;
exports.dropWhile = dropWhile;
exports.foldl = foldl;
exports.foldr = foldr;
exports.sum = sum;
exports.product = product;
exports.append = append;
exports.reverse = reverse;
exports.snapshot = snapshot;
exports.map = map;
exports.flatMap = flatMap;
exports.filter = filter;
exports.lastPair = lastPair;
exports.sameParity = sameParity