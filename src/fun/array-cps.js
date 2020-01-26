'use strict';

function map(items, cps, done) {
  if (!items.length) {
    done(null, []);
    return;
  }
  const slots = new Array(items.length);
  let hasFailed = false;
  let backloggedCount = items.length;
  const next = index => (err, data) => {
    if (hasFailed) return;
    if (err) {
      hasFailed = true;
      done(err);
      return;
    }
    slots[index] = data;
    if (--backloggedCount <= 0) done(null, slots);
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
  let backloggedCount = items.length;
  const next = index => (err, accepted) => {
    slots[index] = (err || !accepted) ? IGNORE : items[index];
    if (--backloggedCount <= 0) done(null, slots.filter(x => x !== IGNORE));
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
  let hasFailed = false;
  let backloggedCount = items.length;
  const next = (err) => {
    if (hasFailed) return;
    if (err) {
      hasFailed = true;
      done(err);
      return;
    }
    if (--backloggedCount <= 0) done(null);
  };
  for (const item of items) {
    cps(item, next);
  }
}

function raceIndex(items, cps, done) {
  if (!items.length) {
    done(null, -1);
    return;
  }
  let hasFound = false;
  let backloggedCount = items.length;
  const next = index => (_err, accepted) => {
    if (hasFound) return;
    if (accepted) {
      hasFound = true;
      done(null, index);
      return;
    }
    if (--backloggedCount <= 0) done(null, -1);
  };
  for (const [index, item] of items.entries()) {
    cps(item, next(index));
  }
}

function race(items, cps, done) {
  raceIndex(items, cps, (err, index) => err ? done(err) : done(null, items[index]));
}

function some(items, cps, done) {
  raceIndex(items, cps, (_err, index) => done(null, index !== -1));
}

function every(items, cps, done) {
  raceIndex(
    items,
    (item, callback) => cps(item, (err, accepted) => callback(err, !accepted)),
    (_err, index) => done(null, index === -1)
  );
}

function reduce(items, cps, done, seed) {
  if (!items.length && !seed) {
    done(new TypeError('Reduce of empty array with no initial value'));
    return;
  }
  if (!items.length) {
    done(null, seed);
    return;
  }
  let index = seed !== undefined ? 0 : 1;
  let previous = seed !== undefined ? seed : items[0];
  let current = items[index];
  const next = (err, acc) => {
    if (err) {
      done(err);
      return;
    }
    if (index >= items.length - 1) {
      done(null, acc);
      return;
    }
    previous = acc;
    current = items[++index];
    cps(previous, current, next, index, items);
  };
  cps(previous, current, next, index, items);
}


module.exports = {
  map,
  filter,
  each,
  every,
  some,
  raceIndex,
  race,
  reduce,
};
