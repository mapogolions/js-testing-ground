const { compose, composeAsync } = require('./compose.js');


const pipeline = (...fs) => fs.reduce((seed, f) => compose(f, seed), x => x);
const backPipeline = (...fs) => fs.reduce((seed, f) => compose(seed, f), x => x);

const pipelineAsync = (...fs) => fs.reduce((seed, f) => composeAsync(f, seed), async x => x);
const backPipelineAsync = (...fs) => fs.reduce((seed, f) => composeAsync(seed, f), async x => x);


module.exports = {
  pipeline,
  backPipeline,
  pipelineAsync,
  backPipelineAsync,
};
