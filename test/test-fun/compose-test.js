const test = require('ava');
const { compose, composeAsync, composeCps } = require('../../src/fun/compose.js');


test('traditional functional composition', (t) => {
  const incrementThenSquare = compose(x => x ** 2, x => x + 1);
  const isEvenAfterIncrement = compose(x => x % 2 === 0, x => x + 1);
  t.is(incrementThenSquare(1), 4);
  t.is(incrementThenSquare(8), 81);
  t.true(isEvenAfterIncrement(1));
  t.false(isEvenAfterIncrement(2));
});

test('composition of asynchronous functions', async (t) => {
  const incrementThenSquare = composeAsync(async x => x ** 2, async x => x + 1);
  const isEvenAfterIncrement = composeAsync(async x => x % 2 === 0, x => x + 1);
  t.is(await incrementThenSquare(1), 4);
  t.is(await incrementThenSquare(8), 81);
  t.true(await isEvenAfterIncrement(1));
  t.false(await isEvenAfterIncrement(2));
});

test('composition of functions using continuation passing style', (t) => {
  const incrementThenSquare = composeCps(
    (x, callback) => callback(null, x ** 2),
    (x, callback) => callback(null, x + 1),
  );
  const isEvenAfterIncrement = composeCps(
    (x, callback) => callback(null, x % 2 === 0),
    (x, callback) => callback(null, x + 1),
  );
  incrementThenSquare(1, (err, payload) => t.is(payload, 4));
  incrementThenSquare(8, (err, payload) => t.is(payload, 81));
  isEvenAfterIncrement(1, (err, payload) => t.true(payload));
  isEvenAfterIncrement(2, (err, payload) => t.false(payload));
});

test('error breaks execution of synchronous flow', (t) => {
  const divisionThenDecrement = composeCps(
    (x, callback) => callback(null, x - 1),
    ({ num, denom }, callback) => (denom === 0
      ? callback(new Error('Division by zero')) : callback(null, num / denom)),
  );
  divisionThenDecrement({ num: 10, denom: 5 }, (err, payload) => t.is(payload, 1));
  divisionThenDecrement({ num: 10, denom: 0 }, (err, payload) => {
    t.is(err.message, 'Division by zero');
    t.is(payload, undefined);
  });
});

test.cb('composition of functions using asynchronous continuation passing style', (t) => {
  const readThenSplitByNewLine = composeCps(
    (content, callback) => setTimeout(() => callback(null, content.split('\n')), 10),
    (fileName, callback) => setTimeout(() => callback(null, 'foo\nbar\n'), 15),
  );
  readThenSplitByNewLine('fake.md', (err, lines) => {
    t.deepEqual(lines, ['foo', 'bar', '']);
    t.end();
  });
});

test.cb('error breaks execution of asynchronous flow', (t) => {
  const divisionThenDecrement = composeCps(
    (x, callback) => setTimeout(() => callback(null, x - 1), 10),
    ({ num, denom }, callback) => setTimeout(() => (denom === 0
      ? callback(new Error('Division by zero')) : callback(null, num / denom)), 5),
  );
  divisionThenDecrement({ num: 10, denom: 0 }, (err, payload) => {
    t.is(err.message, 'Division by zero');
    t.is(payload, undefined);
    t.end();
  });
});
