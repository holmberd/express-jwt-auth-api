// /models/users.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

/**
* User Model
* Creates a User schema.
*/

var UserSchema = new mongoose.Schema({
  type: { type: String, default: 'user' },
	name: String,
	email: { type: String, index: { unique: true } },
	memberships: {
		facebook: {
      id: String,
      data :{type: ObjectId, ref: 'Membership'}
    }
	},
  createdAt: {type: Date, default: Date.now},
  updatedAt: Date
});

// on every update, add the date.
UserSchema.pre('findOneAndUpdate', function(next) {
  // change the updatedAt field to current date
  this.updatedAt = new Date();
  next();
});

// append virtual 'href' attribute to model.
UserSchema.virtual('href')
  .get(function () {
    return process.env.API_URL + 'users' + '/' + this._id;
});

// what attributes to show in JSON response.
UserSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.id;
  delete obj.__v;
  delete obj._id;
  return obj;
};

UserSchema.set('toJSON', { getters: true, virtuals: true });
UserSchema.set('toObject', { getters: true, virtuals: true });

// Create a model based on the schema and export
module.exports = mongoose.model('User', UserSchema);