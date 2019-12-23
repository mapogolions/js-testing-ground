const test = require('ava');
const { just, follows } = require ('../../src/fun/matching.js');


test('follows', t => {
  const match = follows(
    just('()'),
    just('<'),
    just('>')
  );
  t.is(match('()<>'), '()<>');
  t.false(match('()<'));
  t.false(match(''));
});

test('just', t => {
  t.is(just('(')('()'), '(');
  t.is(just('<')('<<>'), '<');
  t.false(just('<')('!<>'));
});
