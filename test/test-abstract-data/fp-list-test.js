'use strict';

const test = require('ava');

const { cons, car, cdr, list, nil, empty } = require('../../src/abstract data/cons.js');
const List = require('../../src/abstract data/fp-list.js');


test("method List.sameParity", t => {
  t.deepEqual(List.array(List.sameParity(list(1, 2, 3, 4, 5))), [1, 3, 5]);
  t.deepEqual(List.array(List.sameParity(list(2, 3, 4, 5, 6))), [2, 4, 6]);
});

test("method `List.lastPair`", t => {
  t.deepEqual(List.lastPair(list()), nil);
  t.is(car(List.lastPair(list(1, 2, 3))), 3);
  t.is(cdr(List.lastPair(list(1, 2, 3))), nil);
  t.is(List.length(List.lastPair(list(1, 2, 3))), 1);
  t.deepEqual(List.array(List.lastPair(list(1))), [1]);
  t.deepEqual(List.array(List.lastPair(list(1, 2))), [2]);
});

test("method `List.filter`", t => {
  t.is(List.length(List.filter(list(0, 2, 3), _ => _ > 0)), 2);
});

test("method `List.flatMap", t => {
  t.is(car(List.flatMap(list(1, 2, 3), _ => list(_ + 10))), 11);
  t.is(car(List.flatMap(list(false, true, false), _ => list(_.toString()))), "false");
});

test("method `List.map`", t => {
  t.is(car(List.map(list(1, 2, 3), _ => _ + 1)), 2);
  t.is(car(List.map(list(-1, 2, 3), _ => _ > 0)), false);
});

test("method `List.snapshot`", t => {
  t.is(car(List.snapshot(list(1, 2))), 1);
});

test("method `List.reverse`", t => {
  t.is(car(List.reverse(list(1, 2, 3))), 3);
  t.is(List.reverse(nil), nil);
  t.is(car(List.reverse(cons(1, cons(2, nil)))), 2);
  t.is(List.length(List.reverse(list('a', 'b', 'c'))), 3);
});

test("method `List.append`", t => {
  t.is(List.length(List.append(list(1, 2, 3), list("a", "b", "c"))), 6);
  t.is(List.length(List.append(list(), list(1))), 1);
  t.is(List.length(List.append(nil, cons(1, cons(2, nil)))), 2);
  t.is(List.length(List.append(list(), nil)), 0);
});

test("method `List.product`", t => {
  t.is(List.product(cons(1, nil)), 1);
});

test("method `List.sum`", t => {
  t.is(List.sum(list(1, 2, 3)), 6);
  t.is(List.sum(list(10, 20, -10)), 20);
});

test("method `List.foldr`", t => {
  t.is(List.foldr(list(1, 2, 3), 0, (x, y) => x + y), 6);
  t.is(List.foldr(list(1, 2, 3, 4), 1, (x, y) => x * y), 24);
});

test("method `List.foldl`", t => {
  t.is(List.foldl(list(1, 2, 3, 4), 1, (x, y) => x * y), 24);
  t.is(List.foldl(list(100, 50, 20), 0, (x, y) => x + y), 170);
});

test("method `List.dropWhile`", t => {
  t.is(List.length(List.dropWhile(list(-1, 0, 1, 2), _ => _ <= 0)), 2);
  t.is(car(List.dropWhile(list(2, 4, 6, 8, 7), _ => _ % 2 === 0)), 7);
});

test("method `List.drop", t => {
  t.is(List.length(List.drop(list(1, 2, 3), 1)), 2);
  t.is(car(List.drop(list(1, 2, 3, 4), 2)), 3);
  t.is(List.drop(list()), nil);
  t.is(List.drop(cons(1, nil), 1), nil);
});

test("method `List.str`", t => {
  t.is(List.str(list(1, 2, 3)), '(1 2 3)');
  t.is(List.str(cons("a", cons("b", nil))), '(a b)');
});

test("method `List.array`", t => {
  t.deepEqual(["a", "b", "c"], List.array(list("a", "b", "c")));
  t.deepEqual([1, 2], List.array(cons(1, cons(2, nil))));
});

test("test `List.length`", t => {
  t.is(List.length(list(1, 2, 3)), 3);
  t.is(List.length(cons(1, nil)), 1);
  t.is(List.length(cons(1, cons(2, nil))), 2);
  t.is(List.length(list()), 0);
  t.is(List.length(nil), 0);
});

test("test `empty`", t => {
  t.true(empty(list()));
  t.true(empty(nil));
  t.false(empty(list(1, 2)));
  t.false(empty(cons(1, nil)));
});

test("test car and cdr", t => {
  t.is(car(cons(1, "text")), 1);
  t.is(cdr(cons(1, "text")), "text");
  t.is(car(list("a", 1)), "a");
  t.is(car(cdr(list("a", "b"))), "b");
});
