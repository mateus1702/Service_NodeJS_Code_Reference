'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
  Name: {
    type: String,
    required: 'Name required'
  },
  Date: {
    type: Date,
    required: 'Date required'
  },
  Done: {
    type: Boolean,
    required: 'Done required'
  },
  User: { type: Schema.Types.ObjectId, ref: 'User' }
});




if (!TaskSchema.options.toJSON)
  TaskSchema.options.toJSON = {};

TaskSchema.options.toJSON.transform = function (doc, ret, options) {
  ret.Id = ret._id;

  delete ret._id;
  delete ret.__v;
  return ret;
}



module.exports = mongoose.model('Task', TaskSchema);
