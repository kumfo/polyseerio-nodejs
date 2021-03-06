'use strict';

const should              = require('should'),
      co                  = require('co'),
      { DEFAULT_TIMEOUT } = require('./config'),
      { setup,
        teardown,
        getUniqueName }   = require('./helper');

describe('Instances', function () {
  this.timeout(DEFAULT_TIMEOUT);

  let Client = null,
      Instance = null;

  before(() => {
    return setup().then(C => [Client, Instance] = [C, C.Instance]);
  });

  after(() => teardown(Client));

  it('can create an instance', () => {
    return co(function* () {
      yield Instance.create({ 
        name: getUniqueName()
      }).should.be.fulfilled();
    });
  });

  it('can find instances', () => {
    return co(function* () {
      yield Instance.find({}).should.be.fulfilled();
    });
  });

  it('can find instances by id', () => {
    return co(function* () {
      const resource = yield Instance.create({ 
        name: getUniqueName()
      }).should.be.fulfilled();

      yield Instance.findById(resource.id).should.be.fulfilled();
    });
  });

  it('can find instances by name', () => {
    return co(function* () {
      const name = getUniqueName();

      const resource = yield Instance.create({ 
        name
      }).should.be.fulfilled();

      yield Instance.findByName(name).should.be.fulfilled().
        then(found => {
          found.name.should.eql(name);
        });
    });
  });

  it('can attach to an instance by id', () => {
    return co(function* () {
      let instance = yield Instance.create({ 
        name: getUniqueName()
      }).should.be.fulfilled();

      instance = yield Instance.attach(instance.id, {
        strategy: 'id'
      }).should.be.fulfilled();
    });
  });

  it('can attach based on name fallback', () => {
    return co(function* () {
      const instance = yield Instance.attach(getUniqueName(), {
        strategy: 'fallback'
      }).should.be.fulfilled();
    });
  });

  it('can delete an instance by id', () => {
    return co(function* () {
      const resource = yield Instance.create({ 
        name: getUniqueName()
      }).should.be.fulfilled();

      yield Instance.remove(resource.id).should.be.fulfilled();
    });
  });

  it('can send gauge metrics', () => {
    return co(function* () {
      let resource = yield Instance.create({ 
        name: getUniqueName()
      }).should.be.fulfilled();

      const gauge = yield resource.gauge({
        foo: 22
      }).should.be.fulfilled();

      resource = yield Instance.findById(resource.id).should.be.fulfilled();

      resource.gauges.foo[0][0].should.eql(22);
    });
  });

  it('can set instance facts', () => {
    return co(function* () {
      let resource = yield Instance.create({ 
        name: getUniqueName()
      }).should.be.fulfilled();

      const fact = yield resource.fact({
        foo: 'bar'
      }).should.be.fulfilled();

      resource = yield Instance.findById(resource.id).should.be.fulfilled();

      resource.facts.foo.value.should.eql('bar');
    });
  });
});
