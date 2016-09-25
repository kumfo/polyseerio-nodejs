'use strict';

const Client                 = require('./client'),
      requestPromise         = require('request-promise'),
      Resource               = require('./resource'),
      { ACCESS_TOKEN_HEADER,
        DEFAULT_ENV,
        DEFAULT_API_BASE_URL,
        DEFAULT_API_VERSION }  = require('./constant'),
      { getBaseUrl }         = require('./url_builder'),
      { preRequest,
        postRequest,
        forwardCurry }       = require('./middleware'),
      { createResource }     = require('./resource/helper'),
      { createOptions,
        remapObjectPaths,
        wrapRequest }        = require('./helper');

/**
 * Resources that are required by the client API.
 */
const RequiredResources = [
  Resource.ALERT,
  Resource.CHANNEL,
  Resource.ENVIRONMENT,
  Resource.EVENT,
  Resource.EXPECTATION,
  Resource.INSTANCE,
  Resource.LOGIC_BLOCK,
  Resource.MEMBER,
  Resource.SETTING,
  Resource.TASK
];

/**
 * Client Resource path names.
 */
const ClientResourcePaths = {
  [Resource.ALERT]:       'Alert',
  [Resource.CHANNEL]:     'Channel',
  [Resource.ENVIRONMENT]: 'Environment',
  [Resource.EVENT]:       'Event',
  [Resource.EXPECTATION]: 'Expectation',
  [Resource.INSTANCE]:    'Instance',
  [Resource.LOGIC_BLOCK]: 'LogicBlock',
  [Resource.MEMBER]:      'Member',
  [Resource.SETTING]:     'Settings',
  [Resource.TASK]:        'Task'
};

/**
 * Default factory options.
 */
const DEFAULT_OPTIONS = {
  env:     DEFAULT_ENV,
  version: DEFAULT_API_VERSION,
  deduce:  true
};

/**
 * Constructrs a polyseer.io client.
 *
 * @param {string} an access-token
 * @param {object} construction options
 * @return {Promise}
 */
function factory (token, options) {
  options = createOptions(options, DEFAULT_OPTIONS);

  if (token === undefined) {
    throw new TypeError('Cannot create a polyseer.io client without an access-token.');
  }

  const baseUrl = getBaseUrl(DEFAULT_API_BASE_URL, undefined, options.version),
        headers = {
          [ACCESS_TOKEN_HEADER]: token
        };

  let request = requestPromise.defaults({
    headers,
    baseUrl,
    json: true
  });

  const pre = forwardCurry(preRequest, options),
        post = forwardCurry(postRequest, options);

  request = wrapRequest(request, pre, post);

  const Resources = RequiredResources.reduce((result, resource) => {
    result[resource] = createResource(resource, request, options, factory._callCount);

    return result;
  }, {});

  const resources = remapObjectPaths(Resources, ClientResourcePaths),
        clientOptions = { request, resources },
        client = new Client(clientOptions);

  factory._callCount++; // for memoize in resource factory calls

  return client;
}

// call count is used to memoize resource factory calls
factory._callCount = 0;
factory.ClientResourcePaths = ClientResourcePaths;
factory.RequiredResources = RequiredResources;

module.exports = factory;