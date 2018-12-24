'use strict';

const List = require('./fp-list.js');
const Tree = require('./fp-tree.js');
const { pipe } = require('../fun/pipe.js');
const { curry } = require('../fun/curry.js');

const dotProduct = (scalar, matrix) => 
  pipe(matrix)
    ._(curry (List.sum))
    ._(curry (List.map) (x => x * scalar))
    .value;

const matrixMulVector = (vector, matrix) => {
 
};

exports.dotProduct = dotProduct;
exports.matrixMulVector = matrixMulVector;