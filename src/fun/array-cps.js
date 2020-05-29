'use strict';


const FALSE_OR_ERROR = Symbol('FALSE_OR_ERROR');

function collectOrMarkError(items, done) {
  const slots = new Array(items.length);
  let backloggedCount = items.length;
  return index => (err, accepted) => {
    slots[index] = (err || !accepted) ? FALSE_OR_ERROR : items[index];
    if (--backloggedCount <= 0) done(null, slots);
  };
}

function collectOrFall(items, done) {
  const slots = new Array(items.length);
  let backloggedCount = items.length;
  let hasFailed = false;
  return index => (err, data) => {
    if (hasFailed) return;
    if (err) {
      hasFailed = true;
      done(err);
      return;
    }
    slots[index] = data;
    if (--backloggedCount <= 0) done(null, slots);
  };
}

function parallel(next) {
  return function (items, cps, done) {
    if (!items.length) {
      done(null, []);
      return;
    }
    const fn = next(items, done);
    for (const [index, elem] of items.entries()) {
      cps(elem, fn(index));
    }
  };
}

function map(items, cps, done) {
  const flow = parallel(collectOrFall);
  flow(items, cps, done);
}

function filter(items, cps, done) {
  const complete = (_err, slots) => done(null, slots.filter(it => it !== FALSE_OR_ERROR));
  const flow = parallel(collectOrMarkError);
  flow(items, cps, complete);
}

function applyOrFall(items, done) {
  let hasFailed = false;
  let backloggedCount = items.length;
  return _index => err => {
    if (hasFailed) return;
    if (err) {
      hasFailed = true;
      done(err);
      return;
    }
    if (--backloggedCount <= 0) done(null);
  };
}

function each(items, cps, done) {
  const flow = parallel(applyOrFall);
  flow(items, cps, done);
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

function findIndexOps(items, cps, done) {
  const complete = (_err, slots) => {
    var index = slots.findIndex(it => it !== FALSE_OR_ERROR);
    done(null, index);
  }
  const flow = parallel(collectOrMarkError);
  flow(items, cps, complete);
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
  findOps,
  reduce,
};
