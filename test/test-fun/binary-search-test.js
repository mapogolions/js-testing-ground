'use strict';

const test = require('ava');
const { binarySearch } = require('../../src/fun/binary-search');


test('should return -1 when array is empty', t => {
  t.is(-1, binarySearch(10, []));
});

test('should return 0-th index when one element array contains required element', t => {
  t.is(0, binarySearch(10, [10]));
});

test('should return n-th index when array contains required element', t => {
  t.is(1, binarySearch(10, [1, 10]));
  t.is(2, binarySearch(3, [1, 2, 3, 4, 5]));
});
