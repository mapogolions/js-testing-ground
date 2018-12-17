'use strict';


const cons = (fst, snd) => f => f(fst, snd);
const car = pair => pair((x, y) => x);
const cdr = pair => pair((x, y) => y);


exports.cons = cons;
exports.car = car;
exports.cdr = cdr;