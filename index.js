'use strict';

console.log('Functional programming in javascript');

const { list, car, cdr, array, str } = require('./src/abstract data/fp-tree.js');


console.log(array(list(list(1, 2), 3, 4)));
const res = str(list(list(1, 2), 3, list(4, list(list(5, 6), 7))));
console.log(res, res.length);