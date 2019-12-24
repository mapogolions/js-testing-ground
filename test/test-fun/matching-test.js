'use strict';

const test = require('ava');
const { just, follows, greedyCases, balanced, isBalanced } = require ('../../src/fun/matching.js');

test('is balanced', t => {
  t.true(isBalanced('()'));
  t.true(isBalanced('()()'));
  t.true(isBalanced('(())'));
  t.true(isBalanced('(()())()'));
  t.false(isBalanced('('));
  t.false(isBalanced(')'));
  t.false(isBalanced('(()'));
  t.false(isBalanced('()('));
});

test('balanced', t => {
  t.is(balanced('()'), '()');
  t.is(balanced('()()'), '()()');
  t.is(balanced('(())'), '(())');
  t.is(balanced('(()())()'), '(()())()');
  t.false(balanced('('));
  t.false(balanced(')'));
  t.false(balanced('(()'));
  t.is(balanced('()('), '()');
});

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
