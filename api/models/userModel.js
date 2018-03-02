'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  Name: {
    type: String,
    required: 'Name required'
  },
  Tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
});




if (!UserSchema.options.toJSON)
  UserSchema.options.toJSON = {};

UserSchema.options.toJSON.transform = function (doc, ret, options) {
  ret.Id = ret._id;

  delete ret._id;
  delete ret.__v;
  return ret;
}



module.exports = mongoose.model('User', UserSchema);
