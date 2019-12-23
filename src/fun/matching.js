'use strict';

const just = target => source => source.startsWith(target) && target;


module.exports = { just };
