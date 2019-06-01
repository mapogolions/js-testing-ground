'use strict';


const cancellable = f => {
  const wrapper = (...args) => f ? f(...args) : null;
  wrapper.cancel = () => (f = null);
  return wrapper;
};


module.exports = { cancellable };
