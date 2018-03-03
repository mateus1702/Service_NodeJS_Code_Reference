'use strict';
module.exports = function(app) {
  var taskController = require('../controllers/taskController');

  app.route('/api/taskfromuser/:userId')
    .get(taskController.list);

  app.route('/api/task')
    .post(taskController.create);


  app.route('/api/task/:taskId')
    .get(taskController.read)
    .put(taskController.update)
    .delete(taskController.delete);
};
