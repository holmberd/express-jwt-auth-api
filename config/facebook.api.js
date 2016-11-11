// /config/facebook.api.js

/*jslint node: true */

'use strict';

var fb = {
  graphAPI: 'https://graph.facebook.com/v2.8/me',
  fields: 'id,name,email,picture', // ['id', 'name', 'email', 'picture']
  format: 'json'
};

module.exports = {
  
    'graph': {
        'uri': fb.graphAPI + '?fields=' + fb.fields + '&format=' + fb.format
    }
};