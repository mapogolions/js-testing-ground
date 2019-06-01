'use strict';


const test = require('ava');
const { getter, setter, lens } = require('../../src/fun/lens.js');


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
  t.is(arrayLikeLens.get(new Array(2)), 2);
  t.is(arrayLikeLens.get({ length: 10 }), 10);
  t.is(arrayLikeLens.get([]), 0);
});

test('set a property value through lens', t => {
  const iterableLens = lens(getter(Symbol.iterator), setter(Symbol.iterator));
  const mock = {};
  const another = iterableLens.set(function* () { yield 101 }, mock);
  for (const elem of another) {
    t.is(elem, 101);
  }
});
