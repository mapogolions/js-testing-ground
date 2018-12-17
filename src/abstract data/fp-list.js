'use strict';


const { cons, car, cdr } = require('./cons.js');

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

const foldLeft = (xs, acc, f) => {
  if (empty(xs)) return acc;
  else return foldLeft(cdr(xs), f(acc, car(xs)), f);
};

const foldRight = (xs, end, f) => {
  if (empty(xs)) return end;
  else return f(car(xs), foldRight(cdr(xs), end, f));
};

const sum = xs => foldLeft(xs, 0, (x, y) => x + y);
const product = xs => foldLeft(xs, 1, (x, y) => x * y);

const append = (xs, ys) => {
  if (empty(xs)) return ys;
  else return cons(car(xs), append(cdr(xs), ys));
};

const reverse = xs => foldLeft(xs, nil, (t, h) => cons(h, t));
const snapshot = xs => foldRight(xs, nil, (h, t) => cons(h, t));
const map = (xs, f) => foldRight(xs, nil, (h, t) => cons(f(h), t));
const flatMap = (xs, f) => foldRight(xs, nil, (h, t) => append(f(h), t));
const filter = (xs, p) => flatMap(xs, _ => p(_) ? list(_) : list());


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
exports.foldLeft = foldLeft;
exports.foldRight = foldRight;
exports.sum = sum;
exports.product = product;
exports.append = append;
exports.reverse = reverse;
exports.snapshot = snapshot;
exports.map = map;
exports.flatMap = flatMap;
exports.filter = filter;