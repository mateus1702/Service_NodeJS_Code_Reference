'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

var UserSchema = new Schema({
  Name: {
    type: String,
    required: 'Name required'
  },
  Tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
});

UserSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'Id', startAt: 1 });


if (!UserSchema.options.toJSON)
  UserSchema.options.toJSON = {};

UserSchema.options.toJSON.transform = function (doc, ret, options) {

  delete ret._id;
  delete ret.__v;
  return ret;
}



module.exports = mongoose.model('User', UserSchema);
