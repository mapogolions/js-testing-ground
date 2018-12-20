'use strict';


function pipe(obj) {
  const _ = f => {
    const value = f(obj);
    return { value, ...pipe(value) };
  };
  return { _ };
}

exports.pipe = pipe;
