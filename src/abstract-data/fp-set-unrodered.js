'use strict';

const List = require('./fp-list.js');
const {
  cons, nil, empty, car, cdr,
} = require('./cons.js');


// O(n)
const elementOfSet = (elem, set) => {
  if (empty(set)) return false;
  if (car(set) === elem) return true;
  return elementOfSet(elem, cdr(set));
};

// O(n)
const adjoin = (elem, set) => (elementOfSet(elem, set) ? set : cons(elem, set));

// O(n^2)
const intersection = (set1, set2) => {
  if (empty(set1) || empty(set2)) return nil;
  if (elementOfSet(car(set1), set2)) {
    return cons(car(set1), intersection(cdr(set1), set2));
  }
  return intersection(cdr(set1), set2);
};

// very slow
const union = (set1, set2) => {
  const inter = intersection(set1, set2);
  return List.append(
    set1,
    List.filter(x => !elementOfSet(x, inter), set2),
  );
};


module.exports = {
  elementOfSet,
  adjoin,
  intersection,
  union,
  str: List.str,
};
