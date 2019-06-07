const test = require('ava');
const {
  pipeline,
  backPipeline,
  pipelineAsync,
  backPipelineAsync,
  pipelineCps,
  backPipelineCps,
} = require('../../src/fun/pipeline.js');


test('builds pipeline from sequence of sync functions', (t) => {
  const fs = [x => x + 1, x => x ** 2, x => x - 1];
  const [forwardFlow, backwardFlow] = [pipeline(...fs), backPipeline(...fs)];
  t.is(forwardFlow(5), 35);
  t.is(backwardFlow(5), 17);
});

test('builds pipeline from sequence of async functions', async (t) => {
  const fs = [async x => x + 1, async x => x ** 2, async x => x - 1];
  const [forwardFlow, backwardFlow] = [pipelineAsync(...fs), backPipelineAsync(...fs)];
  t.is(await forwardFlow(5), 35);
  t.is(await backwardFlow(5), 17);
});

test('builds pipeline from sequence of functions using CPS', (t) => {
  const fs = [
    (x, callback) => callback(null, x + 1),
    (x, callback) => callback(null, x ** 2),
    (x, callback) => callback(null, x - 1),
  ];
  const [forwardFlow, backwardFlow] = [pipelineCps(...fs), backPipelineCps(...fs)];
  t.is(forwardFlow(5, (err, payload) => t.is(payload, 35)));
  t.is(backwardFlow(5, (err, payload) => t.is(payload, 17)));
});

test.cb('builds pipeline from sequence of functions using async CPS', (t) => {
  const fs = [
    (x, callback) => setTimeout(() => callback(null, x + 1), 5),
    (x, callback) => setTimeout(() => callback(null, x ** 2), 3),
    (x, callback) => setTimeout(() => callback(null, x - 1), 10),
  ];
  const forwardFlow = pipelineCps(...fs);
  forwardFlow(5, (err, payload) => {
    t.is(payload, 35);
    t.end();
  });
});
