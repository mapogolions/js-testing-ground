'use strict';


const test = require('ava');
const { cancellable, CancellablePromise } = require('../../src/fun/cancellable.js');


test('executes only first call', t => {
  const sideEffect = [];
  const fn = cancellable(x => sideEffect.push(x));
  fn(1);
  fn.cancel();
  fn(2);
  t.deepEqual(sideEffect, [1]);
});

test('cancel promise before fulfilled', async t => {
  const cancelledPromise = new CancellablePromise(resolve => setTimeout(resolve, 10));
  cancelledPromise.cancel();
  const reason = await t.throwsAsync(cancelledPromise);
  t.is(reason.message, 'Promise was cancelled');
});

test('resolve promise with the given value', async t => {
  const resolvedPromise = new CancellablePromise(resolve => setTimeout(resolve, 10));
  await t.notThrowsAsync(resolvedPromise);
});
