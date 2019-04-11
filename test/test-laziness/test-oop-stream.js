'use strict';

const test = require('ava');

const { Stream } = require('../../src/laziness/oop-stream.js');


test("Test: stream filter", t => {
  t.deepEqual(Stream.of(1).filter(it => it % 2 === 0).take(3), [2, 4, 6]);
});

test("Test: stream map", t => {
  t.deepEqual(Stream.of(0).map(it => it - 1).take(3), [-1, 0, 1]);
  t.deepEqual(Stream.of(0).map(it => it * it).take(3), [0, 1, 4]);
});

test("Test: stream take", t => {
  t.deepEqual(Stream.of(0).take(2), [0, 1]);
  t.deepEqual(Stream.of(20).take(1), [20]);
  t.deepEqual(Stream.of(0).take(-1), []);
});

test("Test: stream", t => {
  const s = Stream.of(0);
  t.is(s.head, 0);
  t.is(s.tail.head, 1);
  t.is(s.tail.tail.tail.head, 3);
});