'use strict';

const test = require('ava');
const { Pair, Tuple } = require('../../src/abstract data/pair.js');


test('returns an element from pair by index', (t) => {
  const pair = Pair('a', 'b');
  t.is(pair(1), 'a');
  t.is(pair(2), 'b');
});

test('pair index starts with one', (t) => {
  const pair = Pair('a', 'b');
  const error = t.throws(() => pair(0), { instanceOf: RangeError });
  t.is(error.message, 'Pair index out of range');
});

test('pair index out of range', (t) => {
  const pair = Pair('a', 'b');
  const error = t.throws(() => pair(3), { instanceOf: RangeError });
  t.is(error.message, 'Pair index out of range');
});

test('missing required arguments', (t) => {
  const error = t.throws(() => Pair(/* without arguments */), { instanceOf: TypeError });
  t.is(error.message, 'Missing required positional argument');
});

test('missing one of the required arguments', (t) => {
  const error = t.throws(() => Pair('only first'), { instanceOf: TypeError });
  t.is(error.message, 'Missing required positional argument');
});

test('returns an element from tuple by index', (t) => {
  const tuple = Tuple('a', 'b', 'c');
  t.is(tuple(0), 'a');
  t.is(tuple(1), 'b');
  t.is(tuple(2), 'c');
});

test('tuple index out of range', (t) => {
  const tuple = Tuple()
  const error = t.throws(() => tuple(0), { instanceOf: RangeError });
  t.is(error.message, 'Tuple index out of range');
});
