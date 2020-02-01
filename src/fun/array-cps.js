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

const FALSE_OR_ERROR = Symbol('FALSE OR ERROR');

function slotsWithResultsParallel(items, cps, done) {
  if (!items.length) {
    done(null, []);
    return;
  }
  const slots = new Array(items.length);
  let backloggedCount = items.length;
  const next = index => (err, accepted) => {
    slots[index] = (err || !accepted) ? FALSE_OR_ERROR : items[index];
    if (--backloggedCount <= 0) done(null, slots);
  };
  for (const [index, item] of items.entries()) {
    cps(item, next(index));
  }
}

function filter(items, cps, done) {
  slotsWithResultsParallel(
    items,
    cps,
    (_err, slots) => done(null, slots.filter(it => it !== FALSE_OR_ERROR)))
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

function raceFindIndex(items, cps, done) {
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

function raceFind(items, cps, done) {
  const complete = (_err, index) => index === -1 ? done(null) : done(null, items[index]);
  raceFindIndex(items, cps, complete);
}

function findIndexOps(items, cps, done) { // run parallel, but result as sequential
  const complete = (_err, items) => items.length > 0 ? 0 : -1;
  slotsWithResultsParallel(items, cps, complete);
}

function findOps(items, cps, done) {
  const complete = (_err, index) => index === -1 ? done(null) : done(null, items[index]);
  findIndexOps(items, cps, complete);
}

function findIndex(items, cps, done) {
  if (!items.length) {
    done(null, -1);
    return;
  }
  let index = 0;
  const next = (_err, accepted) => {
    if (accepted) {
      done(null, index);
      return;
    }
    if (++index >= items.length) {
      done(null, -1);
      return;
    }
    cps(items[index], next);
  };
  cps(items[index], next);
}

function find(items, cps, done) {
  const complete = (_err, index) => index === -1 ? done(null) : done(null, items[index]);
  findIndex(items, cps, complete);
}

function some(items, cps, done) {
  const complete = (_err, index) => done(null, index !== -1)
  raceFindIndex(items, cps, complete);
}

function every(items, cps, done) {
  raceFindIndex(
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
  raceFindIndex,
  raceFind,
  findIndex,
  find,
  findIndexOps,
  findIndex,
  reduce,
};
