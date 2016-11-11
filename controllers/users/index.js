// controllers/user/index.js

/*jslint node: true */
/*jshint esversion: 6 */

'use strict';

var users = require('./users');

module.exports = {  
  create: users.create,
  find: users.find,
  findOne: users.findOne,
  findOrCreate: users.findOrCreate,
  findAndUpdate: users.findAndUpdate
};