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
  const httpLens = lens(getter('status'), setter('status'));
  t.is(httpLens.get({ status: 200 }), 200);
  t.is(httpLens.get({ message: 'Ok' }), undefined);
});

test('set a property value through lens', t => {
  const httpLens = lens(getter('status'), setter('status'));
  const response = { status: 200 };
  const another = httpLens.set(404, response);
  t.true(response !== another);
  t.is(response.status, 200);
  t.is(another.status, 404);
});
