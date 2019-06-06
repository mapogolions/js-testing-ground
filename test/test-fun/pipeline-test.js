const test = require('ava');
const {
  pipeline, backPipeline, asyncPipeline, backAsyncPipeline,
} = require('../../src/fun/pipeline.js');


test('builds pipeline from sequence of sync functions', (t) => {
  const fs = [x => x + 1, x => x ** 2, x => x - 1];
  const [f, g] = [pipeline(...fs), backPipeline(...fs)];
  t.is(f(5), 35);
  t.is(g(5), 17);
});

test('builds pipeline from sequence of async functions', async (t) => {
  const fs = [async x => x + 1, async x => x ** 2, async x => x - 1];
  const [f, g] = [asyncPipeline(...fs), backAsyncPipeline(...fs)];
  t.is(await f(5), 35);
  t.is(await g(5), 17);
});
