'use strict';

function pathNavigateAboveRoot(path, sep = '/') {
    const chunks = path.split(sep).filter(it => it !== '.' && it !== '');
    let depth = 0;
    for (const chunk of chunks) {
        if (chunk === '..' && (--depth < 0)) {
            return true;
        }
        depth++;
    }
    return false;
}

module.exports = {
    pathNavigateAboveRoot
};
