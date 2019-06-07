const test = require('ava');
const { map } = require('../../src/fun/array-cps.js');


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

test.cb('time collapse', (t) => {
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
