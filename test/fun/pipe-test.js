'use strict';

const test = require('ava');

const { pipe } = require('../../src/fun/pipe.js');
const { curry } = require('../../src/fun/curry.js');
const { list, nil } = require('../../src/abstract data/cons.js');
const List = require('../../src/abstract data/fp-list.js');


test.only("test pipe", t => {
  t.is(
    pipe(list(1, 2, 3))
      ._(curry (List.map) (x => x + 1))
      ._(curry (List.str))
      .value,
    '(2 3 4)'
  );

  t.deepEqual(
    pipe(list(-2, 0, -1, -10, 3))
      ._(curry (List.filter) (x => x > 0))
      ._(curry (List.append) (list('a', 'b', 'c')))
      ._(curry (List.array))
      .value,
    ['a', 'b', 'c', 3]
  );
  
  t.is(
    pipe(list(1, 2, 3, 4, 5))
      ._(curry (List.filter) (x => x % 2 === 0))
      ._(curry (List.length))
      .value,
    2
  );

  t.is(
    pipe(list('a', 'b', 'c', 'd'))
      ._(curry (List.reverse))
      ._(curry (List.str))
      .value,
    '(d c b a)'
  );
});