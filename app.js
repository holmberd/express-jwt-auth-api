/*jshint node: true */
/*jshint esversion: 6 */

'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var ejwt = require('express-jwt');
var jwt = require('jsonwebtoken');

var app = express();

// load .env config
require('dotenv').config();

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/login', express.static(path.join(__dirname, 'www', 'login')));

// middleware that validates JsonWebTokens and sets req.user.
app.use(ejwt({
  secret: process.env.JWT_SECRET,
}).unless({
    path: ['/', '/favicon.ico', '/login', '/api/auth/facebook']
  }));

// call app routes.
routes(app);

// catch 404 and forward to error handler.
app.use(function(req, res, next) {
  var err = new Error('not found');
  err.status = 404;
  next(err);
});

/* Error handlers */

// development error handler will print stacktrace.
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err);
    res.json({ 'error': { 'status': err.status, 'message': err.message, 'error': err } });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ 'error': { 'status': err.status, 'message': err.message } });
});


module.exports = app;
