// /controllers/users/users.js

/*jslint node: true */
/*jshint esversion: 6 */

'use strict';

var http = require('http');
var jwt = require('jsonwebtoken');
var memberships = require('../memberships/index');
var errorHandler = require('../../errorhandler');

/**
 *  Require db Models.
 */
var Membership = require('../../models/membership');
var User = require('../../models/user');


/**
 * User Controllers.
 */

var users = {

  /**
   * Create user.
   * Creates a new user record.
   */ 

  create: function(user) {
    return new Promise(function(success, failure) {
      try {
        // save the user
        return user.save()
          .then(function resolved() {
            return success(user);
          })
          .catch(function rejected(err) {
            return failure(err);
          });
      } catch (err) {
          return failure(err);
        }
    });
  },

  /**
   * Finds and updates a user record.
   * Finds a user by id and updates selected fields.
   */ 

  findAndUpdate: function(id, update, fields) {
    function toObject(arr) {
      var o = {};
      for (var i = 0, l = arr.length; i < l; ++i)
        o[arr[i]] = 1;
      return o;
    }
    var selected = toObject(fields);
    return new Promise(function(success, failure) {
      try {
        process.nextTick(function () {
          User.findByIdAndUpdate(id, update, { new: true })
            .then(function resolved(user) {
              console.log(user);
              return success(user);
            })
            .catch(function rejected(err) {
              errorHandler(err);
              return failure(err);
            });
          });
      } catch (err) {
          errorHandler(err);
          return failure(err);
        }
    });
  },

  /**
   * Finds and returns one matching record.
   * Returns a records matching id query.
   */

  findOne: function(id) {
    return new Promise(function(success, failure) {
      try {
        process.nextTick(function () {
          User.findOne({ _id: id })
            .then(function resolved(user) {
              return success(user);
            })
            .catch(function rejected(err) {
              errorHandler(err);
              return failure(err);
            });
          });
      } catch (err) {
        errorHandler(err);
        return failure(err);
      }
    });
  },

  find: function() {},

  /**
   * Finds or create a user record.
   * If no record is found in db then create a new instance.
   */

  findOrCreate: function(profile) {
    return new Promise(function(success, failure) {
      process.nextTick(function () {
        try {
          User.findOne({'memberships.facebook.id': profile.id})
            .then(function resolve(user) {
              // see if email was fetched, otherwise set to 'null'.
              var email = 'null';
              if (profile.email) {
                email = profile.email;
              }
              if (!user) {
                let membership = new Membership({
                  'provider': 'facebook', // TEST: { 'twoot': 1 }
                  'profile': profile,
                });
                user = new User({ 
                  'name': profile.name,
                  'email': email,
                  'memberships.facebook.data': membership,
                  'memberships.facebook.id': profile.id,
                });
                // pre-validation before saving
                return user.validate()
                  .then(function resolve() {
                    return membership.validate()
                      .then(function resolve() {
                        // create new user record
                        return users.create(user)
                          .then(function resolve(user) {
                            // create new membership record
                            return memberships.create(membership)
                              .then(function resolve() {
                                // append jwt token to user.
                                user._token = jwt.sign(
                                                {id: user._id}, 
                                                process.env.JWT_SECRET, 
                                                {expiresIn: '7d'}
                                              );
                                return success(user);
                              });
                          });
                      });
                  });
              }
              // append jwt token to user.
              user._token = jwt.sign(
                              {id: user._id}, 
                              process.env.JWT_SECRET, 
                              {expiresIn: '7d'}
                            );
              return success(user);
            })
            .catch(function reject(err) {
              errorHandler(err);
              return failure(err);
            });
          } catch (err) {
              errorHandler(err);
              return failure(err);
          }
        });
});
    }

};

module.exports = users;
