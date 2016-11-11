// /routes/api.js

/*jshint node: true */
/*jshint esversion: 6 */

'use strict';

var express = require('express');
var router = express.Router();

var auth = require('./auth');
var users = require('./users');

/* ROUTES. */
router.use('/auth', auth);
router.use('/users', users);

module.exports = router;
