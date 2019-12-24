'use strict';

const requiredArgument = () => {
  throw new TypeError('Missing required positional argument');
};

const Pair = (first=requiredArgument(), second=requiredArgument()) => (index) => {
  if (index === 1) return first;
  if (index === 2) return second;
  throw new RangeError('Pair index out of range');
};

const Tuple = (...items) => (index) => {
  if (index < 0 || index >= items.length) {
    throw new RangeError('Tuple index out of range');
  }
  return items[index];
};


module.exports = { Pair, Tuple };
