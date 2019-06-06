'use strict';

const test = require('ava');
const { compose, asyncCompose, cpsCompose } = require('../../src/fun/compose.js');


test('traditional functional composition', (t) => {
  const f = compose(x => x ** 2, x => x + 1);
  const g = compose(x => x % 2 === 0, x => x + 1);
  t.is(f(1), 4);
  t.is(f(8), 81);
  t.true(g(1));
  t.false(g(2));
});

test('composition of asynchronous functions', async (t) => {
  const f = asyncCompose(async x => x ** 2, async x => x + 1);
  const g = asyncCompose(async x => x % 2 === 0, x => x + 1);
  t.is(await f(1), 4);
  t.is(await f(8), 81);
  t.true(await g(1));
  t.false(await g(2));
});

test('composition of functions using continuation passing style', (t) => {
  const f = cpsCompose(
    (x, callback) => callback(null, x ** 2),
    (x, callback) => callback(null, x + 1),
  );
  const g = cpsCompose(
    (x, callback) => callback(null, x % 2 === 0),
    (x, callback) => callback(null, x + 1),
  );
  f(1, (err, payload) => t.is(payload, 4));
  f(8, (err, payload) => t.is(payload, 81));
  g(1, (err, payload) => t.true(payload));
  g(2, (err, payload) => t.false(payload));
});
