const test = require('ava');
const { just, follows, greedyCases } = require ('../../src/fun/matching.js');

test('cases', t => {
  const match = greedyCases(
    just('he'),
    just('hello')
  );
  t.is(match('hello world'), 'hello');
  t.false(match(''));
});

test('follows', t => {
  const match = follows(
    just('()'),
    just('<'),
    just('>')
  );
  t.is(match('()<>'), '()<>');
  t.false(match('()<'));
  t.false(match(''));
  t.is(match('()<> '), '()<>');
});

test('just', t => {
  t.is(just('he')('hello'), 'he');
  t.is(just('hel')('hello world'), 'hel');
  t.false(just('hello')(' hello'));
});
