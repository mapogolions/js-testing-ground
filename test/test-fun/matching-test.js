const test = require('ava');
const { just } = require ('../../src/fun/matching.js');


test('just', t => {
  t.is(just('(')('()'), '(');
  t.is(just('<')('<<>'), '<');
  t.false(just('<')('!<>'));
});
