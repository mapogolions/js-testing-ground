'use strict';

const List = require('./fp-list.js');
const {
  car,
  cdr,
  nil,
  isPair,
  empty,
  list,
} = require('./cons.js');


const array = (tree) => {
  const loop = (acc, tree) => {
    if (empty(tree)) return acc;
    if (!isPair(car(tree))) return loop([...acc, car(tree)], cdr(tree));
    return loop([...acc, array(car(tree))], cdr(tree));
  };
  return loop([], tree);
};

const str = (tree) => {
  const loop = (acc, tree) => {
    if (empty(tree)) return `${acc.trim()})`;
    if (!isPair(car(tree))) return loop(`${acc}${car(tree)} `, cdr(tree));
    return loop(`${acc}${str(car(tree))} `, cdr(tree));
  };
  return loop('(', tree);
};

const leaves = (tree) => {
  if (empty(tree)) return 0;
  if (!isPair(car(tree))) return 1 + leaves(cdr(tree));
  return leaves(car(tree)) + leaves(cdr(tree));
};

const reverse = (tree) => {
  const loop = (tree, acc) => {
    if (empty(tree)) return acc;
    if (isPair(car(tree))) {
      return loop(cdr(tree), List.append(list(reverse(car(tree))), acc));
    }
    return loop(cdr(tree), List.append(list(car(tree)), acc));
  };
  return loop(tree, nil);
};

// SICP - `fringe` and `enumerate`
const flatten = (tree) => {
  if (empty(tree)) return tree;
  if (!isPair(car(tree))) return List.append(list(car(tree)), flatten(cdr(tree)));
  return List.append(flatten(car(tree)), flatten(cdr(tree)));
};

const map = (f, tree) => List.map((subtree) => {
  if (isPair(subtree)) return map(f, subtree);
  return f(subtree);
}, tree);

const square = tree => map(x => x * x, tree);


module.exports = {
  square,
  map,
  array,
  str,
  leaves,
  reverse,
  flatten,
};
