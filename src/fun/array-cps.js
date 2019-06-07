/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
function map(source, cps, done) {
  if (!source.length) {
    done(null, []);
    return;
  }
  const slots = new Array(source.length);
  let [failed, unfulfilled] = [false, source.length];
  const next = index => (err, data) => {
    if (failed) return;
    if (err) {
      failed = true;
      done(err, slots);
      return;
    }
    slots[index] = data;
    if (--unfulfilled <= 0) done(null, slots);
  };
  for (const [index, elem] of source.entries()) {
    cps(elem, next(index));
  }
}

function filter(source, cps, done) {
  if (!source.length) {
    done(null, []);
    return;
  }
  const IGNORE = Symbol('Missed element');
  const slots = new Array(source.length);
  let unfulfilled = source.length;
  const next = index => (err, accepted) => {
    slots[index] = (err || !accepted) ? IGNORE : source[index];
    if (--unfulfilled <= 0) done(null, slots.filter(x => x !== IGNORE));
  };
  for (const [index, elem] of source.entries()) {
    cps(elem, next(index));
  }
}

function each(source, cps, done) {
  if (!source.length) {
    done(null);
    return;
  }
  let [failed, unfulfilled] = [false, source.length];
  const next = (err) => {
    if (failed) return;
    if (err) {
      failed = true;
      done(err);
      return;
    }
    if (--unfulfilled <= 0) done(null);
  };
  for (const elem of source) {
    cps(elem, next);
  }
}


module.exports = {
  map,
  filter,
  each,
};
