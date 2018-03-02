'use strict';
module.exports = function(app) {
  var taskController = require('../controllers/taskController');

  app.route('/tasks')
    .get(taskController.list)
    .post(taskController.create);


  app.route('/tasks/:taskId')
    .get(taskController.read)
    .put(taskController.update)
    .delete(taskController.delete);
};
