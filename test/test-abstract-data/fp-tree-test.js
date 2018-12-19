'use strict';

const test = require('ava');

const { cons, car, cdr, list, nil, empty } = require('../../src/abstract data/cons.js');
const Tree = require('../../src/abstract data/fp-tree.js');
const List = require('../../src/abstract data/fp-list.js');


test("Test `List.append, cons, list`", t => {
  const x = list(1, 2, 3);
  const y = list(4, 5, 6);
  t.deepEqual(List.str(List.append(x, y)), '(1 2 3 4 5 6)');
  t.deepEqual(Tree.str(list(x, y)), '((1 2 3) (4 5 6))');
  t.deepEqual(Tree.str(cons(x, y)), '((1 2 3) 4 5 6)');
});

test("test `Tree.leaves and List.length`", t => {
  t.is(List.length( list(list(1, 2), list(3, 4)) ), 2);
  t.is(Tree.leaves( list(list(1, 2), list(3, 4)) ), 4);
  t.is(List.length( list(list(1, 2), 3, list(4, list(5))) ), 3);
  t.is(Tree.leaves( list(list(1, 2), 3, list(4, list(5))) ), 5);
});

test("test `Tree.str`", t => {
  t.deepEqual(
    Tree.str( cons(list(1), list(2, 3)) ),
    '((1) 2 3)'
  );
  t.deepEqual(
    Tree.str( list(list(1), list(2, 3)) ),
    '((1) (2 3))'
  );

  t.deepEqual(
    Tree.str( list(list(1), list(2), list(4)) ), 
    '((1) (2) (4))'
  );

  t.deepEqual(
    Tree.str( list(1, list(2, 3), 4) ),
    '(1 (2 3) 4)'
  );

  t.deepEqual(
    Tree.str(list(1, 2, 3)),
    '(1 2 3)'
  );
});

test("test `Tree.array`", t => {
  t.deepEqual(
    Tree.array( list(1, list(2, 3), 4) ), 
    [1, [2, 3], 4]
  );
  t.deepEqual(
    Tree.array( list(list(1), list(2), list(4)) ), 
    [[1], [2], [4]]
  );
  t.deepEqual(
    Tree.array( cons(list(1), list(2, 3)) ),
    [[1], 2, 3]
  );
  t.deepEqual(
    Tree.array( list(list(1), list(2, 3)) ),
    [[1], [2, 3]]
  );
});