'use strict';

const test = require('ava');
const { pathNavigateAboveRoot } = require('../../src/fun/path-utils');

test('should return true when path naviagete above root', t => {
  t.true(pathNavigateAboveRoot('../'));
  t.true(pathNavigateAboveRoot('./../'));
});
