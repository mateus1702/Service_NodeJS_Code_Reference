'use strict';


var mongoose = require('mongoose'),
  Task = mongoose.model('Task'),
  User = mongoose.model('User');

exports.list = function(req, res) {
  User.find({}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.create = function(req, res) {
  var new_user = new User(req.body);
  new_user.save(function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.read = function(req, res) {
  User.findById(req.params.userId, function(err, user) {
    if (err)
      res.send(err);

      Task.find({ User: user._id }).
      exec(function (err, tasks) {
        if (err)
          res.send(err);
          user.Tasks = tasks;
          res.json(user);
      });
  });
};

exports.update = function(req, res) {
  User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.delete = function(req, res) {
  User.remove({
    _id: req.params.userId
  }, function(err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'User successfully deleted' });
  });
};
