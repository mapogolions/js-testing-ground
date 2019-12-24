'use strict';

const test = require('ava');
const List = require('../../src/abstract data/fp-list.js');
const Stream = require('../../src/laziness/fp-stream.js');
const { pascalTriangle, fastPascalTriangle, pascalList } = require('../../src/fun/pascalTriangle.js');


test('`pascalaList`', (t) => {
  const s = pascalList(10);

  t.deepEqual(
    List.array(Stream.take(3, s)),
    [[1], [1, 1], [1, 2, 1]],
  );
  t.deepEqual(
    List.array(Stream.take(2, s)),
    [[1], [1, 1]],
  );
  t.deepEqual(
    Stream.head(Stream.tail(Stream.tail(s))),
    [1, 2, 1],
  );
  t.deepEqual(
    Stream.head(Stream.tail(s)),
    [1, 1],
  );
  t.deepEqual(
    Stream.head(s),
    [1],
  );
});

// n^2 - complexity
test('`fastPascalTriangle`', (t) => {
  t.deepEqual(List.array(fastPascalTriangle(1)), [1]);
  t.deepEqual(List.array(fastPascalTriangle(2)), [1, 1]);
  t.deepEqual(List.array(fastPascalTriangle(3)), [1, 2, 1]);
  t.deepEqual(List.array(fastPascalTriangle(4)), [1, 3, 3, 1]);
  t.deepEqual(List.array(fastPascalTriangle(5)), [1, 4, 6, 4, 1]);
});

// 2^n - complexity
test('`pascalTriangle`', (t) => {
  t.deepEqual(List.array(pascalTriangle(1)), [1]);
  t.deepEqual(List.array(pascalTriangle(2)), [1, 1]);
  t.deepEqual(List.array(pascalTriangle(3)), [1, 2, 1]);
  t.deepEqual(List.array(pascalTriangle(4)), [1, 3, 3, 1]);
  t.deepEqual(List.array(pascalTriangle(5)), [1, 4, 6, 4, 1]);
});
