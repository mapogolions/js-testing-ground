'use strict';


const lens = source => ({
  get: instance => instance[source],
  set: (value, instance) => ({ ...instance, [source]: value }),
  delete: instance => {
    const { [source]: forgot, ...rest} = instance;
    return rest;
  }
});

const view = (lens, instance) => lens.get(instance);
const set = (lens, value, instance) => lens.set(value, instance);
const map= (lens, f, instance) => lens.set(f(lens.get(instance)), instance);
const remove = (lens, instance) => lens.delete(instance);


module.exports = {
  view,
  set,
  map,
  remove,
  lens
};
