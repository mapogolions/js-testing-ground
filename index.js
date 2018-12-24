'use strict';

console.log('Functional programming in javascript');

const Matrix = require('./src/abstract data/matrix.js');
const List = require('./src/abstract data/fp-list.js');
const Tree = require('./src/abstract data/fp-tree.js');
const { list } = require('./src/abstract data/cons.js');

const res = Tree.str(
  Matrix.matrixMulVector(
    list(3, 4, 3), 
    list(list(0, 3, 5), list(5, 5, 2))
  )
);

console.log(res);