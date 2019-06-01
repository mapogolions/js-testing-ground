'use strict';


const defaultGetter = prop => obj => obj[prop];
const defaultSetter = prop => (value, obj) => ({ ...obj, [prop]: value });

module.exports = {
  defaultGetter,
  defaultSetter
};
