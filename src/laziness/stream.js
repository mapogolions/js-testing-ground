'use strict';

/**
 * Immutable single linked list (canonical definition)
 * type list 'a = Nil | Cons 'a * list 'a
 *
 * type stream 'a = Cons 'a * stream 'a - stack overflow
 * type stream 'a = Cons 'a (unit -> stream 'a) - solution of stack overflow problem
 * let rec from n = Cons(n, fun () -> from n + 1)
 *
 * It is informative to observe the types of those functions:
 *
 * val hd : stream 'a -> 'a
 * val tl : stream 'a -> stream 'a
 * val take : int -> stream 'a -> list 'a
 * val drop : int -> stream 'a -> stream 'a
*/

class Stream {
  static of(n) {
    return Cons(n, () => Stream.of(n + 1));
  }

  static chars(ch) {
    const code = ch.charCodeAt(0);
    return Cons(ch, () => Stream.chars(String.fromCharCode(code + 1)));
  }

  // return list of the first [n] elements
  take(n) {
    if (n <= 0) return [];
    else return [this.head, ...this.tail.take(n - 1)];
  }
  // @tailrec optimization
  takerec(n) {
    const loop = (acc, ss, n) =>
      n <= 0 ? acc : loop([...acc, ss.head], ss.tail, n - 1);
    return loop([], this, n);
  }

  drop(n) {
    const loop = (ss, n) =>
      n <= 0 ? ss : loop(ss.tail, n - 1);
    return loop(this, n);
  }

  get square() { return Cons(this.head * this.head, () => this.tail.square) }
  sum(ss) {
    return Cons(this.head + ss.head, () => this.tail.sum(ss.tail));
  }

  map(f) {
    return Cons(f(this.head), () => this.tail.map(f));
  }

  filter(f) {
    return f(this.head)
      ? Cons(this.head, () => this.tail.filter(f))
      : this.tail.filter(f);
  }
};

const Cons = (head, tail) => Object.freeze({
  __proto__: Object.create(Stream.prototype),
  head,
  get tail() { return tail() }
});

exports.Stream = Stream;
exports.Cons = Cons;
