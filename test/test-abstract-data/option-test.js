const test = require('ava');

const { None, Some } = require('../../src/abstract data/option.js');


test('Test eq', (t) => {
  t.true(None.eq(None));
  t.false(None.eq(Some(10)));
  t.true(Some(1).eq(Some(1)));
  t.false(Some(1).eq(Some(10)));
  t.false(Some(None).eq(None));
  t.false(Some(Some(None)).eq(Some(Some(None)))); // bug or maybe feature
});

test('Test map', (t) => {
  t.deepEqual(Some(10).map(it => it > 0), Some(true));
  t.deepEqual(None.map(it => it > 0), None);
  t.deepEqual(Some(Some(-1)).map(it => it.map(x => x + 1)), Some(Some(0)));
});

test('Test getOrElse', (t) => {
  t.is(Some('origin').getOrElse('default'), 'origin');
  t.deepEqual(Some({ name: 'Balto' }).getOrElse({}), { name: 'Balto' });
  t.deepEqual(None.getOrElse({}), { });
});

test('Test to list', (t) => {
  t.deepEqual(None.toList, []);
  t.deepEqual(Some('...').toList, ['...']);
  t.deepEqual(Some(Some(true)).toList, [Some(true)]);
});

test('Test join', (t) => {
  t.is(None.join, None);
  t.is(Some('a').join, 'a');
  t.deepEqual(Some(Some('...')).join, Some('...'));
});

test('Test isSome', (t) => {
  t.true(Some(10).isSome);
  t.false(None.isSome);
});
test('Test isNone', (t) => {
  t.false(Some(10).isNone);
  t.true(None.isNone);
});

test('Test ctors', (t) => {
  t.is(None, None);
  t.is(None.toString(), 'None');
  t.is(Some(10).toString(), 'Some(10)');
});
