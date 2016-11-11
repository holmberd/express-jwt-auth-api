var mongoose = require('mongoose');
var User = require('./user');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

/**
* Membership Model
* Create a Membership schema.
*/

var membershipSchema = new Schema({
	provider: String,
	profile: {},
	tokens: { accessToken: String, refreshToken: String },
	dateCreated: { type: Date, default: Date.now }
});

// Create a model based on the schema and export
module.exports = mongoose.model('Membership', membershipSchema);