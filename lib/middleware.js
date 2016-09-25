'use strict';

const lodash            = require('lodash'),
      { formatPayload } = require('./helper'),
      { parseResponse } = require('./resource/helper');

/**
 * Used to curry client options along to middleware.
 *
 * @param {function}
 * @param {object}
 * @return {function}
 */
function forwardCurry () {
  const params = Array.prototype.slice.call(arguments),
        func = params.shift();

  return function () {
    return func(...arguments, ...params);
  };
}

/**
 * Called before a request is made.
 *
 * @param {object}
 * @param {object}
 * @return {object}
 */
function preRequest (options, clientOptions = {}) {
  if ('body' in options) {
    options.body = formatPayload(options.body);
  }

  return options;
}

/**
 * Called after a request is made.
 *
 * @param {object}
 * @param {object}
 * @return {Mixed}
 */
function postRequest (response, clientOptions = {}) {
  return parseResponse(response);
}

module.exports = {
  forwardCurry,
  preRequest,
  postRequest
};