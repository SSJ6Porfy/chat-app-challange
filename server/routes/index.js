const usersController = require('../controllers').users;
const messagesController = require('../controllers/messages');

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
      message: 'Welcome to the Chat App API!',
    }));
  
    app.post('/api/users', usersController.create);

    app.get('/api/messages', messagesController.index);
    app.post('/api/messages', messagesController.create);
    app.get('/api/messages/:messageId', messagesController.show);
  };