'use strict';


const test = require('ava');
const SetOrdered = require('../../src/abstract data/fp-set-ordered.js');
const { list } = require('../../src/abstract data/cons.js');


test("method `SetOrdered.union`", t => {
  t.is(
    SetOrdered.str(SetOrdered.union(list('a'), list('b'))),
    '(a b)'
  );
  t.is(
    SetOrdered.str(SetOrdered.union(list('a'), list('a'))),
    '(a)'
  );
  t.is(
    SetOrdered.str(SetOrdered.union(list('a'), list())),
    '(a)'
  );
  t.is(
    SetOrdered.str(SetOrdered.union(list(), list())),
    '()'
  );
  t.is(
    SetOrdered.str(SetOrdered.union(list('a'), list('b', 'c'))),
    '(a b c)'
  );
});

test("method `SetOrdered.adjoin`", t => {
  t.is(
    SetOrdered.str(SetOrdered.adjoin('a', list('b'))),
    '(a b)'
  );
  t.is(
    SetOrdered.str(SetOrdered.adjoin('a', list())),
    '(a)'
  );
  t.is(
    SetOrdered.str(SetOrdered.adjoin(3, list(1, 2))),
    '(1 2 3)'
  );
});

test("method `SetOrdered.intersection`", t => {
  t.is(
    SetOrdered.str(SetOrdered.intersection(list(-1, 2), list(-1, 2, 3))),
    '(-1 2)'
  );
  t.is(
    SetOrdered.str(SetOrdered.intersection(list(2, 4), list(-1, 2, 3))),
    '(2)'
  );
});

test("method `SetOrdered.elementOfSet`", t => {
  t.false(SetOrdered.elementOfSet(1, list(-1, 2, 3)));
  t.false(SetOrdered.elementOfSet(1, list()));
  t.true(SetOrdered.elementOfSet(3, list(-1, 2, 3)));
});
