'use strict';

const test = require('ava');
const {
  map,
  filter,
  each,
  every,
  some,
  indexOfFirstCompleted,
  reduce,
} = require('../../src/fun/array-cps.js');

test.cb('`map` over an empty array should return an empty array', t => {
  map(
    [],
    (item, callback) => process.nextTick(() => callback(null, item + 1)),
    (err, result) => {
      t.is(err, null);
      t.deepEqual(result, []);
      t.end();
    },
  );
});

test.cb('error should break mapping', t => {
  const failure = new Error('Greater than zero');
  map(
    [-1, 0, 1, 2],
    (item, callback) => process.nextTick(() => item > 0 ? callback(failure) : callback(null, item)),
    (err, result) => {
      t.is(err, failure);
      t.is(result, undefined);
      t.end();
    },
  );
});

test.cb('`map` strings to numbers', t => {
  map(
    ['.', '..', '...'],
    (item, callback) => process.nextTick(() => callback(null, item.length)),
    (err, result) => {
      t.is(err, null);
      t.deepEqual(result, [1, 2, 3]);
      t.end();
    },
  );
});

test.cb('`map` should have parallel semantics', t => {
  const sideEffect = [];
  map(
    [1, 2, 3, 4],
    (item, callback) => {
      const delay = item % 2 === 0 ? 12 : 0;
      setTimeout(() => {
        sideEffect.push(item);
        callback(null, item);
      }, delay);
    },
    (_err, _result) => {
      t.deepEqual(sideEffect, [1, 3, 2, 4]);
      t.end();
    },
  );
});

test.cb('empty array filtering returns an empty array', t => {
  filter(
    [],
    (item, callback) => process.nextTick(() => callback(null, item > 0)),
    (err, result) => {
      t.deepEqual(result, []);
      t.is(err, null);
      t.end();
    },
  );
});

test.cb('`filter` should treat an error as false value', t => {
  const even = x => x % 2 === 0;
  const failure = new Error('This error should be ignored');
  filter(
    [1, 2, 3, 4],
    (item, callback) => process.nextTick(() => even(item) ? callback(null, true) : callback(failure)),
    (err, result) => {
      t.deepEqual(result, [2, 4]);
      t.is(err, null);
      t.end();
    },
  );
});

test.cb('`filter` should ignore even numbers', t => {
  const odd = x => x % 2 !== 0;
  filter(
    [1, 2, 3, 4, 5, 6],
    (item, callback) => process.nextTick(() => callback(null, odd(item))),
    (err, result) => {
      t.deepEqual(result, [1, 3, 5]);
      t.is(err, null);
      t.end();
    },
  );
});

test.cb('`filter` should have parallel semantics', t => {
  const sideEffect = [];
  filter(
    [1, 2, 3, 4],
    (item, callback) => {
      const delay = item % 2 === 0 ? 12 : 0;
      setTimeout(() => {
        sideEffect.push(item);
        callback(null, item > 0);
      }, delay);
    },
    (_err, _result) => {
      t.deepEqual(sideEffect, [1, 3, 2, 4]);
      t.end();
    },
  );
});

test.cb('iteration over an empty array', t => {
  const sideEffect = [];
  each(
    [],
    (item, callback) => process.nextTick(() => {
      sideEffect.push(item);
      callback(null);
    }),
    (err) => {
      t.is(err, null);
      t.deepEqual(sideEffect, []);
      t.end();
    },
  );
});

test.cb('error should break iteration', t => {
  const sideEffect = [];
  const failure = new Error('Negative number');
  each(
    [1, -2, 2, -3],
    (item, callback) => process.nextTick(() => {
      if (item < 0) {
        callback(failure);
        return;
      }
      sideEffect.push(item);
      callback(null);
    }),
    (err) => {
      t.is(err, failure);
      t.deepEqual(sideEffect, [1]);
      t.end();
    },
  );
});

test.cb('successful iteration over an array', t => {
  const sideEffect = [];
  each(
    [1, 2, 3],
    (item, callback) => process.nextTick(() => {
      sideEffect.push(item);
      callback(null);
    }),
    (err) => {
      t.is(err, null);
      t.deepEqual(sideEffect, [1, 2, 3]);
      t.end();
    },
  );
});

test.cb('`each` should have parallel semantics', t => {
  const sideEffect = [];
  each(
    [1, 2, 3, 4],
    (item, callback) => {
      const delay = 100 - (item * 10);
      setTimeout(() => {
        sideEffect.push(item);
        callback(null);
      }, delay);
    },
    (_err, _result) => {
      t.deepEqual(sideEffect, [4, 3, 2, 1]);
      t.end();
    },
  );
});

test.cb('empty array passes the test implemented by the provided function', t => {
  every(
    [],
    (_item, callback) => process.nextTick(callback),
    (err, result) => {
      t.is(err, null);
      t.true(result);
      t.end();
    },
  );
});

