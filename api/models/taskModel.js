'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);


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
  User: { type: Schema.Types.ObjectId, ref: 'User' },
  UserId: { type: Schema.Types.Number }
});

TaskSchema.plugin(autoIncrement.plugin, { model: 'Task', field: 'Id', startAt: 1 });

TaskSchema.set('toJSON', { virtuals: true });

if (!TaskSchema.options.toJSON)
  TaskSchema.options.toJSON = {};

TaskSchema.options.toJSON.transform = function (doc, ret, options) {
  delete ret._id;
  delete ret.id;
  delete ret.__v;
  return ret;
}



module.exports = mongoose.model('Task', TaskSchema);
