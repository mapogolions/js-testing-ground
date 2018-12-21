'use strict';

const { cons, nil } = require("../abstract data/cons.js");
const List = require('../abstract data/fp-list.js');


// n ^ 2 - complexity
function fastPascalTriangle(n) {
  if (n === 1) return cons(1, nil);
  else {
    const memo = fastPascalTriangle(n - 1);
    return List.zip((x,y) => x + y, shiftl(memo), shiftr(memo))
  };
}

// 2 ^ n - complexity
function pascalTriangle(n) {
  if (n === 1) return cons(1, nil);
  else return List.zip(
    (x, y) => x + y,
    shiftl(pascalTriangle(n - 1)), 
    shiftr(pascalTriangle(n - 1)), 
  );
}

const shiftl = xs => List.append(xs, cons(0, nil));
const shiftr = xs => cons(0, xs);


exports.pascalTriangle = pascalTriangle;
exports.fastPascalTriangle = fastPascalTriangle;