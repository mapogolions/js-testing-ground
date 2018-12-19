'use strict';

function bugReport(e) {
  return Promise.reject()
    .catch(e => { throw e });
}

function enqueue(f) {
  return Promise.resolve()
    .then(_ => f())
    .catch(e => bugReport(e));
}

function subscriber(rule) {
  const subscribe = observer => subscription(observer, rule);

  function map(f) {
    return subscriber(observer => subscribe({
      next(value) { 
        try { return observer.next(f(value)) }
        catch (e) { return observer.error(e) }
      },
      error(e) { return observer.error(e) },
      done() { return observer.done() }
    }));
  }

  function filter(f) {
    return subscriber(observer => subscribe({
      next(value) { 
        try { if(f(value)) return observer.next(value) }
        catch (e) { return observer.error(e) }
      },
      error(e) { return observer.error(e) },
      done() { return observer.done() }
    }));
  }

  return { subscribe, map, filter };
}

function subscription(observer, rule) {
  const obs = embelished(observer);
  return rule(obs);
}

function onNotify(aux, observer, type, value) {
  if (aux.state === 'close') return aux;
  return notify({ ...aux, state: 'running' }, observer, type, value);
}

function helper(entity) {
  return typeof entity === 'object' ? { state: entity.state } : { state: 'ready' };
}

function notify(aux, observer, type, value) {
  try {
    switch (type) {
      case 'next':
        const res = observer.next(value);
        return { ...aux, ...helper(res) };
      case 'error':
        observer.error(value);
        return { ...aux, state: 'close' };
      case 'done':
        observer.done();
        return { ...aux, state: 'close' };
    }
  } catch (e) {
    bugReport(e);
  }
}

function embelished(observer) {
  const next = value => {
    debugger;
    const aux = onNotify({ queue: [], state: 'running' }, observer, 'next', value);
    const closed = aux.state === 'close' ? true : false;
    const res = { ...embelished(observer), ...aux , closed };
    debugger;
    return res;
  };
  const error = e => {
    const aux = onNotify({ queue: [], state: 'running' }, observer, 'error', e);
    const closed = aux.state === 'close' ? true : false;
    const res = { ...embelished(observer), ...aux, closed };
    return res;
  };
  const done = () => {
    const aux = onNotify({ queue: [], state: 'running' }, observer, 'done');
    const closed = aux.state === 'close' ? true : false;
    return { ...embelished(observer), ...aux, closed };
  };

  return { next, error, done, closed: false };
}

function observableOf(...items) {
  return subscriber(observer => enqueue(() => {
    function iter(observer, n) {
      if (n >= items.length || observer.closed) observer.done();
      else iter(observer.next(items[n]), n + 1);
    }
    iter(observer, 0);
  }));
}

function observableFrom(source) {
  if (Array.isArray(source)) {
    return observableOf(...source);
  }
}

exports.observableOf = observableOf;
exports.observableFrom  = observableFrom;