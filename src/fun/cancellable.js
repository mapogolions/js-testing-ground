'use strict';


const cancellable = f => {
  const wrapper = (...args) => f ? f(...args) : null;
  wrapper.cancel = () => (f = null);
  return wrapper;
};


class CancellablePromise extends Promise {
  constructor(executor) {
    super((resolve, reject) => {
      executor(
        result => this.cancelled
          ? reject(new Error('Promise was cancelled')) : resolve(result),
        reject
      );
    });
    this._cancelled = false;
  }

  get cancelled() {
    return this._cancelled;
  }

  cancel() {
    this._cancelled = true;
  }
}


module.exports = { cancellable, CancellablePromise };
