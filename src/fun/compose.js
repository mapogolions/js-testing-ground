
const compose = (g, f) => x => g(f(x));
const asyncCompose = (g, f) => async x => g(await f(x));
const cpsCompose = (g, f) => (x, callback) => {
  f(x, (err, data) => {
    if (err) {
      callback(err);
      return;
    }
    g(data, callback);
  });
};

module.exports = { compose, asyncCompose, cpsCompose };
