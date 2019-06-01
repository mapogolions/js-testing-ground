'use strict';


const defaultGetter = prop => instance => instance[prop];
const defaultSetter = prop => (value, instance) => ({ ...instance, [prop]: value });
const lens = (getter, setter) => ({
  get: instance => getter(instance),
  set: (value, instance) => setter(value, instance)
});


module.exports = {
  defaultGetter,
  defaultSetter,
  lens
};
