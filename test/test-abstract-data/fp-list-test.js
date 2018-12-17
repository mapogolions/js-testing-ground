'use strict';


const test = require('ava');

const { cons, car, cdr } = require('../../src/abstract data/cons.js');

const { 
  list, nil, len, empty, asArray, asString, 
  drop, dropWhile, foldLeft, foldRight, sum, product, append,
  reverse, snapshot, map, flatMap, filter
} = require('../../src/abstract data/fp-list.js');


test("method `filter`", t => {
  t.is(len(filter(list(0, 2, 3), _ => _ > 0)), 2);
})
;
test("method `flatMap", t => {
  t.is(car(flatMap(list(1, 2, 3), _ => list(_ + 10))), 11);
  t.is(car(flatMap(list(false, true, false), _ => list(_.toString()))), "false");
});

test("method `map`", t => {
  t.is(car(map(list(1, 2, 3), _ => _ + 1)), 2);
  t.is(car(map(list(-1, 2, 3), _ => _ > 0)), false);
});

test("method `snapshot`", t => {
  t.is(car(snapshot(list(1, 2))), 1);
});

test("method `reverse`", t => {
  t.is(car(reverse(list(1, 2, 3))), 3);
  t.is(reverse(nil), nil);
  t.is(car(reverse(cons(1, cons(2, nil)))), 2);
  t.is(len(reverse(list('a', 'b', 'c'))), 3);
});

test("method `append`", t => {
  t.is(len(append(list(1, 2, 3), list("a", "b", "c"))), 6);
  t.is(len(append(list(), list(1))), 1);
  t.is(len(append(nil, cons(1, cons(2, nil)))), 2);
  t.is(len(append(list(), nil)), 0);
});

test("method product", t => {
  t.is(product(cons(1, nil)), 1);
});

test("method sum", t => {
  t.is(sum(list(1, 2, 3)), 6);
  t.is(sum(list(10, 20, -10)), 20);
});

test("method foldRight", t => {
  t.is(foldRight(list(1, 2, 3), 0, (x, y) => x + y), 6);
  t.is(foldLeft(list(1, 2, 3, 4), 1, (x, y) => x * y), 24);
});

test("method foldLeft", t => {
  t.is(foldLeft(list(1, 2, 3, 4), 1, (x, y) => x * y), 24);
  t.is(foldLeft(list(100, 50, 20), 0, (x, y) => x + y), 170);
});

test("method `dropWhile`", t => {
  t.is(len(dropWhile(list(-1, 0, 1, 2), _ => _ <= 0)), 2);
  t.is(car(dropWhile(list(2, 4, 6, 8, 7), _ => _ % 2 === 0)), 7);
});

test("method `drop", t => {
  t.is(len(drop(list(1, 2, 3), 1)), 2);
  t.is(car(drop(list(1, 2, 3, 4), 2)), 3);
  t.is(drop(list()), nil);
  t.is(drop(cons(1, nil), 1), nil);
});

test("method `asString`", t => {
  t.is(asString(list(1, 2, 3)), 'list(1 2 3)');
  t.is(asString(cons("a", cons("b", nil))), 'list(a b)');
});

test("method `asArray`", t => {
  t.deepEqual(["a", "b", "c"], asArray(list("a", "b", "c")));
  t.deepEqual([1, 2], asArray(cons(1, cons(2, nil))));
});

test("test method `len`", t => {
  t.is(len(list(1, 2, 3)), 3);
  t.is(len(cons(1, nil)), 1);
  t.is(len(cons(1, cons(2, nil))), 2);
  t.is(len(list()), 0);
  t.is(len(nil), 0);
});

test("test is empty", t => {
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
