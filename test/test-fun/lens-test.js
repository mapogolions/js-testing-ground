'use strict';


const test = require('ava');
const { getter,
        setter,
        lens,
        get,
        set,
        map } = require('../../src/fun/lens.js');


test('returns value of object property', t => {
  const instance = { name: 'Bob' };
  t.is(getter('name')(instance), 'Bob');
  t.is(getter('age')(instance), undefined);
});

test('overwrite existing property of object', t => {
  const origin = { name: 'Bob' };
  const another = setter('name')('Sam', origin);
  t.true(origin !== another);
  t.is(origin.name, 'Bob');
  t.is(another.name, 'Sam');
});

test('get a property value through lens', t => {
  const arrayLikeLens = lens(getter('length'), setter('length'));
  t.is(get(arrayLikeLens, new Array(2)), 2);
  t.is(get(arrayLikeLens, { length: 10 }), 10);
  t.is(get(arrayLikeLens, []), 0);
});

test('set a property value through lens', t => {
  const iterableLens = lens(getter(Symbol.iterator), setter(Symbol.iterator));
  const mock = {};
  const another = set(iterableLens, function* () { yield 101 }, mock);
  for (const elem of another) {
    t.is(elem, 101);
  }
});

test('map property value to', t => {
  const httpStatusLens = lens(getter('status'), setter('status'));
  const ok = { status: 200 };
  const not_found = map(httpStatusLens, status => 404, ok);
  t.is(not_found.status, 404);
});
