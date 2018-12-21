'use strict';

const test = require('ava');

const Stream = require('../../src/laziness/fp-stream.js');
const { pipe } = require('../../src/fun/pipe.js');
const { curry } = require('../../src/fun/curry.js');
const { nil } = require('../../src/abstract data/cons.js');


test("method `Stream.filter & Stream.map`", t => {
  t.deepEqual(
    pipe(Stream.from([-30, -20, -10, 0, 1, 2, 3]))
      ._(curry (Stream.map) (x => -x))
      ._(curry (Stream.filter) (x => x > 0))
      ._(curry (Stream.take) (2))
      .value,
    [30, 20]
  );
});

test("method `Stream.filter`", t => {
  t.deepEqual(
    pipe(Stream.of(1))
      ._(curry (Stream.filter) (x => x % 2 !== 0))
      ._(curry (Stream.take) (3))
      .value,
    [1, 3, 5]
  );

  t.deepEqual(
    pipe(Stream.of(1))
      ._(curry (Stream.filter) (x => x % 2 === 0))
      ._(curry (Stream.take) (2))
      .value,
    [2, 4]
  );
});

test("method `Stream.map`", t => {
  t.deepEqual(
    pipe(Stream.of(1))
      ._(curry (Stream.map) (x => x * x))
      ._(curry (Stream.take) (4))
      .value,
    [1, 4, 9, 16]
  );
});

test("method `Stream.take`", t => {
  t.deepEqual(
    pipe(Stream.from(['a', 'c', 'd', 'z']))
      ._(curry (Stream.take) (100))
      .value,
    ['a', 'c', 'd', 'z']
  );

  t.deepEqual(
    pipe(nil)
      ._(curry (Stream.take) (100))
      .value,
    []
  );

  t.deepEqual(
    pipe(Stream.of(1))
      ._(curry (Stream.take) (4))
      .value,
    [1, 2, 3, 4]
  );
});

test("method `Stream.str`", t => {
  t.is(
    pipe(Stream.of(10))
      ._(Stream.str)
      .value,
    '(10 <thunk>)'
  );

  t.is(
    pipe(nil)
      ._(Stream.str)
      .value,
    '()'
  );
});

test("method `Stream.head & Stream.tail`", t => {
  t.is(
    pipe(Stream.from(['a', 'b', 'c']))
      ._(Stream.head)
      .value,
    'a'
  );

  t.is(
    pipe(Stream.of(1))
    ._(Stream.tail)
    ._(Stream.head)
    .value,
    2
  )

  t.is(
    pipe(Stream.of(1))
    ._(Stream.head)
    .value,
    1
  )
});