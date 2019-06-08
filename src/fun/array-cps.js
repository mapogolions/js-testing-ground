/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
function map(items, cps, done) {
  if (!items.length) {
    done(null, []);
    return;
  }
  const slots = new Array(items.length);
  let [failed, pending] = [false, items.length];
  const next = index => (err, data) => {
    if (failed) return;
    if (err) {
      failed = true;
      done(err, slots);
      return;
    }
    slots[index] = data;
    if (--pending <= 0) done(null, slots);
  };
  for (const [index, elem] of items.entries()) {
    cps(elem, next(index));
  }
}

function filter(items, cps, done) {
  if (!items.length) {
    done(null, []);
    return;
  }
  const IGNORE = Symbol('Missed element');
  const slots = new Array(items.length);
  let pending = items.length;
  const next = index => (err, accepted) => {
    slots[index] = (err || !accepted) ? IGNORE : items[index];
    if (--pending <= 0) done(null, slots.filter(x => x !== IGNORE));
  };
  for (const [index, item] of items.entries()) {
    cps(item, next(index));
  }
}

function each(items, cps, done) {
  if (!items.length) {
    done(null);
    return;
  }
  let [failed, pending] = [false, items.length];
  const next = (err) => {
    if (failed) return;
    if (err) {
      failed = true;
      done(err);
      return;
    }
    if (--pending <= 0) done(null);
  };
  for (const item of items) {
    cps(item, next);
  }
}


module.exports = {
  map,
  filter,
  each,
};
