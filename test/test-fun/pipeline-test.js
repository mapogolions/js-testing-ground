const test = require('ava');
const { pipeline, backPipeline } = require('../../src/fun/pipeline.js');


test('builds pipeline from sequence of functions', (t) => {
  const fs = [x => x + 1, x => x ** 2, x => x - 1];
  const f = pipeline(...fs);
  const g = backPipeline(...fs);
  t.is(f(5), 35);
  t.is(g(5), 17);
});
