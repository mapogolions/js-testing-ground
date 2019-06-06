const test = require('ava');
const partial = require('../../src/fun/partial.js');


test('returns partially applied function', (t) => {
  const sum = (a, b, c, d) => a + b + c + d;
  t.is(sum(1, 2, 3, 4), 10);
  t.is(partial(sum)(1, 2, 3, 4), 10);
  t.is(partial(sum, 1)(2, 3, 4), 10);
  t.is(partial(sum, 1, 2)(3, 4), 10);
  t.is(partial(sum, 1, 2, 3)(4), 10);
  t.is(partial(sum, 1, 2, 3, 4)(), 10);
});
