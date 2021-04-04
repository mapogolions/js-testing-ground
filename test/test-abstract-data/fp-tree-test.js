'use strict';

const test = require('ava');

const Tree = require('../../src/abstract-data/fp-tree.js');
const List = require('../../src/abstract-data/fp-list.js');
const pipe = require('../../src/fun/pipe.js');
const curry = require('../../src/fun/curry.js');
const { cons, list } = require('../../src/abstract-data/cons.js');


test('Test `Tree.map`', (t) => {
  const square = x => x * x;
  t.deepEqual(
    pipe(list(1, list(2, list(3), list(list(4), 5))))
      ._(curry(Tree.map)(square))
      ._(curry(Tree.str))
      .value,
    '(1 (4 (9) ((16) 25)))',
  );

  t.deepEqual(
    pipe(list(1, list(2, list(3), list(list(4), 5))))
      ._(curry(Tree.map)(x => x + 1))
      ._(curry(Tree.str))
      .value,
    '(2 (3 (4) ((5) 6)))',
  );
});

test('Test `Tree.reverse`', (t) => {
  t.deepEqual(Tree.str(Tree.reverse(list(list(1, 2), list(3, 4)))), '((4 3) (2 1))');

  t.deepEqual(Tree.str(List.reverse(list(list(1, 2), list(3, 4)))), '((3 4) (1 2))');

  t.deepEqual(
    Tree.str(Tree.reverse(list(1, 2, 3, 4))),
    List.str(Tree.reverse(list(1, 2, 3, 4))),
  );
});

test('Test `Tree.flatten`', (t) => {
  t.deepEqual(Tree.str(Tree.flatten(list(1, 2, list(list(3)), 4))), '(1 2 3 4)');
  t.deepEqual(
    Tree.str(Tree.flatten(list(list(1, 2), 3, list(list(4, 5), 6)))),
    '(1 2 3 4 5 6)',
  );
});

test('Test `List.append, cons, list`', (t) => {
  const x = list(1, 2, 3);
  const y = list(4, 5, 6);
  t.deepEqual(List.str(List.append(x, y)), '(1 2 3 4 5 6)');
  t.deepEqual(Tree.str(list(x, y)), '((1 2 3) (4 5 6))');
  t.deepEqual(Tree.str(cons(x, y)), '((1 2 3) 4 5 6)');
});

test('test `Tree.leaves and List.length`', (t) => {
  t.is(List.length(list(list(1, 2), list(3, 4))), 2);
  t.is(Tree.leaves(list(list(1, 2), list(3, 4))), 4);
  t.is(List.length(list(list(1, 2), 3, list(4, list(5)))), 3);
  t.is(Tree.leaves(list(list(1, 2), 3, list(4, list(5)))), 5);
});

test('test `Tree.str`', (t) => {
  t.deepEqual(Tree.str(cons(list(1), list(2, 3))), '((1) 2 3)');
  t.deepEqual(Tree.str(list(list(1), list(2, 3))), '((1) (2 3))');

  t.deepEqual(Tree.str(list(list(1), list(2), list(4))), '((1) (2) (4))');

  t.deepEqual(Tree.str(list(1, list(2, 3), 4)), '(1 (2 3) 4)');

  t.deepEqual(Tree.str(list(1, 2, 3)), '(1 2 3)');
});

test('test `Tree.array`', (t) => {
  t.deepEqual(Tree.array(list(1, list(2, 3), 4)), [1, [2, 3], 4]);
  t.deepEqual(Tree.array(list(list(1), list(2), list(4))), [[1], [2], [4]]);
  t.deepEqual(Tree.array(cons(list(1), list(2, 3))), [[1], 2, 3]);
  t.deepEqual(Tree.array(list(list(1), list(2, 3))), [[1], [2, 3]]);
});
