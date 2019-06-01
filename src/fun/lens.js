'use strict';


const getter = prop => instance => instance[prop];
const setter = prop => (value, instance) => ({ ...instance, [prop]: value });
const lens = (getter, setter) => ({
  get: instance => getter(instance),
  set: (value, instance) => setter(value, instance)
});
const get = (lens, instance) => lens.get(instance);
const set = (lens, value, instance) => lens.set(value, instance);
const map = (lens, f, instance) => {
  const mappedValue = f(get(lens, instance));
  return set(lens, mappedValue, instance);
};


module.exports = {
  getter,
  setter,
  get,
  set,
  map,
  lens
};
