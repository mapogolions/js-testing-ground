'use strict';


function echo(src) {
  console.log(src.toString());
}

const identity = x => x;

class Functor {
  map() {
    throw new Error("Class needs to be abstract, since `map` is not defined");
  }
}

class List extends Functor {
  static of(...args) {
    if (args.length === 0) return Nil;
    else return Cons(args[0], List.of(...args.slice(1)));
  }
  _match(f, g) {
    if (this === Nil) return g(this);
    else return f(this.head, this.tail);
  }
  map(f) { return this._match((h, t) => Cons(f(h), t.map(f)), identity) }
}

const Cons = (head, tail) => Object.freeze({
  __proto__: List.prototype,
  head,
  tail,
  toString() { return `Cons(${head} ${tail.toString()})` }
});

const Nil = Object.freeze({
  __proto__: List.prototype,
  toString() { return `Nil` }
});

class Option extends Functor {
  _match(f, g) {
    if (this === None) {
      return g(this);
    }
    return f(this.value);
  }
  map(f) { return this._match(_ => Some(f(_)), identity) }
  getOrElse(opt) { return this._match(identity, () => opt) }
}

const None = Object.freeze({ 
  __proto__: Option.prototype,
  toString() { return `None` }
});

const Some = value => Object.freeze({
  __proto__: Option.prototype, 
  value,
  toString() { return `Some(${this.value})` }
});


exports.Option = Option;
exports.Some = Some;
exports.None = None;
/* echo(List.of(1, 2, 3).map(_ => _ + 1));
echo(List.of(1, 2, 3, 4, 5, 6, 7).map(_ => _ % 2 === 0));

 */

/*  Error handing
function div(a, b) {
  if (b === 0) return None
  return Some(a / b);
}

const res1 = div(10, 2).getOrElse(-1);
const res2 = div(10, 0).getOrElse(-1);
 */
