'use strict';


var mongoose = require('mongoose'),
  Task = mongoose.model('Task'),
  User = mongoose.model('User');

exports.list = function(req, res) {
  User.find({}, function(err, user) {
    if (err)
      res.status(500).send(err);
    res.json(user);
  });
};

exports.create = function(req, res) {
  var new_user = new User();
  new_user.Name = req.body.Name;
  new_user.save(function(err, user) {
    if (err)
      res.status(500).send(err);
    res.json(user.Id);
  });
};

exports.read = function(req, res) {
  User.findOne({ Id: req.params.userId }, function(err, user) {
    if (err)
      res.status(500).send(err);
      if (!user)
        res.json(null);
      else {
        Task.find({ User: user._id }).
        exec(function (err, tasks) {
          if (err)
            res.status(500).send(err);
          user.Tasks = tasks;
          res.json(user);
        });
      }
  });
};

exports.update = function(req, res) {
  User.findOneAndUpdate({ Id: req.params.userId}, req.body, {new: true}, function(err, user) {
    if (err)
      res.status(500).send(err);
    res.send('');
  });
};

exports.delete = function(req, res) {
  User.findOne({ Id: req.params.userId }, function(err, user) {
    if (err)
      res.status(500).send(err);
      if (!user)
        res.json(null);
      else {
        Task.remove({ UserId: req.params.userId }, function(err){
          if (err)
            res.status(500).send(err);
          User.remove({
            Id: req.params.userId
          }, function(err, user) {
            if (err)
              res.status(500).send(err);
            res.send('');
          });
        });
      }
  });
};
