// /routes/auth.js

/*jshint node: true */
/*jshint esversion: 6 */

'use strict';

var express = require('express');
var ejwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var request = require('request-promise-native');
var configFacebook = require('../config/facebook.api');
var users = require('../controllers/users/index');
var statusCodes = require('../config/statuscodes');
var router = express.Router();

/** 
 * POST /api/auth/facebook
 * Authenticates user with facebook.
 * Recives a valid facbook access_token.
 * 'Success': If no user match found in db then 
 * create a new user record, else return user_id JWT token.
 * 'Failure': Return JSON error message.
 */
router.post('/facebook', function(req, res, next) {
  try {
    const fbAccessToken = req.body.accesstoken; // NOTE: this needs validation.

    var reqOptions = {
      uri: configFacebook.graph.uri,
      qs: {
          access_token: fbAccessToken
      },
      json: true
    };
    request(reqOptions)
      .then(function (profile) {
        users.findOrCreate(profile)
          .then(function(user) {
            res.json({'token': user._token});
          });
      })
      .catch(function (err) {
        res.json({'error': err.message});
      });
    } catch (err) {
      next(err);
    }

});

/**
 * GET /api/auth/token 
 * Refresh token expiration time field.
 * Receives a valid, not expired JWT and returns 
 * the same signed JWT with a updated expiration field.
 */
router.get('/token', function(req, res, next) {
  try {
    const token = jwt.sign({id: req.user.id}, 
                  process.env.JWT_SECRET, {expiresIn: '7d'});
    res.json({ 'token': token }); // response token.
  } catch(err) {
      next(err);
  }

});

module.exports = router;