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

const scale = (n, tree) => {
  if (empty(tree)) return tree;
  else if (!isPair(car(tree))) return cons(n * car(tree), scale(n, cdr(tree)));
  else return cons(scale(n, car(tree)), scale(n, cdr(tree)));
};

// Versions of `square`
const square3 = tree => {
  if (empty(tree)) return tree;
  else if (!isPair(car(tree))) return cons(car(tree) * car(tree), square3(cdr(tree)));
  else return cons(square3(car(tree)), square3(cdr(tree)));
};

const square2 = tree => List.map(subtree => {
  if (isPair(subtree)) return square2(subtree);
  else return subtree * subtree;
}, tree);

const square = tree => map(x => x * x, tree);

const map = (f, tree) => List.map(subtree => {
  if (isPair(subtree)) return map(f, subtree);
  else return f(subtree);
}, tree);

const flatMap = (f, tree) => {
  if (empty(tree)) return tree;
  else if (!isPair(car(tree))) 
    return List.append(f(car(tree)), flatMap(f, cdr(tree)));
  else return cons(flatMap(f, car(tree)), flatMap(f, cdr(tree)));
};

const flatMap2 = (f, tree) => List.flatMap(subtree => {
  if (!isPair(subtree)) return f(subtree);
  else return flatMap2(f, subtree);
}, tree);


exports.square = square;
exports.map = map;
exports.flatMap = flatMap;
exports.flatMap2 = flatMap2;
exports.array = array;
exports.str = str;
exports.leaves = leaves;
exports.reverse = reverse;
exports.flatten = flatten;