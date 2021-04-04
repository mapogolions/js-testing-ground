'use strict';

const List = require('./fp-list.js');
const {
  cons, nil, list, empty, car, cdr,
} = require('./cons.js');


// O(n / 2) - complexity
const elementOfSet = (x, set) => {
  if (empty(set)) return false;
  if (car(set) === x) return true;
  if (x < car(set)) return false;
  return elementOfSet(x, cdr(set));
};

// O(n)
const intersection = (set1, set2) => {
  if (empty(set1) || empty(set2)) return nil;
  if (car(set1) === car(set2)) {
    return cons(car(set1), intersection(cdr(set1), cdr(set2)));
  }
  if (car(set1) < car(set2)) return intersection(cdr(set1), set2);
  return intersection(set1, cdr(set2));
};

const adjoin = (x, set) => {
  if (empty(set)) return cons(x, nil);
  if (x === car(set)) return set;
  if (x < car(set)) return cons(x, set);
  return cons(car(set), adjoin(x, cdr(set)));
};

const union = (set1, set2) => {
  function loop(set1, set2, acc) {
    if (empty(set1)) return List.append(acc, set2);
    if (empty(set2)) return List.append(acc, set1);
    if (car(set1) < car(set2)) {
      return loop(cdr(set1), set2, List.append(acc, list(car(set1))));
    }
    if (car(set1) > car(set2)) {
      return loop(set1, cdr(set2), List.append(acc, list(car(set2))));
    }
    return loop(cdr(set1), cdr(set2), List.append(acc, list(car(set1))));
  }
  return loop(set1, set2, nil);
};


module.exports = {
  elementOfSet,
  intersection,
  adjoin,
  union,
  str: List.str,
};
