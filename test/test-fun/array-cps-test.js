const test = require('ava');
const {
  map,
  filter,
  each,
  every,
  some,
} = require('../../src/fun/array-cps.js');


test.cb('empty array mapping returns an empty array', (t) => {
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

test.cb('error occurrence stops mapping', (t) => {
  const source = [-1, 0, 1, 2];
  const failure = new Error('Greater than zero');
  map(
    source,
    (item, callback) => process.nextTick(() => {
      if (item > 0) {
        callback(failure);
        return;
      }
      callback(null, item);
    }),
    (err, result) => {
      t.is(err, failure);
      t.deepEqual(result, undefined);
      t.end();
    },
  );
});

test.cb('strings are mapped to numbers', (t) => {
  const source = ['.', '..', '...'];
  const expected = [1, 2, 3];
  map(
    source,
    (item, callback) => process.nextTick(() => callback(null, item.length)),
    (err, result) => {
      t.is(err, null);
      t.deepEqual(result, expected);
      t.end();
    },
  );
});

test.cb('different execution time of callacks', (t) => {
  const source = [1, 2, 3, 4];
  const expected = source.map(x => x + 1);
  const even = x => x % 2 === 0;
  map(
    source,
    (item, callback) => setTimeout(() => callback(null, item + 1), even(item) ? 12 : 0),
    (err, result) => {
      t.deepEqual(result, expected);
      t.is(err, null);
      t.end();
    },
  );
});

test.cb('empty array filtering returns an empty array', (t) => {
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

test.cb('ignores odd numbers', (t) => {
  const even = x => x % 2 === 0;
  filter(
    [1, 2, 3, 4],
    (item, callback) => process.nextTick(() => {
      if (even(item)) {
        callback(null, true);
        return;
      }
      callback(new Error('Odd number'));
    }),
    (err, result) => {
      t.deepEqual(result, [2, 4]);
      t.is(err, null);
      t.end();
    },
  );
});

test.cb('ignores even numbers', (t) => {
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

test.cb('iteration over an empty array', (t) => {
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

test.cb('error occurrence stops iteration', (t) => {
  const sideEffect = [];
  const failure = new Error('Negative number');
  each(
    [1, -2, 2, -3],
    (item, callback) => process.nextTick(() => {
      sideEffect.push(item);
      if (item < 0) {
        callback(failure);
        return;
      }
      callback(null);
    }),
    (err) => {
      t.is(err, failure);
      t.deepEqual(sideEffect, [1, -2]);
      t.end();
    },
  );
});

test.cb('successful iteration over an array', (t) => {
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

test.cb('empty array passes the test implemented by the provided function', (t) => {
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

test.cb('not each number in the array is even', (t) => {
  const even = x => x % 2 === 0;
  every(
    [2, 1, 6],
    (item, callback) => process.nextTick(() => {
      if (even(item)) {
        callback(null, true);
        return;
      }
      callback(null, false);
    }),
    (err, result) => {
      t.false(result);
      t.is(err, null);
      t.end();
    },
  );
});

test.cb('each number in the array is even', (t) => {
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

test.cb('empty array does not pass the test implemented by the provided function', (t) => {
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

test.cb('array has at least one negative number', (t) => {
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

test.cb('errors will be ignored', (t) => {
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
