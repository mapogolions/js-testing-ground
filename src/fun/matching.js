'use strict';

const just = target => source => source.startsWith(target) && target;

const follows = (...patterns) => source => {
  let matchUpTo = 0;
  let rest = source;
  for (const pattern of patterns) {
    const matched = pattern(rest);
    if (matched === false) return false;
    matchUpTo += matched.length;
    rest = rest.slice(matched.length);
  }
  return source.slice(0, matchUpTo);
};

module.exports = { just, follows };
