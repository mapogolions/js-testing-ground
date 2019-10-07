'use strict';

const test = require('ava');
const { binarySearch, binarySearchOpt } = require('../../src/fun/binary-search');

const testCases = [binarySearch, binarySearchOpt];

test('should return -1 when array is empty', t => {
  testCases.forEach(f => t.is(-1, f(10, [])));
});

test('should return -1 when array does not contain a required element', t => {
  testCases.forEach(f => t.is(-1, f(10, [1, 2, 3])));
});

test('should return 0-th index when one element array contains required element', t => {
  testCases.forEach(f => t.is(0, f(10, [10])));
});

test('should return n-th index when array contains required element', t => {
  t.is(1, binarySearch(10, [1, 10]));
  t.is(2, binarySearch(3, [1, 2, 3, 4, 5]));
});

test('should found element if it has first position', t => {
  t.is(0, binarySearch(100, [100, 200, 300]));
  t.is(0, binarySearch(3, [3, 4]));
});

test('should found element if it has last position', t => {
  t.is(2, binarySearch(300, [100, 200, 300]));
  t.is(1, binarySearch(4, [3, 4]));
});
