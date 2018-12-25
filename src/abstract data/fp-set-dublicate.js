'use strict';

const { cons, nil, list, empty, car, cdr, isPair } = require('./cons.js');
const List = require('./fp-list.js');

// O(n)
const elementOfSet = (elem, set) => {
  if (empty(set)) return false;
  else if (car(set) === elem) return true;
  else return elementOfSet(elem, cdr(set));
};

// O(1)
const adjoin = (elem, set) => cons(elem, set);

// O(n)
const union = (set1, set2) => List.append(set1, set2);

// O(n^2)
const intersection = (set1, set2) => {
  if (empty(set1) || empty(set2)) return nil;
  else if (elementOfSet(car(set1), set2)) 
    return cons(car(set1), intersection(cdr(set1), set2));
  else return intersection(cdr(set1), set2);
};
