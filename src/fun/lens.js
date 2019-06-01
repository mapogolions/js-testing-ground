'use strict';


const getter = prop => instance => instance[prop];
const setter = prop => (value, instance) => ({ ...instance, [prop]: value });
const lens = (getter, setter) => ({
  get: instance => getter(instance),
  set: (value, instance) => setter(value, instance)
});


module.exports = {
  getter,
  setter,
  lens
};
