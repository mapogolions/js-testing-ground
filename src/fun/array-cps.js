/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
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

function every(items, cps, done) {
  if (!items.length) {
    done(null, true);
    return;
  }
  let hasNotAtLeastOneSatisfied = false;
  let backloggedCount = items.length;
  const next = (err, accepted) => {
    if (hasNotAtLeastOneSatisfied) return;
    if (err || !accepted) {
      hasNotAtLeastOneSatisfied = true;
      done(err, false);
      return;
    }
    if (--backloggedCount <= 0) done(null, true);
  };
  for (const item of items) {
    cps(item, next);
  }
}

function findIndex(items, cps, done) {
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

function find(items, cps, done) {
  findIndex(items, cps, (_err, index) => {
    if (index === -1) {
      done(null, undefined);
      return;
    }
    done(null, items[index]);
  });
}

function some(items, cps, done) {
  findIndex(items, cps, (_err, index) => {
    if (index === -1) {
      done(null, false);
      return;
    }
    done(null, true);
  });
}


module.exports = {
  map,
  filter,
  each,
  every,
  some,
  findIndex,
  find,
};
