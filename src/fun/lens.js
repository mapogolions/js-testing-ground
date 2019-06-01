'use strict';


const defaultGetter = prop => instance => instance[prop];
const defaultSetter = prop => (value, instance) => ({ ...instance, [prop]: value });


module.exports = {
  defaultGetter,
  defaultSetter
};