test.cb('`every` should treat an error as false', t => {
  const failure = new Error();
  every(
    [1, 2, -3, 5],
    (item, callback) => process.nextTick(() => callback(item < 0 ? failure : null)),
    (err, result) => {
      t.is(err, null);
      t.false(result);
      t.end();
    },
  );
});

test.cb('`every` should return false when an array contains at least one odd number', t => {
  const even = x => x % 2 === 0;
  every(
    [2, 1, 6],
    (item, callback) => process.nextTick(() => callback(null, even(item))),
    (err, result) => {
      t.false(result);
      t.is(err, null);
      t.end();
    },
  );
});

test.cb('`every` should return true when each number in array is even', t => {
  const even = x => x % 2 === 0;
  every(
    [2, 4, 6],
    (item, callback) => process.nextTick(() => {
      if (even(item)) {
        callback(null, true);
        return;
      }
      callback(null, false);
    }),
    (err, result) => {
      t.true(result);
      t.is(err, null);
      t.end();
    },
  );
});

test.cb.skip('`every`should have parallel semantics', t => {
  const sideEffect = [];
  every(
    [1, 2, 3, 4],
    (item, callback) => {
      const delay = 100 - (item * 10);
      setTimeout(() => {
        sideEffect.push(item);
        callback(null, item % 2 === 0);
      }, delay);
    },
    (_err, _result) => {
      t.deepEqual(sideEffect, [4, 3, 2, 1]);
      t.end();
    },
  );
});

test.cb('empty array does not pass the test implemented by the provided function', t => {
  some(
    [],
    (_item, callback) => process.nextTick(callback),
    (err, result) => {
      t.is(err, null);
      t.false(result);
      t.end();
    },
  );
});

test.cb('`some` should return at least one ', t => {
  some(
    [1, 2, -1, 0],
    (item, callback) => process.nextTick(() => {
      if (item < 0) {
        callback(null, true);
        return;
      }
      callback(null, false);
    }),
    (err, result) => {
      t.is(err, null);
      t.true(result);
      t.end();
    },
  );
});

test.cb('`some` should ignore errors', t => {
  some(
    [1, 2, -1, 0],
    (item, callback) => process.nextTick(() => {
      if (item < 0) {
        callback(null, true);
        return;
      }
      callback(new Error('Positive number'));
    }),
    (err, result) => {
      t.is(err, null);
      t.true(result);
      t.end();
    },
  );
});

test.cb('not found index of positive number', t => {
  indexOfFirstCompleted(
    [-2, -1],
    (item, callback) => process.nextTick(() => {
      if (item > 0) {
        callback(null, true);
        return;
      }
      callback(null, false);
    }),
    (err, result) => {
      t.is(err, null);
      t.is(result, -1);
      t.end();
    },
  );
});

test.cb('race index shoud return index of first completed result from set of non-blocking operations', (t) => {
  indexOfFirstCompleted(
    [2, -1, 3, -10],
    (item, callback) => process.nextTick(() => {
      if (item < 0) {
        callback(null, true);
        return;
      }
      callback(null, false);
    }),
    (err, result) => {
      t.is(err, null);
      t.is(result, 1);
      t.end();
    },
  );
});

test.cb('reduce of empty array with no initial value should throw TypeError', (t) => {
  reduce(
    [],
    (prev, curr, callback) => process.nextTick(() => {
      callback(null, prev + curr);
    }),
    (err, result) => {
      t.is(result, undefined);
      t.true(err instanceof TypeError);
      t.end();
    },
    /* no initial value */
  );
});

test.cb('`reduce` of empty array with initial value', t => {
  const initial = Symbol();
  reduce(
    [],
    (prev, curr, callback) => process.nextTick(() => {
      callback(null, prev + curr);
    }),
    (err, result) => {
      t.is(err, null);
      t.is(result, initial);
      t.end();
    },
    initial
  );
});

test.cb('`reduce` of array with no initial value', t => {
  reduce(
    [1, 2, 3, 4],
    (prev, curr, callback) => process.nextTick(() => {
      callback(null, prev + curr);
    }),
    (err, result) => {
      t.is(err, null);
      t.is(result, 10);
      t.end();
    },
    /* no initial value */
  );
});

test.cb('`reduce` of array with initial value', t => {
  reduce(
    [1, 2, 3, 4, 5],
    (previous, current, callback) => process.nextTick(() => {
      callback(null, previous + current);
    }),
    (err, result) => {
      t.is(err, null);
      t.is(result, 25);
      t.end();
    },
    10, /* initial value */
  );
});

test.cb('`reduce` with error', t => {
  const divisionByZeroError = new TypeError('Division by zero');
  reduce(
    [0, 1, 2, 4],
    (prev, curr, callback) => process.nextTick(() => {
      if (prev === 0) {
        callback(divisionByZeroError);
        return;
      }
      callback(null, curr / prev);
    }),
    (err, result) => {
      t.is(err, divisionByZeroError);
      t.is(result, undefined);
      t.end();
    },
    /* no initial value */
  );
});
