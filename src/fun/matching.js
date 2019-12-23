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

const cases = strategy => (...patterns) => source => {
  const matches = patterns.map(fn => fn(source)).filter(matched => matched);
  if (!matches.length) return false;
  return matches.sort(strategy)[0];
};

const greedyCases = cases((a, b) => a.length > b.length ? -1 : +1);

module.exports = { just, follows, cases, greedyCases };
