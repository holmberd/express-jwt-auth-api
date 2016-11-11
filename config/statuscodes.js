/*jshint node: true */
/*jshint esversion: 6 */

'use strict';

var statusCodes =  {
  400: { 'error': { 'status': 400, 'message': 'invalid id' } },
  500: { 'error': { 'status': 500, 'message': 'internal server error' } }
};

module.exports = statusCodes;