'use strict';

const cancellable = (f) => {
  let cancelled = false;
  const wrapper = (...args) => (cancelled ? null : f(...args));
  wrapper.cancel = function cancel() { cancelled = true; };
  return wrapper;
};


class CancellablePromise extends Promise {
  constructor(executor) {
    super((resolve, reject) => {
      executor(
        result => (this.cancelled
          ? reject(new Error('Promise was cancelled')) : resolve(result)),
        reject,
      );
    });
    this.cancelled = false;
  }

  cancel() {
    this.cancelled = true;
  }
}


module.exports = { cancellable, CancellablePromise };
