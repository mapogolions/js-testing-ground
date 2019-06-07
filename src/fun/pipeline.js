const { compose, composeAsync, composeCps } = require('./compose.js');


const pipeline = (...fs) => fs.reduce((seed, f) => compose(f, seed), x => x);
const backPipeline = (...fs) => fs.reduce((seed, f) => compose(seed, f), x => x);

const pipelineAsync = (...fs) => fs.reduce((seed, f) => composeAsync(f, seed), async x => x);
const backPipelineAsync = (...fs) => fs.reduce((seed, f) => composeAsync(seed, f), async x => x);

const pipelineCps = (...fs) => fs.reduce(
  (seed, f) => composeCps(f, seed),
  (x, callback) => callback(null, x),
);

const backPipelineCps = (...fs) => fs.reduce(
  (seed, f) => composeCps(seed, f),
  (x, callback) => callback(null, x),
);


module.exports = {
  pipeline,
  pipelineCps,
  pipelineAsync,
  backPipeline,
  backPipelineCps,
  backPipelineAsync,
};
