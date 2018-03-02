'use strict';
module.exports = function(app) {
  var userController = require('../controllers/userController');

  app.route('/users')
    .get(userController.list)
    .post(userController.create);


  app.route('/users/:userId')
    .get(userController.read)
    .put(userController.update)
    .delete(userController.delete);
};
