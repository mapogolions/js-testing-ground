'use strict';


const lens = prop => ({
  get: instance => instance[prop],
  set: (value, instance) => ({ ...instance, [prop]: value }),
  delete: instance => {
    const { [prop]: forgot, ...rest} = instance;
    return rest;
  }
});

const view = (lens, instance) => lens.get(instance);
const set = (lens, value, instance) => lens.set(value, instance);
const over = (lens, f, instance) => lens.set(f(lens.get(instance)), instance);
const remove = (lens, instance) => lens.delete(instance);


module.exports = {
  view,
  set,
  over,
  remove,
  lens
};
