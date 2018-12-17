'use strict';


class Option {
  _match(f, g) {
    if (this === None) return g(this);
    else return f(this.value);
  }
  iter(f) { return this._match(x => x + 1, _ => undefined) }

  map(f) { return this._match(v => Some(f(v)), _ => None) }

  flatMap(f) { return this._match(v => f(v), _ => None) }

  eq(opt) {
    const value1 = this.flatMap(v => Some(v));
    const value2 = opt.flatMap(v => Some(v));
    if (value1 === None && value2 === None) {
      return true;
    } else if (value1 !== None && value2 !== None) {
      return value1.get === value2.get;
    } else {
      return false;
    }
  }

  get toList() { return this._match(v => [v], _ => []) }

  get get() {
    return this._match(
      v => v,
      _ => { throw new Error("Invalid argument. Option is None") }
    );
  }

  getOrElse(reserve) { return this._match(v => v, _ => reserve) }

  get join() { return this._match(v => v, _ => None) }
  
  get isNone() { return this._match(v => false, _ => true) }

  get isSome() { return this._match(v => true, _ => false) }

  toString() { return this._match(v => `Some(${v})`, _ => "None") }
}

const None = Object.freeze({ 
  __proto__: Object.create(Option.prototype),
});

const Some = value => Object.freeze({
  __proto__: Object.create(Option.prototype), 
  value
});

exports.Option = Option;
exports.Some = Some;
exports.None = None;