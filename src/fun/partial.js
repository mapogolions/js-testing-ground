'use strict';


module.exports = (f, ...args) => (...rest) => f(...[...args, ...rest]);
