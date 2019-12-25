'use strict';

// Based on OCaml standard library
class Option {
  match(f, g) {
    if (this === None) return g(this);
    return f(this.value);
  }

  map(f) {
    return this.match(v => Some(f(v)), () => None);
  }

  flatMap(f) {
    return this.match(v => f(v), () => None);
  }

  eq(opt) {
    const value1 = this.flatMap(v => Some(v));
    const value2 = opt.flatMap(v => Some(v));
    if (value1 === None && value2 === None) {
      return true;
    }
    if (value1 !== None && value2 !== None) {
      return value1.get === value2.get;
    }
    return false;
  }

  get toList() {
    return this.match(v => [v], _ => []);
  }

  get get() {
    return this.match(
      v => v,
      () => { throw new Error('Invalid argument. Option is None'); },
    );
  }

  getOrElse(placeholder) {
    return this.match(v => v, () => placeholder);
  }

  get join() {
    return this.match(v => v, () => None);
  }

  get isNone() {
    return this.match(() => false, () => true);
  }

  get isSome() {
    return this.match(() => true, () => false);
  }

  toString() {
    return this.match(v => `Some(${v})`, () => 'None');
  }
}

const None = Object.freeze({
  __proto__: Object.create(Option.prototype),
});

const Some = value => Object.freeze({
  __proto__: Object.create(Option.prototype),
  value,
});


module.exports = { Option, Some, None };
