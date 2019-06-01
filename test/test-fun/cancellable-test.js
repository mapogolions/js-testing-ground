'use strict';


const test = require('ava');
const { cancellable } = require('../../src/fun/cancellable.js');


test('executes only first call', t => {
  const side_effect = [];
  const fn = cancellable(x => side_effect.push(x));
  fn(1);
  fn.cancel();
  fn(2);
  t.deepEqual(side_effect, [1]);
});
