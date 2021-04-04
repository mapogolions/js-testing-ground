'use strict';

const test = require('ava');
const DataClass = require('../../src/abstract-data/dataclass');


class RemoteAddress extends DataClass {
    static _fields = ['host', 'port'];
}

test('should create dataclass', (t) => {
    const localAddress = new RemoteAddress('localhost', 8080);
    t.is(localAddress.host, 'localhost');
    t.is(localAddress.port, 8080);
});
