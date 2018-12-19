'use strict';

console.log('Functional programming in javascript');

const { list, car, cdr, array, str } = require('./src/abstract data/cons.js');
const Tree = require('./src/abstract data/fp-tree.js');
const List = require('./src/abstract data/fp-list.js');

/* console.log(array(list(list(1, 2), 3, 4)));
const res = str(list(list(1, 2), 3, list(4, list(list(5, 6), 7))));
console.log(res, res.length); */



/* const source = list(list(1, 2), 3, 4)
console.log( Tree.leaves(source) );
console.log( List.length(source) ); */

console.log( Tree.str(Tree.reverse(list(list(1, 2), list(3, 4)))) );