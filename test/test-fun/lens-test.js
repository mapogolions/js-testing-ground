'use strict';


const test = require('ava');
const { defaultGetter, defaultSetter } = require('../../src/fun/lens.js');


test('returns value of object property', t => {
  const instance = { name: 'Bob' };
  t.is(defaultGetter('name')(instance), 'Bob');
  t.is(defaultGetter('age')(instance), undefined);
});

test('overwrite existing property of object', t => {
  const origin = { name: 'Bob' };
  const another = defaultSetter('name')('Sam', origin);
  t.true(origin !== another);
  t.is(origin.name, 'Bob');
  t.is(another.name, 'Sam');
});
