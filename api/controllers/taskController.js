'use strict';


var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Task = mongoose.model('Task');

exports.list = function(req, res) {
  Task.find({ UserId: req.params.userId }, function(err, task) {
    if (err)
      res.status(500).send(err);
    res.json(task);
  });
};

exports.create = function(req, res) {
  User.findOne({ Id: req.body.UserId }, function(err, user) {
    var new_task = new Task({
      Name: req.body.Name,
      Done: req.body.Done,
      Date: req.body.Date,
      UserId: req.body.UserId,
      User: user._id
    });
    new_task.save(function(err, task) {
      if (err)
        res.status(500).send(err);
      res.send(new_task.Id.toString());
    });
  });
};

exports.read = function(req, res) {
  Task.findOne({ Id: req.params.taskId }).
  populate('User').
  exec(function (err, task) {
    if (err)
      res.status(500).send(err);
    res.json(task);
  });
};

exports.update = function(req, res) {
  var fieldsToUpdate = {
    Name: req.body.Name,
    Done: req.body.Done,
    Date: req.body.Date,
  };
  Task.findOneAndUpdate({ Id: req.params.taskId }, fieldsToUpdate, {new: true}, function(err, task) {
    if (err)
      res.status(500).send(err);
    res.send('');
  });
};

exports.delete = function(req, res) {
  Task.findOne({ Id: req.params.taskId }, function(err, task) {
    if (err)
      res.status(500).send(err);
      if (!task)
        res.json(null);
      else {
        Task.remove({
          Id: req.params.taskId
        }, function(err, user) {
          if (err)
            res.status(500).send(err);
          res.send('');
        });
      }
  });
};
