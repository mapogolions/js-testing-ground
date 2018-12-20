'use strict';

const { cons, car, cdr, nil, isPair, empty, list } = require('./cons.js');
const List = require('./fp-list.js');

const array = tree => {
  const loop = (acc, tree) => {
    if (empty(tree)) return acc;
    else if (!isPair(car(tree))) return loop([...acc, car(tree)], cdr(tree));
    else return loop([...acc, array(car(tree))], cdr(tree));
  };
  return loop([], tree);
};

const str = tree => {
  const loop = (acc, tree) => {
    if (empty(tree)) return `${acc.trim()})`;
    else if (!isPair(car(tree))) return loop(`${acc}${car(tree)} `, cdr(tree));
    else return loop(`${acc}${str(car(tree))} `, cdr(tree));
  };
  return loop('(', tree);
};

const leaves = tree => {
  if (empty(tree)) return 0;
  else if (!isPair(car(tree))) return 1 + leaves(cdr(tree));
  else return leaves(car(tree)) + leaves(cdr(tree));
};

/* const leaves = tree => {
  const loop = (count, tree) => {
    if (empty(tree)) return count;
    else if (isPair(car(tree))) return loop(count + loop(0, car(tree)), cdr(tree));
    else return loop(count + 1, cdr(tree));
  };
  return loop(0, tree);
}; */


const reverse = tree => {
  const loop = (tree, acc) => {
    if (empty(tree)) return acc;
    else if (isPair(car(tree))) 
      return loop(cdr(tree), List.append(list(reverse(car(tree))), acc));
    else 
      return loop(cdr(tree), List.append(list(car(tree)), acc));
  };
  return loop(tree, nil);
};

// SICP - `fringe`
const flatten = tree => {
  if (empty(tree)) return tree;
  else if (!isPair(car(tree))) return List.append(list(car(tree)), flatten(cdr(tree)));
  else return List.append(flatten(car(tree)), flatten(cdr(tree)));
};


exports.array = array;
exports.str = str;
exports.leaves = leaves;
exports.reverse = reverse;
exports.flatten = flatten;