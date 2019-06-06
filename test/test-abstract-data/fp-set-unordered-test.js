'use strict';

const test = require('ava');
const SetUnordered = require('../../src/abstract data/fp-set-unrodered.js');
const pipe = require('../../src/fun/pipe.js');
const curry = require('../../src/fun/curry.js');
const { list } = require('../../src/abstract data/cons.js');


test("method `SetUnordered.union`", t => {
  t.is(
    SetUnordered.str(
      SetUnordered.union(list(), list())
    ),
    '()'
  );
  
  t.is(
    SetUnordered.str(
      SetUnordered.union(list(), list('a', 'b'))
    ),
    '(a b)'
  );

  t.is(
    SetUnordered.str(
      SetUnordered.union(list('a', 'b'), list())
    ),
    '(a b)'
  );

  t.is(
    SetUnordered.str(
      SetUnordered.union(list(1, 2), list(-1, -2))
    ),
    '(1 2 -1 -2)'
  );

  t.is(
    SetUnordered.str(
      SetUnordered.union(list(1, 2, 3), list(2, 4))
    ),
    '(1 2 3 4)'
  );
});

test("method `SetUnordered.intersection`", t => {
  t.is(
    SetUnordered.str(
      SetUnordered.intersection(list(1, -1, 3), list())
    ),
    '()'
  );
  
  t.is(
    SetUnordered.str(
      SetUnordered.intersection(list(), list(1, -1))
    ),
    '()'
  );

  t.is(
    SetUnordered.str(
      SetUnordered.intersection(list(1, -1, 3), list())
    ),
    '()'
  );

  t.is(
    SetUnordered.str(
      SetUnordered.intersection(list(1, -1, 3), list(3, 2, 1))
    ),
    '(1 3)'
  );
});

test("method `SetUnordered.adjoin`", t => {
  t.is(
    pipe(list(1, -2, 0))
      ._(curry (SetUnordered.adjoin) (-2))
      ._(SetUnordered.str)
      .value,
    '(1 -2 0)'
  );

  t.is(
    pipe(list())
      ._(curry (SetUnordered.adjoin) (3))
      ._(SetUnordered.str)
      .value,
    '(3)'
  );

  t.is(
    pipe(list(1, -2, 0))
      ._(curry (SetUnordered.adjoin) (3))
      ._(SetUnordered.str)
      .value,
    '(3 1 -2 0)'
  );
});

test("method `SetUnordered.elementOfSet`", t => {
  t.true(
    SetUnordered.elementOfSet(2, list(1, 2, 3, 4, 5))
  );
  t.true(
    SetUnordered.elementOfSet(-10, list(1, 2, 3, 4, -10, -1))
  );
  t.false(
    SetUnordered.elementOfSet(-2, list(1, 2, 3, 4, -10, -1))
  );
  t.false(
    SetUnordered.elementOfSet(-10, list())
  )
});