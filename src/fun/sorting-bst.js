'use strict';

/**
 * We use binary tree structure to define a little sorting algorithms.
 * A binary search tree has the property that all the values in the left branch are less than that
 * of the root, and all those of the right branch are greater.
 */

const Node = ({ value, left, right }) => Object.freeze({ value, left, right });
const Leaf = null;
const isLeaf = tree => Object.is(tree, null);

function insert(value, tree) {
  if (isLeaf(tree)) return Node({ value, left: Leaf, right: Leaf });
  if (value < tree.value) return Node({ ...tree, left: insert(value, tree.left) });
  return Node({ ...tree, right: insert(value, tree.right) });
}

// tree -> list
function arrayOfTree(tree) {
  if (isLeaf(tree)) return [];
  return [...arrayOfTree(tree.left), tree.value, ...arrayOfTree(tree.right)];
}

function treeOfArray(xs) {
  if (xs.length === 0) return Leaf;
  return insert(xs[0], treeOfArray(xs.slice(1)));
}


module.exports = {
  Node,
  Leaf,
  isLeaf,
  insert,
  arrayOfTree,
  treeOfArray,
};
