'use strict';


function zip(...args) {
    const length = Math.min(...args.map(x => x.length));
    const zipped = [];
    for (let i = 0; i < length; i++) {
        const subsequence = [];
        for (let j = 0; j < args.length; j++) {
            subsequence[j] = args[j][i]
        }
        zipped[i] = subsequence;
    }
    return zipped;
}


class DataClass {
    constructor(...args) {
        const kvp = zip(new.target._fields, args);
        kvp.forEach(([key, val]) => this[key] = val);
    }
}


module.exports = DataClass;
