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
  const iter = (firstIndex, lastIndex) => {
    if (firstIndex > lastIndex) return -1;
    if (firstIndex === lastIndex) return items[firstIndex] === item ? firstIndex : -1;
    const middle = Math.trunc((firstIndex + lastIndex) / 2);
    if (items[middle] === item) return middle;
    if (items[middle] > item) return iter(firstIndex, middle - 1);
    return iter(middle + 1, lastIndex);
  };
  return iter(0, items.length - 1);
}

module.exports = { binarySearch, binarySearchOpt };
