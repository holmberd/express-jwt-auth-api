// /controllers/memberships/memberhips.js

/*jslint node: true */
/*jshint esversion: 6 */

'use strict';

/* Require db model */
var Membership = require('../../models/membership');
var errorHandler = require('../../errorhandler');

/**
 * Membership Controllers.
 */

var memberships = {

 /**
  * Create membership.
  * Creates a new membership record.
  */ 

  create: function(membership) {
    return new Promise(function(success, failure) {
      try {
        // save the membership
        return membership.save()
          .then(function resolved() {
            return success(membership);
          })
          .catch(function rejected(err) {
            errorHandler(err);
            return failure(err);
          });
      } catch (err) {
          errorHandler(err);
          return failure(err);
        }
    });
  }
};

module.exports = memberships;
