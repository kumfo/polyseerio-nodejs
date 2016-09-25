'use strict';

const should = require('should'),
      { getClient } = require('./helper');

describe('Client API is being defined correctly', () => {

  describe('Alert', () => {
    it('has the correct API', () => {
      const { Alert } = getClient();
  
      (Alert !== undefined).should.eql(true);
  
      Alert.should.have.property('create');
      Alert.should.have.property('find');
      Alert.should.have.property('findById');
      Alert.should.have.property('findByName');
      Alert.should.have.property('remove');
      Alert.should.have.property('trigger');
      Alert.should.have.property('update');

      (function () {
        new Alert();
      }).should.not.throw();

      const instance = new Alert();

      instance.should.have.property('save');
      instance.should.have.property('trigger');
      instance.should.have.property('remove');
    });
  });

  describe('Channel', () => {
    it('has the correct API', () => {
      const { Channel } = getClient();

      (Channel !== undefined).should.eql(true);
  
      Channel.should.have.property('create');
      Channel.should.have.property('find');
      Channel.should.have.property('findById');
      Channel.should.have.property('findByName');
      Channel.should.have.property('remove');
      Channel.should.have.property('update');
      Channel.should.have.property('message');

      (function () {
        new Channel();
      }).should.not.throw();

      const instance = new Channel();

      instance.should.have.property('save');
      instance.should.have.property('message');
      instance.should.have.property('remove');
    });
  });

  describe('Environment', () => {
    it('has the correct API', () => {
      const { Environment } = getClient();

      (Environment !== undefined).should.eql(true);

      Environment.should.have.property('create');
      Environment.should.have.property('find');
      Environment.should.have.property('findById');
      Environment.should.have.property('findByName');
      Environment.should.have.property('remove');
      Environment.should.have.property('message');
      Environment.should.have.property('update');

      (function () {
        new Environment();
      }).should.not.throw();

      const instance = new Environment();

      instance.should.have.property('save');
      instance.should.have.property('message');
      instance.should.have.property('remove');
    });
  });

  describe('Event', () => {
    it('has the correct API', () => {
      const { Event } = getClient();

      (Event !== undefined).should.eql(true);

      Event.should.have.property('create');
      Event.should.have.property('find');
      Event.should.have.property('findById');

      (function () {
        new Event();
      }).should.not.throw();

      const instance = new Event();

      instance.should.have.property('save');
    });
  });

  describe('Expectation', () => {
    it('has the correct API', () => {
      const { Expectation } = getClient();

      (Expectation !== undefined).should.eql(true);
  
      Expectation.should.have.property('create');
      Expectation.should.have.property('find');
      Expectation.should.have.property('findById');
      Expectation.should.have.property('findByName');
      Expectation.should.have.property('remove');
      Expectation.should.have.property('update');
      Expectation.should.have.property('check');

      (function () {
        new Expectation();
      }).should.not.throw();

      const instance = new Expectation();

      instance.should.have.property('save');
      instance.should.have.property('remove');
      instance.should.have.property('check');
    });
  });

  describe('Instance', () => {
    it('has the correct API', () => {
      const { Instance } = getClient();

      (Instance !== undefined).should.eql(true);

      Instance.should.have.property('attach');
      Instance.should.have.property('create');
      Instance.should.have.property('find');
      Instance.should.have.property('findById');
      Instance.should.have.property('findByName');
      Instance.should.have.property('remove');
      Instance.should.have.property('update');

      (function () {
        new Instance();
      }).should.not.throw();

      const instance = new Instance();

      instance.should.have.property('save');
      instance.should.have.property('remove');
      instance.should.have.property('attach');
    });
  });

  describe('LogicBlock', () => {
    it('has the correct API', () => {
      const { LogicBlock } = getClient();

      (LogicBlock !== undefined).should.eql(true);

      LogicBlock.should.have.property('create');
      LogicBlock.should.have.property('execute');
      LogicBlock.should.have.property('find');
      LogicBlock.should.have.property('findById');
      LogicBlock.should.have.property('findByName');
      LogicBlock.should.have.property('remove');
      LogicBlock.should.have.property('update');

      (function () {
        new LogicBlock();
      }).should.not.throw();

      const instance = new LogicBlock();

      instance.should.have.property('save');
      instance.should.have.property('remove');
      instance.should.have.property('execute');
    });
  });

  describe('Member', () => {
    it('has the correct API', () => {
      const { Member } = getClient();

      (Member !== undefined).should.eql(true);

      Member.should.have.property('create');
      Member.should.have.property('find');
      Member.should.have.property('findById');
      Member.should.have.property('remove');
      Member.should.have.property('update');

      (function () {
        new Member();
      }).should.not.throw();

      const instance = new Member();

      instance.should.have.property('save');
      instance.should.have.property('remove');
    });
  });

  describe('Settings', () => {
    it('has the correct API', () => {
      const { Settings } = getClient();

      (Settings !== undefined).should.eql(true);

      Settings.should.have.property('retrieve');
      Settings.should.have.property('update');

      // Settings is a singleton
      (function () {
        new Settings();
      }).should.throw();
    });
  });

  describe('Task', () => {
    it('has the correct API', () => {
      const { Task } = getClient();

      (Task !== undefined).should.eql(true);

      Task.should.have.property('create');
      Task.should.have.property('find');
      Task.should.have.property('findById');
      Task.should.have.property('remove');
      Task.should.have.property('update');

      (function () {
        new Task();
      }).should.not.throw();

      const instance = new Task();

      instance.should.have.property('save');
      instance.should.have.property('remove');
    });
  });
});