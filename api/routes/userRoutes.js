'use strict';

module.exports = function(app) {
  var userController = require('../controllers/userController');

  app.route('/api/user')
    .get(userController.list)
    .post(userController.create);


  app.route('/api/user/:userId')
    .get(userController.read)
    .put(userController.update)
    .delete(userController.delete);
};
