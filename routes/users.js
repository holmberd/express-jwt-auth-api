// /routes/users.js

/*jshint node: true */
/*jshint esversion: 6 */

'use strict';

var express = require('express');
var http = require('http');
var router = express.Router();
var users = require('../controllers/users/index');
var statusCodes = require('../config/statuscodes');

/**
* POST /api/users
* Records user information into database as new user.
* 'Success': returns status resource created 'HTTP 201'.
* 'Failure': returns error message.
*/

router.post('/', (req, res) => {
  return res.sendStatus(201);

});

/**
 * GET /api/users/me
 * Return current user data in JSON.
 */

router.route('/me')
  .get(function(req, res, next) {
    try {
      const id = req.user.id; // NOTE: needs validation see express-validation.
      users.findOne(id) 
        .then(function success(user) {
          if (!user) { // no user was found.
            return res.status(400).json(http.STATUS_CODES['400']);
          }
          return res.status(200).json(user); // return JSON user.
        })
        .catch(function failure(err) {
          next(err);
        });
      } catch(err) {
        next(err);
      }

  });

/**
 * CRUD OPS /users/:id 
 */

router.route('/:id')
  .get(function(req, res) { /* get user record */ })
  .post(function(req, res) { /* update user record */})
  .delete(function(req, res) { /* remove user record */});

module.exports = router;