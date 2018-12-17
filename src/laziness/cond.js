'use strict';

/**
 * `if...else`
 * - 
 * - It's just statement. Don't return value. Only branching
 * - `if...else` statement is lazy. It will not evaluate all of its components.
 * - `if...else` is strict in its conditional parameter. (for to determine which brach to take)
 * - `if...else` is non-strict in the two branches.
 * 
 * Implement `cond expression` (see clojure). Basic requirements:
 * - lazy (non-strictness)
 * - expression (non statment): returns value
 * - is sequence of neted if branches
 * Template:
 * (cond
 *   (> x 10) :left
 *   (< x 10) :right
 *   :else    :down)
 * :else - is any truth value!
 */

 

