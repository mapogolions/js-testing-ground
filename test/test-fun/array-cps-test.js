const test = require('ava');
const { map, filter } = require('../../src/fun/array-cps.js');


test.cb('map with empty array', (t) => {
  map(
    [],
    (x, callback) => process.nextTick(() => callback(null, x + 1)),
    (err, result) => {
      t.deepEqual(result, []);
      t.end();
    },
  );
});

test.cb('map with error', (t) => {
  const source = [1, 2, 3, 4];
  const failure = new Error('Map error');
  const expectedFailureAtomicity = [1, undefined, undefined, undefined];
  map(
    source,
    (x, callback) => {
      process.nextTick(() => {
        if (x === 2) {
          callback(failure);
          return;
        }
        callback(null, x);
      });
    },
    (err, failureAtomicity) => {
      t.is(err, failure);
      t.deepEqual(failureAtomicity, expectedFailureAtomicity);
      t.end();
    },
  );
});

test.cb('strings are mapped to numbers', (t) => {
  const source = ['.', '..', '...'];
  const expected = [1, 2, 3];
  map(
    source,
    (x, callback) => process.nextTick(() => callback(null, x.length)),
    (err, result) => {
      t.deepEqual(result, expected);
      t.end();
    },
  );
});

test.cb('different execution time', (t) => {
  const source = [1, 2, 3, 4];
  const expected = source.map(x => x + 1);
  const even = x => x % 2 === 0;
  map(
    source,
    (x, callback) => setTimeout(() => callback(null, x + 1), even(x) ? 12 : 0),
    (err, result) => {
      t.deepEqual(result, expected);
      t.end();
    },
  );
});

test.cb('filter with empty array', (t) => {
  filter(
    [],
    (x, callback) => process.nextTick(() => callback(null, x > 0)),
    (err, result) => {
      t.deepEqual(result, []);
      t.end();
    },
  );
});

test.cb('ignores odd numbers', (t) => {
  const even = x => x % 2 === 0;
  const failure = new Error('Fake error');
  filter(
    [1, 2, 3, 4],
    (x, callback) => {
      if (even(x)) {
        process.nextTick(() => callback(null, true));
      } else {
        process.nextTick(() => callback(failure));
      }
    },
    (err, result) => {
      t.deepEqual(result, [2, 4]);
      t.end();
    },
  );
});

test.cb('ignores even numbers', (t) => {
  const odd = x => x % 2 !== 0;
  filter(
    [1, 2, 3, 4, 5, 6],
    (x, callback) => process.nextTick(() => callback(null, odd(x))),
    (err, result) => {
      t.deepEqual(result, [1, 3, 5]);
      t.end();
    },
  );
});
