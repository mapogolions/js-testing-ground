'use strict';


const test = require('ava');
const { defaultGetter } = require('../../src/fun/lens.js');


test('returns value of object property', t => {
  const instance = { name: 'Bob' };
  t.is(defaultGetter('name')(instance), 'Bob');
  t.is(defaultGetter('age')(instance), undefined);
});
