'use strict';

const List = require('../abstract-data/fp-list.js');
const { cons, nil } = require('../abstract-data/cons.js');


const shiftl = xs => List.append(xs, cons(0, nil));
const shiftr = xs => cons(0, xs);

// O(n^2) - complexity
function fastPascalTriangle(n) {
  if (n <= 1) return cons(1, nil);
  const memo = fastPascalTriangle(n - 1);
  return List.zip((x, y) => x + y, shiftl(memo), shiftr(memo));
}

// O(2^n) - complexity
function pascalTriangle(n) {
  if (n <= 1) return cons(1, nil);
  return List.zip(
    (x, y) => x + y,
    shiftl(pascalTriangle(n - 1)),
    shiftr(pascalTriangle(n - 1)),
  );
}

function pascalList(n) {
  function loop(row, n) {
    if (n < 1) return nil;
    return cons(
      List.array(row),
      () => loop(
        List.zip((x, y) => x + y, shiftl(row), shiftr(row)),
        n - 1,
      ),
    );
  }
  return loop(cons(1, nil), n);
}


module.exports = {
  pascalList,
  pascalTriangle,
  fastPascalTriangle,
};
