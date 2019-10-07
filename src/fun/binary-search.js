'use strict';

function binarySearch(item, items, offset = 0) {
  if (items.length === 0) 
    return -1;
  if (items.length === 1) 
    return items[0] === item ? offset : -1;
  const middle = Math.trunc(items.length / 2);
  if (items[middle] === item) 
    return middle + offset;
  if (items[middle] > item)
    return binarySearch(item, items.slice(0, middle), offset);
  return binarySearch(item, items.slice(middle), offset + middle);
}

module.exports = { binarySearch };
