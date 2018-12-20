'use strict';


function curry(f) {
  const arity = f.length;
  return function f1(...args) {
    if (args.length >= arity) {
      return f(...args);
    }
    return function f2(...args2) {
      return f1(...[...args, ...args2]);
    }
  };
}


exports.curry = curry;