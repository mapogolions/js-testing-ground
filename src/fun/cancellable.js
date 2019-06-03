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
        res => {
          if (this.cancelled)
            reject(new Error('Promise was cancelled'));
          else
            resolve(res);

        },
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
