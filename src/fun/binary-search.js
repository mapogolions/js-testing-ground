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

function binarySearchOpt(item, items) {
  const iter = (first, last) => {
    if (first > last) return -1;
    const middle = Math.trunc((first + last) / 2);
    if (item === items[middle]) return middle;
    if (item < items[middle]) return iter(first, middle - 1);
    return iter(middle + 1, last);
  };
  return iter(0, items.length - 1);
}

module.exports = { binarySearch, binarySearchOpt };
