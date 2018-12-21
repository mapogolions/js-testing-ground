'use strict';

const { cons, nil } = require("../abstract data/cons.js");
const List = require('../abstract data/fp-list.js');

function pascalTriangle(n) {
  if (n === 1) return cons(1, nil);
  else return List.zip(
    (x, y) => x + y,
    shiftl(pascalTriangle(n - 1)), 
    shiftr(pascalTriangle(n - 1)), 
  );
}

function shiftl(xs) {
  return List.append(xs, cons(0, nil));
}

function shiftr(xs) {
  return cons(0, xs);
}

exports.pascalTriangle = pascalTriangle;