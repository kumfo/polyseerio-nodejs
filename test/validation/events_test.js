'use strict';

const should              = require('should'),
      co                  = require('co'),
      { DEFAULT_TIMEOUT } = require('./config'),
      { getSDK }          = require('./helper');

describe('Events', function () {
  this.timeout(DEFAULT_TIMEOUT);

  const Event = getSDK('Event');

  it('can create an event', () => {
    return co(function* () {
      yield Event.create({ name: 'zoo' }).should.be.fulfilled();
    });
  });

  it('can find events', () => {
    return co(function* () {
      yield Event.find({}).should.be.fulfilled();
    });
  });

  it('can find an event by id', () => {
    return co(function* () {
      const resource = yield Event.create({ name: 'zoo' });

      yield Event.findById(resource.id).should.be.fulfilled();
    });
  });
});