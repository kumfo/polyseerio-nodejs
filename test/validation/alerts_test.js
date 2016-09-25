'use strict';

const should              = require('should'),
      co                  = require('co'),
      { DEFAULT_TIMEOUT } = require('./config'),
      { getSDK,
        getUniqueName }   = require('./helper');

describe('Alert', function () {
  this.timeout(DEFAULT_TIMEOUT);

  const Alert = getSDK('Alert');

  it('can create an alert', () => {
    return co(function* () {
      const resource = yield Alert.create({ 
        name: getUniqueName(),
        protocol: 'smtp',
        recipients: ['foo@bar.com']
      }).should.be.fulfilled();

      yield Alert.remove(resource.id);
    });
  });

  it('can find alerts', () => {
    return co(function* () {
      yield Alert.find({}).should.be.fulfilled();
    });
  });

  it('can find alerts by id', () => {
    return co(function* () {
      const resource = yield Alert.create({ 
        name: getUniqueName(),
        protocol: 'smtp',
        recipients: ['foo@bar.com']
      }).should.be.fulfilled();

      yield Alert.findById(resource.id).should.be.fulfilled();

      yield Alert.remove(resource.id);
    });
  });

  it('can trigger an alert by id', () => {
    return co(function* () {
      const resource = yield Alert.create({ 
        name: getUniqueName(),
        protocol: 'smtp',
        recipients: ['foo@bar.com']
      }).should.be.fulfilled();

      yield Alert.trigger(resource.id).should.be.fulfilled();

      yield Alert.remove(resource.id);
    });
  });

  it('can delete an alert by id', () => {
    return co(function* () {
      const resource = yield Alert.create({ 
        name: getUniqueName(),
        protocol: 'smtp',
        recipients: ['foo@bar.com']
      }).should.be.fulfilled();

      yield Alert.remove(resource.id).should.be.fulfilled();
    });
  });
});