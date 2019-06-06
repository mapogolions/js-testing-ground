const { compose, asyncCompose } = require('./compose.js');


function foldLeft(f, seed, source) {
  function iter(acc, index) {
    if (index >= source.length) return acc;
    return iter(f(acc, source[index]), index + 1);
  }
  return iter(seed, 0);
}

const pipeline = (...fs) => foldLeft((seed, f) => compose(f, seed), x => x, fs);
const backPipeline = (...fs) => foldLeft((seed, f) => compose(seed, f), x => x, fs);

const asyncPipeline = (...fs) => foldLeft(
  (seed, f) => asyncCompose(f, seed),
  async x => x,
  fs,
);
const backAsyncPipeline = (...fs) => foldLeft(
  (seed, f) => asyncCompose(seed, f),
  async x => x,
  fs,
);


module.exports = {
  pipeline,
  backPipeline,
  asyncPipeline,
  backAsyncPipeline,
};
