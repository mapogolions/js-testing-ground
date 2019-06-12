const test = require('ava');
const {
  map,
  filter,
  each,
  every,
  some,
} = require('../../src/fun/array-cps.js');


test.cb('map with empty array', (t) => {
  map(
    [],
    (item, callback) => process.nextTick(() => callback(null, item + 1)),
    (err, result) => {
      t.deepEqual(result, []);
      t.end();
    },
  );
});

test.cb('map with error', (t) => {
  const source = [1, 2, 3, 4];
  const failure = new Error('Map error');
  map(
    source,
    (item, callback) => {
      process.nextTick(() => {
        if (item === 2) {
          callback(failure);
          return;
        }
        callback(null, item);
      });
    },
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
    (item, callback) => setTimeout(() => callback(null, item + 1), even(item) ? 12 : 0),
    (err, result) => {
      t.deepEqual(result, expected);
      t.is(err, null);
      t.end();
    },
  );
});

test.cb('filter with empty array', (t) => {
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
  const failure = new Error('Fake error');
  filter(
    [1, 2, 3, 4],
    (item, callback) => {
      if (even(item)) {
        process.nextTick(() => callback(null, true));
      } else {
        process.nextTick(() => callback(failure));
      }
    },
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

test.cb('each with empty', (t) => {
  each(
    [],
    (_item, callback) => process.nextTick(callback),
    (err) => {
      t.is(err, null);
      t.end();
    },
  );
});

test.cb('each with error', (t) => {
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

test.cb('push each item', (t) => {
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

test.cb('every with empty array', (t) => {
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

test.cb('not each number is even', (t) => {
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

test.cb('each number is even', (t) => {
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

test.cb('some with empty', (t) => {
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
