'use strict';

const { cons, nil, list, empty, car, cdr, isPair } = require('./cons.js');
const List = require('./fp-list.js');

/** Set as unrodered list 
 * One way to represent a set is as a list of its elements in which no element appears more than once. 
 * The empty set is represented by the empty list.
 * */

// O(n)
const elementOfSet = (elem, set) => {
  if (empty(set)) return false;
  else if (car(set) === elem) return true;
  else return elementOfSet(elem, cdr(set));
};

// O(n)
const adjoin = (elem, set) => elementOfSet(elem, set) ? set : cons(elem, set);

// O(n^2)
const intersection = (set1, set2) => {
  if (empty(set1) || empty(set2)) return nil;
  else if (elementOfSet(car(set1), set2)) 
    return cons(car(set1), intersection(cdr(set1), set2));
  else return intersection(cdr(set1), set2);
};

// very slow
const union = (set1, set2) => {
  const inter = intersection(set1, set2);
  return List.append(
    set1, 
    List.filter(x => !elementOfSet(x, inter), set2)
  );
};

exports.elementOfSet = elementOfSet;
exports.adjoin = adjoin;
exports.intersection = intersection;
exports.union = union;
exports.str = List.str;