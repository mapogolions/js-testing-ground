'use strict';

const { cons } = require("../abstract data/cons.js");
const List = require('../abstract data/fp-list.js');

function pascal(n) {
  if (n === 1) return [1];
  else return _;
}

function shiftl(xs) {
  return List.append(xs, list(0));
}

function shiftr(xs) {
  return cons(0, xs);
}