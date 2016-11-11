// /routes/index.js

/*jshint node: true */
/*jshint esversion: 6 */

'use strict';

module.exports = function(app) {

  var apiRoutes = require('./api');

  /* GET home page. */
  app.get('/', function(req, res, next) {
    res.json({
      items: {
        title: "Welcome"
      }
    });
  });

  /* Call API routes middleware */
  app.use('/api', apiRoutes);

  return app;
};
