'use strict';

const { cons, nil, list, empty, car, cdr, isPair } = require('./cons.js');
const List = require('./fp-list.js');


// O(n / 2) - complexity
const elementOfSet = (x, set) => {
  if (empty(set)) return false;
  else if (car(set) === x) return true;
  else if (x < car(set)) return false;
  else return elementOfSet(x, cdr(set));
};

// O(n)
const intersection = (set1, set2) => {
  if (empty(set1) || empty(set2)) 
    return nil;
  else if (car(set1) === car(set2)) 
    return cons(car(set1), intersection(cdr(set1), cdr(set2)));
  else if (car(set1) < car(set2))
    return intersection(cdr(set1), set2);
  else
    return intersection(set1, cdr(set2));
};

const adjoin = (x, set) => {
  if (empty(set)) return cons(x, nil);
  else if (x === car(set)) return set;
  else if (x < car(set)) return cons(x, set);
  else return cons(car(set), adjoin(x, cdr(set)));
};

const union = (set1, set2) => {
  function loop(set1, set2, acc) {
    if (empty(set1)) return List.append(acc, set2);
    else if (empty(set2)) return List.append(acc, set1);
    else if (car(set1) < car(set2)) 
      return loop(cdr(set1), set2, List.append(acc, list(car(set1))));
    else if (car(set1) > car(set2))
      return loop(set1, cdr(set2), List.append(acc, list(car(set2))));
    else
      return loop(cdr(set1), cdr(set2), List.append(acc, list(car(set1))));
  }
  return loop(set1, set2, nil);
};

exports.elementOfSet = elementOfSet;
exports.intersection = intersection;
exports.adjoin = adjoin;
exports.union = union;
exports.str = List.str;