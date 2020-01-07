'use strict';

const test = require('ava');

const List = require('../../src/abstract data/fp-list.js');
const pipe = require('../../src/fun/pipe.js');
const curry = require('../../src/fun/curry.js');
const {
  cons,
  car,
  cdr,
  list,
  nil,
  empty,
} = require('../../src/abstract data/cons.js');

test('repeat', t => {
  t.is(List.str(List.repeat('a', 3)), '(a a a)');
  t.is(List.str(List.repeat(1, 0)), '()');
});

test('transducer 1', t => {
  const testCases = [
    {
      xs: list(1, 2, 3),
      seed: [],
      reducer: (acc, x) => { acc.push(x); return acc; },
      transformer: reducer => (acc, x) => reducer(acc, x + 1),
      expected: [2, 3, 4]
    },
    {
      xs: list('a', 'b', 'c'),
      seed: '',
      reducer: (acc, x) => acc === '' ? `${x}` : `${acc}-${x}`,
      transformer: reducer => (acc, x) => reducer(acc, x.toUpperCase()),
      expected: 'A-B-C'
    }
  ];

  testCases.forEach(({ xs, seed, reducer, transformer, expected }) => {
    const actual = List.transduce(transformer, reducer, seed, xs);
    t.deepEqual(actual, expected);
  });
});

test('method `List.zip`', (t) => {
  t.deepEqual(
    pipe(list(-1, -2, -3))
      ._(curry(List.zip)((x, y) => [x, y])(list(1, 2, 3)))
      ._(curry(List.array))
      .value,
    [[1, -1], [2, -2], [3, -3]],
  );

  t.deepEqual(
    pipe(list(1, 2, 3))
      ._(curry(List.zip)((x, y) => x + y)(list(1, 2, 3)))
      ._(curry(List.array))
      .value,
    [2, 4, 6],
  );
});

test('method `List.sameParity`', (t) => {
  t.deepEqual(List.array(List.sameParity(list(1, 2, 3, 4, 5))), [1, 3, 5]);
  t.deepEqual(List.array(List.sameParity(list(2, 3, 4, 5, 6))), [2, 4, 6]);
});

test('method `List.lastPair`', (t) => {
  t.deepEqual(List.lastPair(list()), nil);
  t.is(car(List.lastPair(list(1, 2, 3))), 3);
  t.is(cdr(List.lastPair(list(1, 2, 3))), nil);
  t.is(List.length(List.lastPair(list(1, 2, 3))), 1);
  t.deepEqual(List.array(List.lastPair(list(1))), [1]);
  t.deepEqual(List.array(List.lastPair(list(1, 2))), [2]);
});

test('method `List.filter`', (t) => {
  t.is(List.str(List.filter(x => x > 0, list(0, 2, 3))), '(2 3)');
});

test('method `List.flatMap', (t) => {
  t.is(List.str(List.flatMap(x => list(x + 10), list(1, 2, 3))), '(11 12 13)');
  t.is(List.str(List.flatMap(x => list(x.toString()), list(1, 2, 4))), '(1 2 4)');
});

test('method `List.map`', (t) => {
  t.is(List.str(List.map(x => x + 1, list(1, 2, 3))), '(2 3 4)');
  t.is(List.str(List.map(x => x > 0, list(-1, 2, 3))), '(false true true)');
});

test('method `List.snapshot`', (t) => {
  t.is(List.str(List.snapshot(list(1, 2))), '(1 2)');
});

test('method `List.reverse`', (t) => {
  t.is(List.str(List.reverse(list(1, 2, 3))), '(3 2 1)');
  t.is(List.reverse(nil), nil);
  t.is(List.str(List.reverse(cons(1, cons(2, nil)))), '(2 1)');
  t.is(List.str(List.reverse(list('a', 'b', 'c'))), '(c b a)');
});

test('method `List.append`', (t) => {
  t.is(List.str(List.append(list(1, 2, 3), list('a', 'b', 'c'))), '(1 2 3 a b c)');
  t.is(List.str(List.append(list(), list(1))), '(1)');
  t.is(List.str(List.append(nil, cons(1, cons(2, nil)))), '(1 2)');
  t.is(List.str(List.append(list(), nil)), '()');
});

test('method `List.product`', (t) => {
  t.is(List.product(cons(1, nil)), 1);
});

test('method `List.sum`', (t) => {
  t.is(List.sum(list(1, 2, 3)), 6);
  t.is(List.sum(list(10, 20, -10)), 20);
});

test('method `List.foldr`', (t) => {
  t.is(List.foldr((x, y) => x + y, 0, list(1, 2, 3)), 6);
  t.is(List.foldr((x, y) => x * y, 1, list(1, 2, 3, 4)), 24);
});

test('method `List.foldl`', (t) => {
  t.is(List.foldl((x, y) => x * y, 1, list(1, 2, 3, 4)), 24);
  t.is(List.foldl((x, y) => x + y, 0, list(100, 50, 20)), 170);
});

test('method `List.dropWhile`', (t) => {
  t.is(List.length(List.dropWhile(x => x <= 0, list(-1, 0, 1, 2))), 2);
  t.is(List.str(List.dropWhile(x => x % 2 === 0, list(2, 4, 6, 8, 7))), '(7)');
});

test('method `List.drop', (t) => {
  t.is(List.length(List.drop(list(1, 2, 3), 1)), 2);
  t.is(List.str(List.drop(list(1, 2, 3, 4), 2)), '(3 4)');
  t.is(List.drop(list()), nil);
  t.is(List.str(List.drop(cons(1, nil), 1)), '()');
});

test('method `List.str`', (t) => {
  t.is(List.str(list(1, 2, 3)), '(1 2 3)');
  t.is(List.str(cons('a', cons('b', nil))), '(a b)');
});

test('method `List.array`', (t) => {
  t.deepEqual(['a', 'b', 'c'], List.array(list('a', 'b', 'c')));
  t.deepEqual([1, 2], List.array(cons(1, cons(2, nil))));
});

test('test `List.length`', (t) => {
  t.is(List.length(list(1, 2, 3)), 3);
  t.is(List.length(cons(1, nil)), 1);
  t.is(List.length(cons(1, cons(2, nil))), 2);
  t.is(List.length(list()), 0);
  t.is(List.length(nil), 0);
});

test('test `empty`', (t) => {
  t.true(empty(list()));
  t.true(empty(nil));
  t.false(empty(list(1, 2)));
  t.false(empty(cons(1, nil)));
});

test('test car and cdr', (t) => {
  t.is(car(cons(1, 'text')), 1);
  t.is(cdr(cons(1, 'text')), 'text');
  t.is(car(list('a', 1)), 'a');
  t.is(car(cdr(list('a', 'b'))), 'b');
});
